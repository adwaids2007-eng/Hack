'use client';

import React, { useState } from 'react';
import { Order, Review, Profile } from '../types';

interface ReviewModalProps {
  order: Order | null;
  currentUser: Profile;
  onClose: () => void;
  onSubmitReview: (review: Omit<Review, 'id' | 'created_at'>) => void;
}

export const ReviewModal: React.FC<ReviewModalProps> = ({
  order,
  currentUser,
  onClose,
  onSubmitReview,
}) => {
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState('');
  const [submitting, setSubmitting] = useState(false);

  if (!order) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!comment.trim()) return;

    setSubmitting(true);
    onSubmitReview({
      order_id: order.id,
      customer_id: currentUser.id,
      customer_name: currentUser.name,
      customer_image: currentUser.profile_image,
      maker_id: order.maker_id,
      rating,
      comment: comment.trim(),
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-on-background/40 backdrop-blur-xs animate-fade-in">
      <div
        className="bg-surface-container-lowest max-w-md w-full rounded-2xl border border-outline-variant shadow-xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between p-4 border-b border-outline-variant/40 bg-surface">
          <div>
            <h3 className="text-title-lg font-title-lg text-on-surface">Review Your Experience</h3>
            <p className="text-body-sm text-outline">Support student creators with verified feedback</p>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full flex items-center justify-center text-on-surface-variant hover:bg-surface-container transition-colors"
          >
            <span className="material-symbols-outlined text-[20px]">close</span>
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-5 space-y-4">
          <div className="flex items-center gap-3 p-3 bg-surface-container rounded-xl border border-outline-variant/40">
            {order.product_image && (
              <img
                src={order.product_image}
                alt={order.product_name || 'Product'}
                className="w-12 h-12 rounded-lg object-cover border border-outline-variant"
              />
            )}
            <div>
              <h4 className="text-title-md font-semibold text-on-surface truncate">{order.product_name}</h4>
              <p className="text-body-sm text-outline">By {order.maker_name || 'Campus Maker'}</p>
            </div>
          </div>

          {/* Star selector */}
          <div className="text-center space-y-1 py-1">
            <span className="text-xs font-semibold text-outline uppercase tracking-wider block">Rating</span>
            <div className="flex justify-center items-center gap-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  type="button"
                  key={star}
                  onClick={() => setRating(star)}
                  className="text-2xl transition-transform hover:scale-125 focus:outline-none"
                >
                  <span className={star <= rating ? 'text-amber-500' : 'text-stone-300'}>★</span>
                </button>
              ))}
            </div>
            <span className="text-xs font-medium text-on-surface-variant">
              {rating === 5 ? 'Exceptional craft!' : rating === 4 ? 'Great quality' : 'Good craft'}
            </span>
          </div>

          {/* Review comment */}
          <div className="space-y-1">
            <label className="block text-label-md font-semibold text-on-surface">Your Review</label>
            <textarea
              rows={3}
              required
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Tell others what you loved about this craft, packaging, or dorm handoff..."
              className="w-full p-2.5 rounded-lg bg-surface border border-outline-variant focus:border-primary-container text-body-sm text-on-surface outline-none"
            />
          </div>

          <button
            type="submit"
            disabled={submitting}
            className="w-full py-2.5 bg-primary text-on-primary rounded-lg font-semibold text-label-md hover:bg-primary-container transition-colors shadow-sm active:scale-95 disabled:opacity-50"
          >
            {submitting ? 'Submitting Review...' : 'Publish Campus Review'}
          </button>
        </form>
      </div>
    </div>
  );
};
