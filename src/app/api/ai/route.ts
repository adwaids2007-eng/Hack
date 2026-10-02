import { NextResponse } from 'next/server';
import { parseNaturalLanguageQuery } from '@/lib/aiSearch';

export async function POST(req: Request) {
  try {
    const { query } = await req.json();
    if (!query || typeof query !== 'string') {
      return NextResponse.json({ error: 'Query is required' }, { status: 400 });
    }

    const apiKey = process.env.GEMINI_API_KEY;

    if (apiKey) {
      try {
        const response = await fetch(
          `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`,
          {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              contents: [
                {
                  parts: [
                    {
                      text: `You are an AI assistant for CAMPUSCRAFT, a college student creator marketplace.
Extract structured search parameters from this user query: "${query}"

Return ONLY a JSON object with this exact shape:
{
  "purpose": string or null (e.g. "Birthday", "Anniversary", "Dorm Decor"),
  "type": string or null (e.g. "Gift", "Bouquet", "Jewelry", "Art", "Candle"),
  "maxBudget": number or null (e.g. 500),
  "style": string or null (e.g. "Cute", "Handmade", "Aesthetic"),
  "category": string or null (e.g. "Handmade", "Gifts", "Art", "Fashion", "Food", "Digital", "Customized"),
  "customizationRequired": boolean
}
Do not include markdown or backticks in the response. Return raw JSON only.`
                    }
                  ]
                }
              ]
            })
          }
        );

        if (response.ok) {
          const geminiData = await response.json();
          const candidateText = geminiData.candidates?.[0]?.content?.parts?.[0]?.text;
          if (candidateText) {
            const cleanJson = candidateText.replace(/```json/g, '').replace(/```/g, '').trim();
            const parsed = JSON.parse(cleanJson);
            return NextResponse.json({
              intent: {
                rawQuery: query,
                ...parsed,
              },
              source: 'gemini',
            });
          }
        }
      } catch (geminiError) {
        console.warn('Gemini API call failed, falling back to local heuristic intent parser', geminiError);
      }
    }

    // Heuristic natural language fallback
    const intent = parseNaturalLanguageQuery(query);
    return NextResponse.json({ intent, source: 'local' });
  } catch (err: any) {
    return NextResponse.json({ error: err.message || 'Internal server error' }, { status: 500 });
  }
}
