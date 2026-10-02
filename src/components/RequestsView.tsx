'use client';

import React, { useState } from 'react';
import { CampusRequest, Proposal, Profile } from '../types';

interface RequestsViewProps {
  currentUser: Profile;
  requests: CampusRequest[];
  proposals: Proposal[];
  onOpenPostRequest: () => void;
  onOpenSendProposal: (request: CampusRequest) => void;
  onAcceptProposal: (proposalId: string) => void;
  onOpenMessage: (userId: string, userName: string) => void;
  onViewMaker: (makerId: string) => void;
}

export const RequestsView: React.FC<RequestsViewProps> = ({
  currentUser,
  requests,
  proposals,
  onOpenPostRequest,
  onOpenSendProposal,
  onAcceptProposal,
  onOpenMessage,
  onViewMaker,
}) => {
  const [expandedRequestId, setExpandedRequestId] = useState<string | null>(requests[0]?.id || null);

  const isMaker = currentUser.role === 'maker';

  return (
    <div className="space-y-6">
      {/* Banner */}
      <section className="bg-surface-container p-space-md rounded-xl border border-outline-variant space-y-2 shadow-xs">
        <div className="flex items-start justify-between">
          <div>
            <span className="inline-block text-[11px] font-label-sm text-primary-container tracking-wider uppercase mb-1">
              Custom Commissions & Requests
            </span>
            <h2 className="text-headline-md font-headline-md text-on-surface">Campus Student Requests</h2>
            <p className="text-body-sm text-on-surface-variant">
              Post what you want made, set your budget, and receive custom offers from campus makers!
            </p>
          </div>
          <button
            onClick={onOpenPostRequest}
            className="px-4 py-2 bg-primary text-on-primary rounded-lg text-label-md font-semibold hover:bg-primary-container transition-all active:scale-95 shadow-sm shrink-0 flex items-center gap-1.5"
          >
            <span className="material-symbols-outlined text-[18px]">add_circle</span>
            Post Request
          </button>
        </div>
      </section>

      {/* Requests List */}
      <section className="space-y-4">
        {requests.length === 0 ? (
          <div className="p-8 text-center bg-surface-container-lowest rounded-xl border border-outline-variant/60">
            <span className="material-symbols-outlined text-[40px] text-outline">draw</span>
            <p className="text-body-md text-on-surface font-semibold mt-2">No active custom requests yet.</p>
            <p className="text-body-sm text-outline mt-0.5">Be the first to post a commission for campus makers!</p>
            <button
              onClick={onOpenPostRequest}
              className="mt-4 px-4 py-2 bg-primary text-on-primary rounded-lg text-xs font-semibold"
            >
              Post a Custom Request
            </button>
          </div>
        ) : (
          requests.map((req) => {
            const reqProposals = proposals.filter((p) => p.request_id === req.id);
            const isExpanded = expandedRequestId === req.id;
            const isOwner = req.customer_id === currentUser.id;

            return (
              <article
                key={req.id}
                className="bg-surface-container-lowest rounded-xl border border-outline-variant/70 overflow-hidden shadow-xs"
              >
                {/* Request Header */}
                <div className="p-4 space-y-3">
                  <div className="flex items-start justify-between gap-3">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] font-label-sm uppercase px-2 py-0.5 rounded-full bg-secondary-container text-on-secondary-container">
                          {req.category}
                        </span>
                        <span
                          className={`text-[10px] font-label-sm px-2 py-0.5 rounded-full ${
                            req.status === 'OPEN'
                              ? 'bg-emerald-100 text-emerald-800'
                              : 'bg-stone-100 text-stone-700'
                          }`}
                        >
                          {req.status}
                        </span>
                      </div>
                      <h3 className="text-title-lg font-title-lg text-on-surface font-semibold">"{req.description}"</h3>
                      <div className="flex items-center gap-2 text-body-sm text-on-surface-variant">
                        <span>Posted by <strong>{req.customer_name || 'Student'}</strong></span>
                        <span>•</span>
                        <span>Needed in: <strong className="text-on-surface">{req.deadline}</strong></span>
                      </div>
                    </div>

                    <div className="text-right shrink-0">
                      <span className="text-[11px] text-outline uppercase block font-semibold">Budget</span>
                      <span className="text-headline-sm font-bold text-primary">₹{req.budget}</span>
                    </div>
                  </div>

                  {/* Actions Bar */}
                  <div className="flex items-center justify-between pt-2 border-t border-outline-variant/30 text-body-sm">
                    <button
                      onClick={() => setExpandedRequestId(isExpanded ? null : req.id)}
                      className="text-primary font-semibold text-xs flex items-center gap-1 hover:underline"
                    >
                      <span className="material-symbols-outlined text-[16px]">
                        {isExpanded ? 'expand_less' : 'expand_more'}
                      </span>
                      {reqProposals.length} Proposal{reqProposals.length === 1 ? '' : 's'} Submitted
                    </button>

                    {isMaker && req.status === 'OPEN' && (
                      <button
                        onClick={() => onOpenSendProposal(req)}
                        className="px-3.5 py-1.5 bg-primary text-on-primary rounded-lg text-xs font-semibold hover:bg-primary-container transition-colors shadow-xs"
                      >
                        Send Proposal
                      </button>
                    )}
                  </div>
                </div>

                {/* Proposals Drawer / List */}
                {isExpanded && (
                  <div className="bg-surface-container-low p-4 border-t border-outline-variant/40 space-y-3 animate-fade-in">
                    <h4 className="text-xs font-semibold text-outline uppercase tracking-wider">
                      Maker Proposals for this Request
                    </h4>

                    {reqProposals.length === 0 ? (
                      <p className="text-body-sm text-outline italic">No proposals submitted yet. Check back soon!</p>
                    ) : (
                      <div className="space-y-2.5">
                        {reqProposals.map((prop) => {
                          const isAccepted = prop.status === 'ACCEPTED';

                          return (
                            <div
                              key={prop.id}
                              className={`p-3.5 rounded-xl bg-surface-container-lowest border space-y-2.5 ${
                                isAccepted ? 'border-emerald-500 ring-1 ring-emerald-400' : 'border-outline-variant/60'
                              }`}
                            >
                              <div className="flex items-start justify-between gap-3">
                                <div
                                  className="flex items-center gap-2.5 cursor-pointer"
                                  onClick={() => onViewMaker(prop.maker_id)}
                                >
                                  <img
                                    src={
                                      prop.maker_image ||
                                      'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=400&q=80'
                                    }
                                    alt={prop.maker_name || 'Maker'}
                                    className="w-10 h-10 rounded-full object-cover border border-outline-variant"
                                  />
                                  <div>
                                    <div className="flex items-center gap-1">
                                      <h5 className="text-title-md font-semibold text-on-surface">
                                        {prop.maker_name || 'Artisan'}
                                      </h5>
                                      {prop.maker_verified !== false && (
                                        <span className="material-symbols-outlined text-[14px] text-primary" title="Campus Verified">
                                          verified
                                        </span>
                                      )}
                                    </div>
                                    <span className="text-[11px] text-outline">
                                      ⭐ {prop.maker_rating || '4.9'} • Campus Maker
                                    </span>
                                  </div>
                                </div>

                                <div className="text-right">
                                  <span className="text-title-lg font-bold text-primary">₹{prop.price}</span>
                                  <span className="text-[11px] text-outline block">Delivery in {prop.estimated_completion}</span>
                                </div>
                              </div>

                              <p className="text-body-sm text-on-surface italic bg-surface p-2.5 rounded-lg border border-outline-variant/30">
                                "{prop.message}"
                              </p>

                              <div className="flex items-center justify-between pt-1">
                                <button
                                  onClick={() => onOpenMessage(prop.maker_id, prop.maker_name || 'Maker')}
                                  className="text-primary text-xs hover:underline flex items-center gap-1 font-medium"
                                >
                                  <span className="material-symbols-outlined text-[16px]">chat</span>
                                  Message Maker
                                </button>

                                {isAccepted ? (
                                  <span className="px-3 py-1 bg-emerald-100 text-emerald-800 rounded-lg text-xs font-bold flex items-center gap-1">
                                    <span className="material-symbols-outlined text-[14px]">check_circle</span>
                                    Proposal Accepted (Order Created)
                                  </span>
                                ) : (
                                  <button
                                    onClick={() => onAcceptProposal(prop.id)}
                                    className="px-4 py-1.5 bg-primary text-on-primary rounded-lg text-xs font-semibold hover:bg-primary-container transition-colors shadow-xs active:scale-95"
                                  >
                                    Accept & Create Order
                                  </button>
                                )}
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    )}
                  </div>
                )}
              </article>
            );
          })
        )}
      </section>
    </div>
  );
};
