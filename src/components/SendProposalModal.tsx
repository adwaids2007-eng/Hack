'use client';

import React, { useState } from 'react';
import { CampusRequest, Profile, Proposal } from '../types';

interface SendProposalModalProps {
  request: CampusRequest | null;
  currentMaker: Profile;
  onClose: () => void;
  onSubmitProposal: (proposal: Omit<Proposal, 'id' | 'status' | 'created_at'>) => void;
}

export const SendProposalModal: React.FC<SendProposalModalProps> = ({
  request,
  currentMaker,
  onClose,
  onSubmitProposal,
}) => {
  const [price, setPrice] = useState(request ? String(request.budget) : '350');
  const [estimatedCompletion, setEstimatedCompletion] = useState('2 days');
  const [message, setMessage] = useState('');
  const [submitting, setSubmitting] = useState(false);

  if (!request) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!price || !message.trim()) return;

    setSubmitting(true);
    onSubmitProposal({
      request_id: request.id,
      maker_id: currentMaker.id,
      maker_name: currentMaker.name,
      maker_image: currentMaker.profile_image,
      maker_verified: currentMaker.verified,
      maker_rating: 4.9,
      price: parseFloat(price) || request.budget,
      estimated_completion: estimatedCompletion.trim() || '2 days',
      message: message.trim(),
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
            <h3 className="text-title-lg font-title-lg text-on-surface">Send Proposal to Student</h3>
            <p className="text-body-sm text-outline">Custom commission opportunity</p>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full flex items-center justify-center text-on-surface-variant hover:bg-surface-container transition-colors"
          >
            <span className="material-symbols-outlined text-[20px]">close</span>
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-5 space-y-4">
          {/* Request summary */}
          <div className="p-3 rounded-xl bg-surface-container border border-outline-variant/50 space-y-1">
            <span className="text-[10px] font-label-sm uppercase px-2 py-0.5 rounded-full bg-secondary-container text-on-secondary-container">
              {request.category}
            </span>
            <p className="text-body-sm font-semibold text-on-surface italic">"{request.description}"</p>
            <div className="flex items-center justify-between text-body-sm text-outline pt-1">
              <span>Customer Budget: <strong className="text-primary">₹{request.budget}</strong></span>
              <span>Deadline: <strong>{request.deadline}</strong></span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1">
              <label className="block text-label-md font-semibold text-on-surface">Your Offer (₹)</label>
              <input
                type="number"
                required
                min="50"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                placeholder="₹ 350"
                className="w-full p-2.5 rounded-lg bg-surface border border-outline-variant focus:border-primary-container text-body-md font-semibold text-primary outline-none"
              />
            </div>

            <div className="space-y-1">
              <label className="block text-label-md font-semibold text-on-surface">Delivery Time</label>
              <input
                type="text"
                required
                value={estimatedCompletion}
                onChange={(e) => setEstimatedCompletion(e.target.value)}
                placeholder="e.g. 2 days"
                className="w-full p-2.5 rounded-lg bg-surface border border-outline-variant focus:border-primary-container text-body-sm outline-none"
              />
            </div>
          </div>

          <div className="space-y-1">
            <label className="block text-label-md font-semibold text-on-surface">Pitch & Proposal Message</label>
            <textarea
              rows={3}
              required
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder='e.g., "I can create this with premium yellow sunflowers, soft blue lavender, and include craft wrapping. Can deliver in 2 days to your dorm!"'
              className="w-full p-2.5 rounded-lg bg-surface border border-outline-variant focus:border-primary-container text-body-sm text-on-surface outline-none"
            />
          </div>

          <button
            type="submit"
            disabled={submitting}
            className="w-full py-2.5 bg-primary text-on-primary rounded-lg font-semibold text-label-md hover:bg-primary-container transition-colors shadow-sm active:scale-95 disabled:opacity-50"
          >
            {submitting ? 'Sending...' : `Send Proposal (₹${price})`}
          </button>
        </form>
      </div>
    </div>
  );
};
