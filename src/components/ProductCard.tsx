'use client';

import React, { useState } from 'react';
import { Product } from '../types';

interface ProductCardProps {
  product: Product;
  onOpenDetails: (product: Product) => void;
  onOrder: (product: Product) => void;
  onViewMaker: (makerId: string) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  onOpenDetails,
  onOrder,
  onViewMaker,
}) => {
  const [isWishlisted, setIsWishlisted] = useState(false);

  return (
    <article className="bg-surface-container-lowest rounded-xl border border-outline-variant/70 overflow-hidden flex flex-col justify-between hover:-translate-y-0.5 transition-transform duration-200 shadow-xs group">
      <div>
        {/* Product Image & Badges */}
        <div
          onClick={() => onOpenDetails(product)}
          className="relative aspect-square w-full bg-surface-container overflow-hidden cursor-pointer"
        >
          <img
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            src={product.image_url}
            loading="lazy"
          />
          <button
            onClick={(e) => {
              e.stopPropagation();
              setIsWishlisted(!isWishlisted);
            }}
            aria-label="Add to wishlist"
            className="absolute top-2 right-2 w-7 h-7 rounded-full bg-surface/80 backdrop-blur flex items-center justify-center text-primary hover:bg-surface transition-colors"
          >
            <span
              className={`material-symbols-outlined text-[16px] ${
                isWishlisted ? 'fill-1 text-red-500' : 'text-primary'
              }`}
              data-icon="favorite"
            >
              favorite
            </span>
          </button>
          <span className="absolute bottom-2 left-2 px-2 py-0.5 rounded-full text-[10px] font-label-sm bg-surface-container-lowest/90 text-on-surface-variant backdrop-blur">
            {product.category}
          </span>
        </div>

        {/* Content */}
        <div className="p-3 space-y-1.5">
          {product.maker_verified !== false && (
            <div className="flex items-center gap-1 text-[11px] font-label-sm text-primary">
              <span className="material-symbols-outlined text-[13px] text-primary" data-icon="verified">
                verified
              </span>
              <span>Campus Verified</span>
            </div>
          )}

          <h4
            onClick={() => onOpenDetails(product)}
            className="text-title-md font-title-md text-on-surface line-clamp-1 cursor-pointer hover:text-primary transition-colors"
            title={product.name}
          >
            {product.name}
          </h4>

          <div className="flex items-center justify-between text-body-sm font-body-sm text-on-surface-variant">
            <button
              onClick={() => onViewMaker(product.maker_id)}
              className="hover:underline hover:text-on-surface truncate text-left max-w-[110px]"
            >
              By {product.maker_name || 'Campus Maker'}
            </button>
            <span className="flex items-center gap-0.5 text-on-surface font-medium text-[11px] shrink-0">
              ⭐ {product.maker_rating || '4.9'}
            </span>
          </div>
        </div>
      </div>

      {/* Footer Price & Order */}
      <div className="p-3 pt-0 flex items-center justify-between mt-1">
        <span className="text-title-lg font-title-lg text-primary font-semibold">₹{product.price}</span>
        <button
          onClick={() => onOrder(product)}
          className="px-3 py-1 bg-primary text-on-primary rounded-lg text-label-md font-label-md hover:bg-primary-container transition-colors active:scale-95 shadow-xs"
        >
          Order
        </button>
      </div>
    </article>
  );
};
