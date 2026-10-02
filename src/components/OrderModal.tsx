'use client';

import React, { useState } from 'react';
import { Product, Profile } from '../types';

interface OrderModalProps {
  product: Product | null;
  currentUser: Profile;
  onClose: () => void;
  onSubmitOrder: (data: {
    productId: string;
    productName: string;
    productPrice: number;
    productImage: string;
    makerId: string;
    makerName: string;
    quantity: number;
    message: string;
  }) => void;
}

export const OrderModal: React.FC<OrderModalProps> = ({
  product,
  currentUser,
  onClose,
  onSubmitOrder,
}) => {
  const [quantity, setQuantity] = useState(1);
  const [message, setMessage] = useState('');
  const [submitting, setSubmitting] = useState(false);

  if (!product) return null;

  const total = product.price * quantity;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    onSubmitOrder({
      productId: product.id,
      productName: product.name,
      productPrice: product.price,
      productImage: product.image_url,
      makerId: product.maker_id,
      makerName: product.maker_name || 'Campus Creator',
      quantity,
      message,
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-on-background/40 backdrop-blur-xs animate-fade-in">
      <div
        className="bg-surface-container-lowest max-w-md w-full rounded-2xl border border-outline-variant shadow-xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-outline-variant/40 bg-surface">
          <div>
            <h3 className="text-title-lg font-title-lg text-on-surface">Confirm Order Request</h3>
            <p className="text-body-sm text-outline">Campus-exclusive request & handoff</p>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full flex items-center justify-center text-on-surface-variant hover:bg-surface-container transition-colors"
          >
            <span className="material-symbols-outlined text-[20px]">close</span>
          </button>
        </div>

        {/* Content */}
        <form onSubmit={handleSubmit} className="p-5 space-y-4">
          <div className="flex gap-3 p-3 bg-surface-container rounded-xl border border-outline-variant/50">
            <img
              src={product.image_url}
              alt={product.name}
              className="w-16 h-16 rounded-lg object-cover border border-outline-variant"
            />
            <div className="flex-1 min-w-0">
              <h4 className="text-title-md font-semibold text-on-surface truncate">{product.name}</h4>
              <p className="text-body-sm text-on-surface-variant">By {product.maker_name || 'Maker'}</p>
              <p className="text-title-md font-semibold text-primary mt-1">₹{product.price} each</p>
            </div>
          </div>

          {/* Quantity Selector */}
          <div className="flex items-center justify-between py-2 border-b border-outline-variant/30">
            <label className="text-label-md font-semibold text-on-surface">Quantity</label>
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="w-8 h-8 rounded-full border border-outline-variant flex items-center justify-center text-on-surface hover:bg-surface-container"
              >
                -
              </button>
              <span className="text-title-md font-semibold w-6 text-center">{quantity}</span>
              <button
                type="button"
                onClick={() => setQuantity(quantity + 1)}
                className="w-8 h-8 rounded-full border border-outline-variant flex items-center justify-center text-on-surface hover:bg-surface-container"
              >
                +
              </button>
            </div>
          </div>

          {/* Custom Message / Notes */}
          <div className="space-y-1.5">
            <label className="block text-label-md font-semibold text-on-surface">
              Note or Customization Request <span className="text-outline font-normal text-xs">(optional)</span>
            </label>
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder='e.g., "Add initial S on charm", "Deliver near ASIET canteen on Thursday", or specific colors'
              rows={3}
              className="w-full p-2.5 rounded-lg bg-surface border border-outline-variant focus:border-primary-container text-body-sm text-on-surface placeholder:text-outline outline-none"
            />
          </div>

          {/* Summary */}
          <div className="p-3 rounded-lg bg-surface space-y-1.5 border border-outline-variant/40">
            <div className="flex justify-between text-body-sm text-on-surface-variant">
              <span>Subtotal ({quantity} item{quantity > 1 ? 's' : ''})</span>
              <span>₹{total}</span>
            </div>
            <div className="flex justify-between text-body-sm text-on-surface-variant">
              <span>Campus Delivery / Handoff</span>
              <span className="text-emerald-700 font-medium">Free</span>
            </div>
            <div className="flex justify-between text-title-md font-bold text-on-surface pt-1 border-t border-outline-variant/30">
              <span>Total Request Amount</span>
              <span className="text-primary text-title-lg">₹{total}</span>
            </div>
          </div>

          <p className="text-[11px] text-outline leading-tight">
            * This creates a booking request. You only pay directly to the creator upon pickup/delivery on campus once they accept.
          </p>

          <button
            type="submit"
            disabled={submitting}
            className="w-full py-2.5 bg-primary text-on-primary rounded-lg font-semibold text-label-md hover:bg-primary-container transition-colors shadow-sm active:scale-95 disabled:opacity-50"
          >
            {submitting ? 'Placing Request...' : `Confirm Order Request (₹${total})`}
          </button>
        </form>
      </div>
    </div>
  );
};
