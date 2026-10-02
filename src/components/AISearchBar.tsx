'use client';

import React, { useState, useRef } from 'react';
import { AISearchIntent } from '../types';
import { parseNaturalLanguageQuery } from '../lib/aiSearch';

interface AISearchBarProps {
  onSearch: (query: string, intent: AISearchIntent | null) => void;
  searchRef?: React.RefObject<HTMLInputElement>;
}

const SAMPLE_QUERIES = [
  'a birthday gift under ₹500',
  'cute customized jewelry under ₹350',
  'dorm art for wall',
  'fresh food snacks on campus',
];

export const AISearchBar: React.FC<AISearchBarProps> = ({
  onSearch,
  searchRef,
}) => {
  const [query, setQuery] = useState('');
  const [activeIntent, setActiveIntent] = useState<AISearchIntent | null>(null);
  const [isSearching, setIsSearching] = useState(false);

  const internalRef = useRef<HTMLInputElement>(null);
  const inputRef = searchRef || internalRef;

  const handleQueryChange = (text: string) => {
    setQuery(text);

    if (!text.trim()) {
      setActiveIntent(null);
      onSearch('', null);
      return;
    }

    setIsSearching(true);

    // Instant local intent parser for instant feedback
    const parsed = parseNaturalLanguageQuery(text);

    setActiveIntent(parsed);
    onSearch(text, parsed);

    setIsSearching(false);
  };

  const handleApplySample = (sample: string) => {
    handleQueryChange(sample);

    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  const handleClear = () => {
    setQuery('');
    setActiveIntent(null);
    onSearch('', null);

    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  const getMatchedChips = () => {
    if (!activeIntent) {
      return ['Birthday', 'Gift', 'Under ₹500', 'Customizable'];
    }

    const chips: string[] = [];

    if (activeIntent.purpose) {
      chips.push(activeIntent.purpose);
    }

    if (activeIntent.type) {
      chips.push(activeIntent.type);
    }

    if (activeIntent.maxBudget) {
      chips.push(`Under ₹${activeIntent.maxBudget}`);
    }

    if (activeIntent.style) {
      chips.push(activeIntent.style);
    }

    if (activeIntent.customizationRequired) {
      chips.push('Customizable');
    }

    if (
      activeIntent.category &&
      !chips.includes(activeIntent.category)
    ) {
      chips.push(activeIntent.category);
    }

    return chips.length > 0
      ? chips
      : [activeIntent.rawQuery];
  };

  const chips = getMatchedChips();

  return (
    <section className="space-y-space-md">

      {/* Heading */}
      <div>
        <h2 className="text-headline-lg-mobile font-headline-lg-mobile text-on-background tracking-tight">
          Discover what your campus creates.
        </h2>

        <p className="text-body-md font-body-md text-on-surface-variant mt-1">
          Find unique products, handmade creations, and custom pieces made by students around you.
        </p>
      </div>

      {/* AI Search Input Box */}
      <div className="bg-surface-container p-2.5 rounded-xl border border-outline-variant space-y-2.5 focus-within:border-primary-container transition-all">

        <div className="flex items-center gap-2">

          {/* NORMAL SEARCH ICON */}
          <div className="w-7 h-7 rounded-full bg-surface flex items-center justify-center text-primary-container shrink-0">
            <span className="material-symbols-outlined text-[18px]">
              search
            </span>
          </div>

          {/* Search Input */}
          <input
            ref={inputRef}
            value={query}
            onChange={(e) => handleQueryChange(e.target.value)}
            className="w-full bg-transparent border-none p-0 text-body-md font-body-md text-on-surface placeholder:text-outline focus:ring-0 outline-none"
            placeholder='Try "a birthday gift under ₹500"'
            type="text"
          />

          {/* Clear Button */}
          {query && (
            <button
              onClick={handleClear}
              className="text-on-surface-variant hover:text-on-surface text-xs p-1"
              title="Clear search"
            >
              <span className="material-symbols-outlined text-[18px]">
                close
              </span>
            </button>
          )}

          {/* AI Search Badge */}
          <span className="px-2 py-0.5 rounded-full text-[10px] font-label-sm bg-surface text-primary border border-outline-variant whitespace-nowrap flex items-center gap-1 shrink-0">
            <span>✦</span>
            AI Search
          </span>

        </div>

        {/* AI Preview Chips */}
        <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar pt-0.5 text-[11px] font-label-sm">

          <span className="text-outline text-label-sm flex items-center gap-0.5 shrink-0">
            <span>✦ AI matched:</span>
          </span>

          {chips.map((chip, idx) => (
            <span
              key={idx}
              className={`px-2 py-0.5 rounded-full border border-outline-variant/60 shrink-0 transition-colors ${
                query
                  ? 'bg-secondary-container text-on-secondary-container font-medium'
                  : 'bg-surface-container-lowest text-on-surface-variant'
              }`}
            >
              {chip}
            </span>
          ))}

        </div>

      </div>

      {/* Suggested prompts if empty */}
      {!query && (
        <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar text-[11px] font-label-sm pt-0.5 text-on-surface-variant">

          <span className="text-outline shrink-0">
            Try asking:
          </span>

          {SAMPLE_QUERIES.map((sample, idx) => (
            <button
              key={idx}
              onClick={() => handleApplySample(sample)}
              className="px-2.5 py-1 rounded-full bg-surface-container-low border border-outline-variant/50 hover:bg-surface-container transition-colors shrink-0 text-on-surface-variant"
            >
              "{sample}"
            </button>
          ))}

        </div>
      )}

    </section>
  );
};