'use client';

import React from 'react';

const CATEGORIES = [
  'All',
  'Art',
  'Handmade',
  'Gifts',
  'Fashion',
  'Food',
  'Digital',
  'Customized',
];

interface CategoryChipsProps {
  selectedCategory: string;
  onSelectCategory: (cat: string) => void;
}

export const CategoryChips: React.FC<CategoryChipsProps> = ({
  selectedCategory,
  onSelectCategory,
}) => {
  return (
    <section>
      <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-1">
        {CATEGORIES.map((category) => {
          const isSelected = selectedCategory === category;
          return (
            <button
              key={category}
              onClick={() => onSelectCategory(category)}
              className={`px-3.5 py-1.5 rounded-full text-label-md font-label-md shrink-0 transition-colors duration-150 active:scale-95 ${
                isSelected
                  ? 'bg-primary text-on-primary shadow-sm font-semibold'
                  : 'bg-surface-container-lowest text-on-surface-variant border border-outline-variant hover:bg-surface-container'
              }`}
            >
              {category}
            </button>
          );
        })}
      </div>
    </section>
  );
};
