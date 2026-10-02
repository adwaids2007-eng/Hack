'use client';

import React, { useState } from 'react';
import { CampusRequest, Profile } from '../types';

interface PostRequestModalProps {
  currentUser: Profile;
  onClose: () => void;
  onSubmitRequest: (request: Omit<CampusRequest, 'id' | 'status' | 'created_at' | 'proposals_count'>) => void;
}

const CATEGORIES = ['Gifts', 'Handmade', 'Art', 'Fashion', 'Food', 'Digital', 'Customized'];

export const PostRequestModal: React.FC<PostRequestModalProps> = ({
  currentUser,
  onClose,
  onSubmitRequest,
}) => {
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState(CATEGORIES[0]);
  const [budget, setBudget] = useState('400');
  const [deadline, setDeadline] = useState('3 days');
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!description.trim() || !budget) return;

    setSubmitting(true);
    onSubmitRequest({
      customer_id: currentUser.id,
      customer_name: currentUser.name,
      customer_image: currentUser.profile_image,
      description: description.trim(),
      category,
      budget: parseFloat(budget) || 400,
      deadline: deadline.trim() || '3 days',
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
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-primary text-[22px]" data-icon="draw">
              draw
            </span>
            <h3 className="text-title-lg font-title-lg text-on-surface">Post Custom Commission</h3>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full flex items-center justify-center text-on-surface-variant hover:bg-surface-container transition-colors"
          >
            <span className="material-symbols-outlined text-[20px]">close</span>
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-5 space-y-4">
          <div className="space-y-1">
            <label className="block text-label-md font-semibold text-on-surface">
              What do you need?
            </label>
            <textarea
              rows={3}
              required
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder={`e.g., "I need a customized crochet flower bouquet for my friend's birthday with sunflowers and lavender."`}
              className="w-full p-2.5 rounded-lg bg-surface border border-outline-variant focus:border-primary-container text-body-sm text-on-surface placeholder:text-outline outline-none"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1">
              <label className="block text-label-md font-semibold text-on-surface">Category</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full p-2.5 rounded-lg bg-surface border border-outline-variant focus:border-primary-container text-body-sm outline-none"
              >
                {CATEGORIES.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
            </div>

            <div className="space-y-1">
              <label className="block text-label-md font-semibold text-on-surface">Your Budget (₹)</label>
              <input
                type="number"
                min="50"
                required
                value={budget}
                onChange={(e) => setBudget(e.target.value)}
                placeholder="₹ 400"
                className="w-full p-2.5 rounded-lg bg-surface border border-outline-variant focus:border-primary-container text-body-md font-semibold text-primary outline-none"
              />
            </div>
          </div>

          <div className="space-y-1">
            <label className="block text-label-md font-semibold text-on-surface">Deadline / Target Date</label>
            <input
              type="text"
              value={deadline}
              onChange={(e) => setDeadline(e.target.value)}
              placeholder="e.g., 3 days, by Friday, March 28"
              className="w-full p-2.5 rounded-lg bg-surface border border-outline-variant focus:border-primary-container text-body-sm outline-none"
            />
          </div>

          <div className="p-3 rounded-lg bg-surface-container text-body-sm text-on-surface-variant space-y-1">
            <div className="flex items-center gap-1.5 font-medium text-primary text-xs">
              <span className="material-symbols-outlined text-[16px]">info</span>
              <span>How proposals work:</span>
            </div>
            <p className="text-[11px] text-outline leading-tight">
              Verified campus makers will review your request and send customized price proposals. You choose the maker and confirm delivery right to your dorm!
            </p>
          </div>

          <button
            type="submit"
            disabled={submitting}
            className="w-full py-2.5 bg-primary text-on-primary rounded-lg font-semibold text-label-md hover:bg-primary-container transition-colors shadow-sm active:scale-95 disabled:opacity-50"
          >
            {submitting ? 'Submitting...' : 'Post Request to Campus Makers'}
          </button>
        </form>
      </div>
    </div>
  );
};
