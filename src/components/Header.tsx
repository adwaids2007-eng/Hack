'use client';

import React, { useState } from 'react';
import { Profile } from '../types';
import { CampusCraftLogo } from './CampusCraftLogo';

interface HeaderProps {
  currentUser: Profile;
  onOpenAuth: () => void;
  onFocusSearch: () => void;
  notificationCount?: number;
  onOpenNotifications?: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentUser,
  onOpenAuth,
  onFocusSearch,
  notificationCount = 2,
}) => {
  const [showNotifications, setShowNotifications] = useState(false);

  return (
    <header className="sticky top-0 z-40 flex justify-between items-center w-full px-gutter-mobile py-space-sm bg-surface shadow-sm border-b border-outline-variant/30">

      {/* CampusCraft Logo */}
      <div
        className="flex items-center cursor-pointer"
        onClick={() =>
          window.scrollTo({
            top: 0,
            behavior: 'smooth',
          })
        }
      >
        <CampusCraftLogo variant="navbar" />
      </div>

      {/* Right-side controls */}
      <div className="flex items-center gap-space-xs">

        {/* Search */}
        <button
          onClick={onFocusSearch}
          aria-label="Search"
          className="w-9 h-9 rounded-full flex items-center justify-center text-on-surface-variant hover:bg-surface-container-low transition-colors duration-200 active:scale-95"
        >
          <span className="material-symbols-outlined text-[22px]">
            search
          </span>
        </button>

        {/* Notifications */}
        <div className="relative">
          <button
            onClick={() =>
              setShowNotifications(!showNotifications)
            }
            aria-label="Notifications"
            className="w-9 h-9 rounded-full flex items-center justify-center text-on-surface-variant hover:bg-surface-container-low transition-colors duration-200 active:scale-95"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="22"
              height="22"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M18 8a6 6 0 0 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9" />
              <path d="M10 21h4" />
            </svg>
          </button>

          {/* Notification indicator */}
          {notificationCount > 0 && (
            <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-primary border-2 border-surface"></span>
          )}

          {/* Notification popup */}
          {showNotifications && (
            <div className="absolute right-0 mt-2 w-72 bg-surface-container-lowest rounded-xl border border-outline-variant shadow-lg p-3 z-50 animate-fade-in text-on-surface">

              <div className="flex items-center justify-between pb-2 border-b border-outline-variant/40">
                <span className="text-title-md font-semibold">
                  Campus Updates
                </span>

                <span className="text-[11px] text-primary font-medium">
                  Clear
                </span>
              </div>

              <div className="mt-2 space-y-2 text-body-sm">

                {/* Update 1 */}
                <div className="p-2 rounded-lg bg-surface-container-low flex items-start gap-2">
                  <span className="material-symbols-outlined text-[18px] text-primary mt-0.5">
                    celebration
                  </span>

                  <div>
                    <p className="font-semibold text-xs text-on-surface">
                      Spring Art Fair is Live!
                    </p>

                    <p className="text-[11px] text-on-surface-variant">
                      Over 15 student creators published new dorm crafts.
                    </p>
                  </div>
                </div>

                {/* Update 2 */}
                <div className="p-2 rounded-lg bg-surface-container-low flex items-start gap-2">
                  <span className="material-symbols-outlined text-[18px] text-primary mt-0.5">
                    verified
                  </span>

                  <div>
                    <p className="font-semibold text-xs text-on-surface">
                      Campus Verified Status
                    </p>

                    <p className="text-[11px] text-on-surface-variant">
                      Your university email is confirmed.
                    </p>
                  </div>
                </div>

              </div>
            </div>
          )}
        </div>

        {/* User Profile */}
        <button
          onClick={onOpenAuth}
          className="flex items-center gap-1.5 pl-1.5 pr-2.5 py-1 rounded-full bg-surface-container border border-outline-variant/60 hover:bg-surface-container-high transition-colors active:scale-95 ml-1"
          title="Switch Account / Auth"
        >
          {currentUser.profile_image ? (
            <img
              src={currentUser.profile_image}
              alt={currentUser.name}
              className="w-6 h-6 rounded-full object-cover border border-primary/20"
            />
          ) : (
            <div className="w-6 h-6 rounded-full bg-primary text-on-primary text-[11px] font-bold flex items-center justify-center">
              {currentUser.name[0]}
            </div>
          )}

          <span className="text-[11px] font-label-md font-semibold text-primary truncate max-w-[70px]">
            {currentUser.name.split(' ')[0]}
          </span>
        </button>

      </div>
    </header>
  );
};