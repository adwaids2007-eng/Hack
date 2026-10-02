'use client';

import React from 'react';
import { Product } from '../types';

interface ProductDetailsModalProps {
  product: Product | null;
  onClose: () => void;
  onOrder: (product: Product) => void;
  onMessageMaker: (makerId: string, makerName: string) => void;
  onViewMaker: (makerId: string) => void;
}

export const ProductDetailsModal: React.FC<ProductDetailsModalProps> = ({
  product,
  onClose,
  onOrder,
  onMessageMaker,
  onViewMaker,
}) => {
  if (!product) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-on-background/40 backdrop-blur-xs animate-fade-in">
      <div
        className="bg-surface-container-lowest max-w-lg w-full rounded-2xl border border-outline-variant shadow-xl overflow-hidden max-h-[90vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="flex items-center justify-between p-4 border-b border-outline-variant/40 bg-surface">
          <div className="flex items-center gap-2">
            <span className="text-label-sm font-label-sm px-2.5 py-0.5 rounded-full bg-secondary-container text-on-secondary-container uppercase">
              {product.category}
            </span>
            {product.customization_available && (
              <span className="text-[10px] font-label-sm px-2 py-0.5 rounded-full bg-surface-container text-primary border border-outline-variant">
                ✦ Customization Available
              </span>
            )}
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full flex items-center justify-center text-on-surface-variant hover:bg-surface-container transition-colors"
          >
            <span className="material-symbols-outlined text-[20px]">close</span>
          </button>
        </div>

        {/* Modal Scrollable Body */}
        <div className="overflow-y-auto p-5 space-y-4">
          <div className="relative aspect-4/3 w-full rounded-xl overflow-hidden bg-surface-container border border-outline-variant/60">
            <img
              src={product.image_url}
              alt={product.name}
              className="w-full h-full object-cover"
            />
          </div>

          <div>
            <div className="flex items-baseline justify-between gap-2">
              <h3 className="text-headline-md font-headline-md text-on-surface">
                {product.name}
              </h3>
              <span className="text-headline-sm font-headline-sm text-primary font-bold">
                ₹{product.price}
              </span>
            </div>

            {/* Maker Snippet */}
            <div className="mt-2.5 p-3 rounded-xl bg-surface-container flex items-center justify-between">
              <div
                className="flex items-center gap-2.5 cursor-pointer hover:opacity-80 transition-opacity"
                onClick={() => onViewMaker(product.maker_id)}
              >
                {product.maker_image ? (
                  <img
                    src={product.maker_image}
                    alt={product.maker_name || 'Maker'}
                    className="w-10 h-10 rounded-full object-cover border border-outline-variant"
                  />
                ) : (
                  <div className="w-10 h-10 rounded-full bg-primary-container text-on-primary flex items-center justify-center font-bold">
                    {(product.maker_name || 'M')[0]}
                  </div>
                )}
                <div>
                  <div className="flex items-center gap-1.5">
                    <span className="text-title-md font-semibold text-on-surface">
                      {product.maker_name || 'Campus Artisan'}
                    </span>
                    {product.maker_verified !== false && (
                      <span className="material-symbols-outlined text-[15px] text-primary" title="Campus Verified">
                        verified
                      </span>
                    )}
                  </div>
                  <div className="flex items-center gap-2 text-body-sm text-on-surface-variant">
                    <span>⭐ {product.maker_rating || '4.9'}</span>
                    <span>•</span>
                    <span className="text-[11px] text-primary">View Profile</span>
                  </div>
                </div>
              </div>

              <button
                onClick={() => onMessageMaker(product.maker_id, product.maker_name || 'Maker')}
                className="px-3 py-1.5 rounded-lg border border-primary text-primary text-label-md font-medium hover:bg-surface-container-high transition-colors flex items-center gap-1"
              >
                <span className="material-symbols-outlined text-[16px]">chat</span>
                Message
              </button>
            </div>
          </div>

          {/* Description */}
          <div className="space-y-1.5">
            <h4 className="text-label-md font-semibold text-outline uppercase tracking-wider text-[11px]">
              Craft & Story
            </h4>
            <p className="text-body-md text-on-surface leading-relaxed whitespace-pre-line">
              {product.description}
            </p>
          </div>

          {/* Product Details Grid */}
          <div className="grid grid-cols-2 gap-2 text-body-sm pt-2">
            <div className="p-2.5 rounded-lg bg-surface border border-outline-variant/40">
              <span className="text-outline text-[11px] block">Availability</span>
              <span className="font-semibold text-on-surface">
                {product.available_quantity > 0 ? `${product.available_quantity} left in dorm stock` : 'Made to order'}
              </span>
            </div>
            <div className="p-2.5 rounded-lg bg-surface border border-outline-variant/40">
              <span className="text-outline text-[11px] block">Campus Delivery</span>
              <span className="font-semibold text-on-surface">Free Quad / Dorm handoff</span>
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="p-4 bg-surface border-t border-outline-variant/40 flex items-center gap-3">
          <button
            onClick={() => onMessageMaker(product.maker_id, product.maker_name || 'Maker')}
            className="flex-1 py-2.5 rounded-lg border border-primary text-primary font-semibold text-label-md hover:bg-surface-container transition-colors flex items-center justify-center gap-1.5"
          >
            <span className="material-symbols-outlined text-[18px]">chat</span>
            Message Maker
          </button>
          <button
            onClick={() => onOrder(product)}
            className="flex-1 py-2.5 bg-primary text-on-primary rounded-lg font-semibold text-label-md hover:bg-primary-container transition-colors shadow-sm flex items-center justify-center gap-1.5 active:scale-95"
          >
            <span className="material-symbols-outlined text-[18px]">shopping_bag</span>
            Order Now (₹{product.price})
          </button>
        </div>
      </div>
    </div>
  );
};
