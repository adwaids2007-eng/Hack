import { Product, AISearchIntent } from '../types';

export function parseNaturalLanguageQuery(query: string): AISearchIntent {
  const q = query.toLowerCase();

  const intent: AISearchIntent = {
    rawQuery: query,
  };

  // 1. Extract Budget
  // Matches "under 500", "under ₹500", "below 300", "under Rs 400", "< 600", "budget 500"
  const budgetMatch = q.match(/(?:under|below|less than|within|budget of|max|\u20b9|rs\.?|<)\s*(\d+)/i) ||
                      q.match(/(\d+)\s*(?:rs|rupees|\u20b9|budget)/i);
  if (budgetMatch && budgetMatch[1]) {
    intent.maxBudget = parseInt(budgetMatch[1], 10);
  }

  // 2. Extract Purpose / Occasion
  if (q.includes('birthday') || q.includes('bday')) intent.purpose = 'Birthday';
  else if (q.includes('anniversary')) intent.purpose = 'Anniversary';
  else if (q.includes('graduat')) intent.purpose = 'Graduation';
  else if (q.includes('dorm') || q.includes('room')) intent.purpose = 'Dorm Decor';
  else if (q.includes('valentine')) intent.purpose = 'Valentine';
  else if (q.includes('farewell')) intent.purpose = 'Farewell';
  else if (q.includes('friend')) intent.purpose = 'Friendship';

  // 3. Extract Type / Item
  if (q.includes('gift') || q.includes('present')) intent.type = 'Gift';
  else if (q.includes('bouquet') || q.includes('flower')) intent.type = 'Bouquet';
  else if (q.includes('bracelet') || q.includes('jewelry') || q.includes('chain') || q.includes('pearl')) intent.type = 'Jewelry';
  else if (q.includes('candle') || q.includes('scent')) intent.type = 'Candle';
  else if (q.includes('paint') || q.includes('canvas') || q.includes('art')) intent.type = 'Art';
  else if (q.includes('tote') || q.includes('bag')) intent.type = 'Tote Bag';
  else if (q.includes('card') || q.includes('box')) intent.type = 'Card / Box';
  else if (q.includes('digital') || q.includes('portrait') || q.includes('chibi')) intent.type = 'Digital Art';
  else if (q.includes('food') || q.includes('brownie') || q.includes('snack')) intent.type = 'Food';
  else if (q.includes('keychain')) intent.type = 'Keychain';

  // 4. Extract Category
  if (q.includes('art') || q.includes('paint') || q.includes('canvas')) intent.category = 'Art';
  else if (q.includes('crochet') || q.includes('handmade') || q.includes('knit') || q.includes('resin')) intent.category = 'Handmade';
  else if (q.includes('gift') || q.includes('birthday') || q.includes('card')) intent.category = 'Gifts';
  else if (q.includes('fashion') || q.includes('wear') || q.includes('tote') || q.includes('bag') || q.includes('bracelet')) intent.category = 'Fashion';
  else if (q.includes('food') || q.includes('bake') || q.includes('sweet') || q.includes('brownie')) intent.category = 'Food';
  else if (q.includes('digital') || q.includes('vector') || q.includes('chibi')) intent.category = 'Digital';

  // 5. Style & Customization
  if (q.includes('cute')) intent.style = 'Cute';
  else if (q.includes('aesthetic')) intent.style = 'Aesthetic';
  else if (q.includes('vintage')) intent.style = 'Vintage';
  else if (q.includes('minimal')) intent.style = 'Minimalist';
  else if (q.includes('botanical') || q.includes('floral')) intent.style = 'Botanical';

  if (q.includes('custom') || q.includes('personal') || q.includes('name') || q.includes('initial')) {
    intent.customizationRequired = true;
  }

  return intent;
}

export function filterAndRankProducts(products: Product[], intent: AISearchIntent): { ranked: Product[]; matchedTags: string[] } {
  const matchedTags: string[] = [];
  if (intent.purpose) matchedTags.push(intent.purpose);
  if (intent.type) matchedTags.push(intent.type);
  if (intent.maxBudget) matchedTags.push(`Under ₹${intent.maxBudget}`);
  if (intent.style) matchedTags.push(intent.style);
  if (intent.customizationRequired) matchedTags.push('Customizable');
  if (intent.category && !matchedTags.includes(intent.category)) matchedTags.push(intent.category);

  // If no specific intent extracted, fallback to simple substring search
  if (matchedTags.length === 0) {
    const q = intent.rawQuery.toLowerCase().trim();
    if (!q) return { ranked: products, matchedTags: [] };

    const filtered = products.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q) ||
        (p.maker_name && p.maker_name.toLowerCase().includes(q))
    );
    return { ranked: filtered, matchedTags: [intent.rawQuery] };
  }

  // Calculate matching score for each product
  const scored = products.map((product) => {
    let score = 0;
    const nameLower = product.name.toLowerCase();
    const descLower = product.description.toLowerCase();
    const catLower = product.category.toLowerCase();
    const makerLower = (product.maker_name || '').toLowerCase();

    // 1. Budget constraint check
    if (intent.maxBudget) {
      if (product.price <= intent.maxBudget) {
        // Higher score if nicely within budget
        score += 40 + (1 - product.price / intent.maxBudget) * 15;
      } else {
        // Soft penalty for slightly over, heavier for way over
        score -= (product.price - intent.maxBudget) * 0.5;
      }
    }

    // 2. Purpose matching
    if (intent.purpose) {
      const pLower = intent.purpose.toLowerCase();
      if (pLower === 'birthday' && (catLower === 'gifts' || catLower === 'handmade' || descLower.includes('birthday') || nameLower.includes('card') || nameLower.includes('bouquet') || nameLower.includes('box'))) {
        score += 35;
      } else if (pLower === 'friendship' && (nameLower.includes('friendship') || nameLower.includes('bracelet') || nameLower.includes('chibi'))) {
        score += 35;
      } else if (pLower === 'dorm decor' && (catLower === 'art' || nameLower.includes('candle') || nameLower.includes('canvas'))) {
        score += 35;
      }
    }

    // 3. Type matching
    if (intent.type) {
      const tLower = intent.type.toLowerCase();
      if (nameLower.includes(tLower) || descLower.includes(tLower)) {
        score += 45;
      } else if (tLower === 'gift' && (catLower === 'gifts' || product.customization_available)) {
        score += 25;
      } else if (tLower === 'bouquet' && nameLower.includes('bouquet')) {
        score += 50;
      } else if (tLower === 'jewelry' && (nameLower.includes('bracelet') || nameLower.includes('pearl'))) {
        score += 50;
      } else if (tLower === 'candle' && nameLower.includes('candle')) {
        score += 50;
      }
    }

    // 4. Style matching
    if (intent.style) {
      const sLower = intent.style.toLowerCase();
      if (nameLower.includes(sLower) || descLower.includes(sLower)) {
        score += 30;
      }
      if (sLower === 'cute' && (nameLower.includes('crochet') || nameLower.includes('chibi') || nameLower.includes('strawberry') || nameLower.includes('pearl'))) {
        score += 25;
      }
    }

    // 5. Customization matching
    if (intent.customizationRequired) {
      if (product.customization_available) {
        score += 25;
      } else {
        score -= 10;
      }
    }

    // 6. Direct text tokens
    const rawTokens = intent.rawQuery.toLowerCase().split(/\s+/).filter((w) => w.length > 2 && !['for', 'the', 'and', 'with', 'need', 'want', 'under'].includes(w));
    for (const token of rawTokens) {
      if (nameLower.includes(token)) score += 15;
      if (descLower.includes(token)) score += 8;
      if (makerLower.includes(token)) score += 15;
    }

    return { product, score };
  });

  // Filter out severely negative scores if budget was specified and exceeded
  const relevant = scored
    .filter((s) => (intent.maxBudget ? s.product.price <= intent.maxBudget * 1.25 : s.score > 0))
    .sort((a, b) => b.score - a.score)
    .map((s) => s.product);

  return {
    ranked: relevant.length > 0 ? relevant : products,
    matchedTags,
  };
}
