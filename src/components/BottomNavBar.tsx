'use client';

import React from 'react';

export type NavTab = 'home' | 'explore' | 'requests' | 'orders' | 'profile';

interface BottomNavBarProps {
  activeTab: NavTab;
  onTabChange: (tab: NavTab) => void;
  requestsBadge?: number;
  ordersBadge?: number;
}

export const BottomNavBar: React.FC<BottomNavBarProps> = ({
  activeTab,
  onTabChange,
  requestsBadge = 2,
  ordersBadge = 0,
}) => {
  return (
    <nav className="fixed bottom-0 left-0 w-full z-50 flex justify-around items-center px-gutter-mobile py-space-xs bg-surface shadow-sm border-t border-outline-variant/40">
      {/* Home */}
      <button
        onClick={() => onTabChange('home')}
        className={`flex flex-col items-center justify-center px-3 py-1 font-label-sm transition-all duration-200 ${
          activeTab === 'home'
            ? 'bg-primary text-on-primary rounded-full'
            : 'text-on-surface-variant hover:bg-surface-container-low active:scale-95'
        }`}
      >
        <span
          className={`material-symbols-outlined text-[20px] ${activeTab === 'home' ? 'fill-1' : ''}`}
          data-icon="cottage"
        >
          cottage
        </span>
        <span className="text-[10px] tracking-tight">Home</span>
      </button>

      {/* Explore */}
      <button
        onClick={() => onTabChange('explore')}
        className={`flex flex-col items-center justify-center px-3 py-1 font-label-sm transition-all duration-200 ${
          activeTab === 'explore'
            ? 'bg-primary text-on-primary rounded-full'
            : 'text-on-surface-variant hover:bg-surface-container-low active:scale-95'
        }`}
      >
        <span
          className={`material-symbols-outlined text-[20px] ${activeTab === 'explore' ? 'fill-1' : ''}`}
          data-icon="search_spark"
        >
          search_spark
        </span>
        <span className="text-[10px] tracking-tight">Explore</span>
      </button>

      {/* Requests */}
      <button
        onClick={() => onTabChange('requests')}
        className={`relative flex flex-col items-center justify-center px-3 py-1 font-label-sm transition-all duration-200 ${
          activeTab === 'requests'
            ? 'bg-primary text-on-primary rounded-full'
            : 'text-on-surface-variant hover:bg-surface-container-low active:scale-95'
        }`}
      >
        <span
          className={`material-symbols-outlined text-[20px] ${activeTab === 'requests' ? 'fill-1' : ''}`}
          data-icon="draw"
        >
          draw
        </span>
        <span className="text-[10px] tracking-tight">Requests</span>
        {requestsBadge > 0 && activeTab !== 'requests' && (
          <span className="absolute top-0 right-2 px-1 py-0.2 bg-secondary text-on-secondary text-[8px] font-bold rounded-full leading-tight">
            {requestsBadge} new
          </span>
        )}
      </button>

      {/* Orders */}
      <button
        onClick={() => onTabChange('orders')}
        className={`relative flex flex-col items-center justify-center px-3 py-1 font-label-sm transition-all duration-200 ${
          activeTab === 'orders'
            ? 'bg-primary text-on-primary rounded-full'
            : 'text-on-surface-variant hover:bg-surface-container-low active:scale-95'
        }`}
      >
        <span
          className={`material-symbols-outlined text-[20px] ${activeTab === 'orders' ? 'fill-1' : ''}`}
          data-icon="receipt_long"
        >
          receipt_long
        </span>
        <span className="text-[10px] tracking-tight">Orders</span>
        {ordersBadge > 0 && activeTab !== 'orders' && (
          <span className="absolute top-0 right-2 px-1 py-0.2 bg-primary text-on-primary text-[8px] font-bold rounded-full leading-tight">
            {ordersBadge}
          </span>
        )}
      </button>

      {/* Profile */}
      <button
        onClick={() => onTabChange('profile')}
        className={`flex flex-col items-center justify-center px-3 py-1 font-label-sm transition-all duration-200 ${
          activeTab === 'profile'
            ? 'bg-primary text-on-primary rounded-full'
            : 'text-on-surface-variant hover:bg-surface-container-low active:scale-95'
        }`}
      >
        <span
          className={`material-symbols-outlined text-[20px] ${activeTab === 'profile' ? 'fill-1' : ''}`}
          data-icon="person"
        >
          person
        </span>
        <span className="text-[10px] tracking-tight">Profile</span>
      </button>
    </nav>
  );
};
