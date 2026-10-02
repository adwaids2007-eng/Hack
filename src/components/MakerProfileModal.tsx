'use client';

import React from 'react';
import { Profile, Product } from '../types';

interface MakerProfileModalProps {
  maker: Profile | null;
  makerProducts: Product[];
  onClose: () => void;
  onOpenProduct: (product: Product) => void;
  onMessageMaker: (makerId: string, makerName: string) => void;
}

export const MakerProfileModal: React.FC<MakerProfileModalProps> = ({
  maker,
  makerProducts,
  onClose,
  onOpenProduct,
  onMessageMaker,
}) => {
  if (!maker) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-on-background/40 backdrop-blur-xs animate-fade-in">
      <div
        className="bg-surface-container-lowest max-w-lg w-full rounded-2xl border border-outline-variant shadow-xl overflow-hidden max-h-[90vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-outline-variant/40 bg-surface">
          <div className="flex items-center gap-1.5 text-primary text-title-md font-semibold">
            <span className="material-symbols-outlined text-[20px]">palette</span>
            <span>Campus Creator Profile</span>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full flex items-center justify-center text-on-surface-variant hover:bg-surface-container transition-colors"
          >
            <span className="material-symbols-outlined text-[20px]">close</span>
          </button>
        </div>

        {/* Scrollable Creator Content */}
        <div className="overflow-y-auto p-5 space-y-5">
          {/* Creator Profile Card (Instagram/Creator Style) */}
          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4 text-center sm:text-left">
            <div className="relative">
              <img
                src={
                  maker.profile_image ||
                  'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=400&q=80'
                }
                alt={maker.name}
                className="w-20 h-20 rounded-full object-cover border-2 border-primary/30 shadow-xs"
              />
              {maker.verified && (
                <span
                  className="absolute bottom-0 right-0 w-6 h-6 rounded-full bg-primary text-on-primary flex items-center justify-center border-2 border-surface"
                  title="Campus Verified"
                >
                  <span className="material-symbols-outlined text-[14px]">check</span>
                </span>
              )}
            </div>

            <div className="flex-1 space-y-1">
              <div className="flex items-center justify-center sm:justify-start gap-1.5">
                <h3 className="text-headline-sm font-headline-sm text-on-surface font-semibold">{maker.name}</h3>
                {maker.verified && (
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-label-sm bg-secondary-container text-on-secondary-container flex items-center gap-0.5">
                    <span className="material-symbols-outlined text-[12px]">verified</span>
                    Campus Verified
                  </span>
                )}
              </div>
              <p className="text-body-sm text-outline">{maker.college || 'Adi Shankara Institute of Engineering and Technology (ASIET)'}</p>
              <p className="text-body-sm text-on-surface-variant italic mt-1">"{maker.bio || 'Creator on CampusCraft'}"</p>

              {/* Stats Bar */}
              <div className="flex items-center justify-center sm:justify-start gap-4 pt-2 text-body-sm">
                <div>
                  <span className="font-bold text-on-surface text-title-md">⭐ 4.8</span>
                  <span className="text-outline text-xs block">Rating</span>
                </div>
                <div className="w-px h-6 bg-outline-variant/60"></div>
                <div>
                  <span className="font-bold text-on-surface text-title-md">{makerProducts.length * 7 + 12}</span>
                  <span className="text-outline text-xs block">Orders Done</span>
                </div>
                <div className="w-px h-6 bg-outline-variant/60"></div>
                <div>
                  <span className="font-bold text-on-surface text-title-md">{makerProducts.length}</span>
                  <span className="text-outline text-xs block">Products</span>
                </div>
              </div>
            </div>
          </div>

          {/* Action Button */}
          <button
            onClick={() => onMessageMaker(maker.id, maker.name)}
            className="w-full py-2 bg-primary text-on-primary rounded-lg text-label-md font-semibold hover:bg-primary-container transition-colors flex items-center justify-center gap-1.5 shadow-xs"
          >
            <span className="material-symbols-outlined text-[18px]">chat</span>
            Message Creator
          </button>

          {/* Skills Tags */}
          {maker.skills && maker.skills.length > 0 && (
            <div className="space-y-1.5">
              <h4 className="text-[11px] font-semibold text-outline uppercase tracking-wider">Artisan Specializations</h4>
              <div className="flex flex-wrap gap-1.5">
                {maker.skills.map((skill, i) => (
                  <span
                    key={i}
                    className="px-2.5 py-1 rounded-full text-xs font-label-md bg-surface-container text-on-surface-variant border border-outline-variant/40"
                  >
                    ✦ {skill}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Product Showcase Gallery */}
          <div className="space-y-2 pt-2">
            <h4 className="text-title-md font-title-md text-on-surface font-semibold flex items-center justify-between">
              <span>Creations by {maker.name}</span>
              <span className="text-body-sm font-normal text-outline">{makerProducts.length} listings</span>
            </h4>

            {makerProducts.length === 0 ? (
              <p className="text-body-sm text-outline italic">No products listed currently.</p>
            ) : (
              <div className="grid grid-cols-2 gap-3">
                {makerProducts.map((p) => (
                  <div
                    key={p.id}
                    onClick={() => {
                      onClose();
                      onOpenProduct(p);
                    }}
                    className="bg-surface rounded-xl border border-outline-variant/60 overflow-hidden cursor-pointer hover:border-primary transition-all group"
                  >
                    <div className="aspect-square relative overflow-hidden bg-surface-container">
                      <img
                        src={p.image_url}
                        alt={p.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                      />
                      <span className="absolute bottom-1.5 left-1.5 px-2 py-0.5 rounded text-[9px] font-label-sm bg-surface-container-lowest/90 text-on-surface backdrop-blur">
                        ₹{p.price}
                      </span>
                    </div>
                    <div className="p-2">
                      <h5 className="text-xs font-semibold text-on-surface truncate">{p.name}</h5>
                      <span className="text-[10px] text-outline">{p.category}</span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
