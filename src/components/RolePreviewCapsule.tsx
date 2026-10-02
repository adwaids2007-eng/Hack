'use client';

import React from 'react';
import { UserRole } from '../types';

interface RolePreviewCapsuleProps {
  currentRole: UserRole;
  onRoleChange: (role: UserRole) => void;
}

export const RolePreviewCapsule: React.FC<RolePreviewCapsuleProps> = ({ currentRole, onRoleChange }) => {
  return (
    <section className="bg-surface-container-lowest p-space-md rounded-xl border border-outline-variant/60 shadow-sm relative overflow-hidden">
      <div className="relative z-10">
        <div className="flex items-center gap-2 mb-1">
          <span className="text-label-sm font-label-sm px-2 py-0.5 rounded-full bg-secondary-container text-on-secondary-container uppercase tracking-wider">
            Campus Guild
          </span>
          <span className="text-body-sm font-body-sm text-outline">Spring &apos;25 Term</span>
        </div>
        <h2 className="text-headline-sm font-headline-sm text-primary mb-1">Welcome to CampusCraft</h2>
        <p className="text-body-sm font-body-sm text-on-surface-variant mb-space-md">
          A curated marketplace where campus creativity transforms into student livelihood and artisanal connection.
        </p>
        <div className="grid grid-cols-2 gap-space-sm">
          {/* Maker Option */}
          <div
            className={`p-3 rounded-lg border flex flex-col justify-between transition-all duration-200 ${
              currentRole === 'maker'
                ? 'bg-surface-container-high/60 border-primary-container/30 relative'
                : 'bg-surface border-outline-variant/40'
            }`}
          >
            {currentRole === 'maker' && (
              <span className="absolute -top-2 right-2 px-1.5 py-0.5 rounded text-[9px] font-label-sm bg-primary text-on-primary">
                Active
              </span>
            )}
            <div>
              <div className="text-title-md font-title-md text-on-surface flex items-center gap-1 mb-1">
                <span>🎨</span> <span>I&apos;m a Maker</span>
              </div>
              <p className="text-[11px] font-body-sm text-on-surface-variant leading-tight mb-2">
                Showcase studio creations, accept custom dorm commissions.
              </p>
            </div>
            <button
              onClick={() => onRoleChange('maker')}
              className={`w-full py-1 text-label-sm font-label-sm rounded-lg font-medium transition-colors ${
                currentRole === 'maker'
                  ? 'bg-primary text-on-primary shadow-xs'
                  : 'border border-primary-container text-primary hover:bg-surface-container'
              }`}
            >
              {currentRole === 'maker' ? 'Active View' : 'Switch to Maker'}
            </button>
          </div>

          {/* Customer Option */}
          <div
            className={`p-3 rounded-lg border flex flex-col justify-between transition-all duration-200 ${
              currentRole === 'customer'
                ? 'bg-surface-container-high/60 border-primary-container/30 relative'
                : 'bg-surface border-outline-variant/40'
            }`}
          >
            {currentRole === 'customer' && (
              <span className="absolute -top-2 right-2 px-1.5 py-0.5 rounded text-[9px] font-label-sm bg-primary text-on-primary">
                Active
              </span>
            )}
            <div>
              <div className="text-title-md font-title-md text-primary flex items-center gap-1 mb-1">
                <span>🛍️</span> <span>I&apos;m a Customer</span>
              </div>
              <p className="text-[11px] font-body-sm text-on-surface-variant leading-tight mb-2">
                Discover verified student artisan treasures right on campus.
              </p>
            </div>
            <button
              onClick={() => onRoleChange('customer')}
              className={`w-full py-1 text-label-sm font-label-sm rounded-lg font-medium transition-colors ${
                currentRole === 'customer'
                  ? 'bg-primary text-on-primary shadow-xs'
                  : 'border border-primary-container text-primary hover:bg-surface-container'
              }`}
            >
              {currentRole === 'customer' ? 'Active View' : 'Switch to Customer'}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
