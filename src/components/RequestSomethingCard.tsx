'use client';

import React from 'react';

interface RequestSomethingCardProps {
  onOpenPostRequest: () => void;
}

export const RequestSomethingCard: React.FC<RequestSomethingCardProps> = ({ onOpenPostRequest }) => {
  return (
    <section className="bg-surface-container p-space-md rounded-xl border border-outline-variant space-y-space-md shadow-xs">
      <div className="flex items-start justify-between">
        <div>
          <span className="inline-block text-[11px] font-label-sm text-primary-container tracking-wider uppercase mb-1">
            Custom Commissions
          </span>
          <h3 className="text-headline-sm font-headline-sm text-on-surface">Can't find what you're looking for?</h3>
          <p className="text-body-sm font-body-sm text-on-surface-variant mt-1">
            Tell a campus creator what you need and set your own budget.
          </p>
        </div>
        <div className="w-10 h-10 rounded-full bg-surface-container-lowest flex items-center justify-center text-primary shadow-xs shrink-0">
          <span className="material-symbols-outlined text-[24px]" data-icon="draw">
            draw
          </span>
        </div>
      </div>

      <div
        onClick={onOpenPostRequest}
        className="bg-surface-container-lowest p-3 rounded-lg border border-outline-variant/60 space-y-2 cursor-pointer hover:border-primary transition-colors"
      >
        <label className="block text-label-sm font-label-sm text-outline">Quick Request Prompt</label>
        <div className="flex items-center justify-between text-body-sm font-body-sm text-on-surface">
          <span className="italic text-on-surface-variant">"Handmade anniversary gift under ₹600"</span>
          <span className="text-primary font-semibold text-title-md">₹400</span>
        </div>
      </div>

      <div className="flex items-center justify-between gap-space-sm pt-1">
        <div className="flex items-center gap-1.5 text-body-sm font-body-sm text-outline">
          <span className="material-symbols-outlined text-[18px]" data-icon="hourglass_empty">
            hourglass_empty
          </span>
          <span>Responses in ~2 hours</span>
        </div>
        <button
          onClick={onOpenPostRequest}
          className="px-4 py-2 bg-primary text-on-primary rounded-lg text-label-md font-label-md font-semibold hover:bg-primary-container transition-all active:scale-95 shadow-sm"
        >
          Post Custom Request
        </button>
      </div>
    </section>
  );
};
