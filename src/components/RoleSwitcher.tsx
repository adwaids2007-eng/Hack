'use client';

import React from 'react';
import { UserRole } from '../types';

interface RoleSwitcherProps {
  currentRole: UserRole;
  onRoleChange: (role: UserRole) => void;
}

export const RoleSwitcher: React.FC<RoleSwitcherProps> = ({ currentRole, onRoleChange }) => {
  return (
    <div className="px-gutter-mobile pt-space-sm">
      <div className="bg-surface-container p-1 rounded-full flex items-center justify-between text-label-md font-label-md max-w-md mx-auto shadow-xs border border-outline-variant/30">
        <button
          onClick={() => onRoleChange('customer')}
          className={`flex-1 py-1.5 px-3 rounded-full flex items-center justify-center gap-1.5 transition-all duration-200 ${
            currentRole === 'customer'
              ? 'bg-primary text-on-primary font-semibold shadow-sm'
              : 'text-on-surface-variant hover:text-on-surface'
          }`}
        >
          <span>🛍️</span>
          <span>Customer View</span>
        </button>
        <button
          onClick={() => onRoleChange('maker')}
          className={`flex-1 py-1.5 px-3 rounded-full flex items-center justify-center gap-1.5 transition-all duration-200 ${
            currentRole === 'maker'
              ? 'bg-primary text-on-primary font-semibold shadow-sm'
              : 'text-on-surface-variant hover:text-on-surface'
          }`}
        >
          <span>🎨</span>
          <span>Maker View</span>
        </button>
      </div>
    </div>
  );
};
