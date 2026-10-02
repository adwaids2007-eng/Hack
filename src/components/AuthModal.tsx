'use client';

import React, { useState } from 'react';
import { Profile, UserRole } from '../types';
import { CampusCraftSymbol } from './CampusCraftLogo';

interface AuthModalProps {
  currentUser: Profile;
  profiles: Profile[];
  onClose: () => void;
  onSwitchUser: (profile: Profile) => void;
  onCreateAccount: (name: string, email: string, role: UserRole, college: string) => void;
  onLogout: () => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({
  currentUser,
  profiles,
  onClose,
  onSwitchUser,
  onCreateAccount,
  onLogout,
}) => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [role, setRole] = useState<UserRole>('customer');
  const [college, setCollege] = useState('Adi Shankara Institute of Engineering and Technology (ASIET)');

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim()) return;
    onCreateAccount(name.trim(), email.trim(), role, college.trim());
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-on-background/40 backdrop-blur-xs animate-fade-in">
      <div
        className="bg-surface-container-lowest max-w-md w-full rounded-2xl border border-outline-variant shadow-xl overflow-hidden max-h-[90vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between p-4 border-b border-outline-variant/40 bg-surface">
          <div className="flex items-center gap-2.5">
            <CampusCraftSymbol size={32} />
            <div>
              <h3 className="text-title-lg font-title-lg text-on-surface">CampusCraft Account</h3>
              <p className="text-body-sm text-outline">ASIET Student Creator Atelier</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full flex items-center justify-center text-on-surface-variant hover:bg-surface-container transition-colors"
          >
            <span className="material-symbols-outlined text-[20px]">close</span>
          </button>
        </div>

        <div className="overflow-y-auto p-5 space-y-5">
          {/* Active User Banner */}
          <div className="p-3.5 rounded-xl bg-surface-container border border-outline-variant/50 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <img
                src={
                  currentUser.profile_image ||
                  'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80'
                }
                alt={currentUser.name}
                className="w-12 h-12 rounded-full object-cover border border-outline-variant"
              />
              <div>
                <div className="flex items-center gap-1.5">
                  <h4 className="text-title-md font-semibold text-on-surface">{currentUser.name}</h4>
                  <span className="text-[10px] uppercase font-bold px-2 py-0.5 rounded-full bg-secondary-container text-on-secondary-container">
                    {currentUser.role}
                  </span>
                </div>
                <p className="text-xs text-outline">{currentUser.email}</p>
              </div>
            </div>
            <button
              onClick={onLogout}
              className="text-xs text-red-700 hover:underline font-semibold px-2 py-1"
            >
              Sign out
            </button>
          </div>

          {/* Quick Demo Switcher */}
          <div className="space-y-2">
            <label className="text-xs font-semibold text-outline uppercase tracking-wider block">
              1-Click Demo Personas (Hackathon Fast Switch)
            </label>
            <div className="space-y-1.5">
              {profiles.map((p) => {
                const isActive = p.id === currentUser.id;
                return (
                  <button
                    key={p.id}
                    onClick={() => {
                      onSwitchUser(p);
                      onClose();
                    }}
                    className={`w-full p-2.5 rounded-xl flex items-center justify-between border text-left transition-colors ${
                      isActive
                        ? 'bg-surface-container-high border-primary font-semibold'
                        : 'bg-surface hover:bg-surface-container border-outline-variant/50'
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-full bg-primary-container text-on-primary flex items-center justify-center font-bold text-xs shrink-0">
                        {p.name[0]}
                      </div>
                      <div className="min-w-0">
                        <div className="flex items-center gap-1.5">
                          <span className="text-body-sm font-medium text-on-surface truncate">{p.name}</span>
                          {p.verified && (
                            <span className="material-symbols-outlined text-[14px] text-primary" title="Verified">
                              verified
                            </span>
                          )}
                        </div>
                        <span className="text-[10px] text-outline block truncate">
                          {p.role === 'maker' ? '🎨 Creator / Maker' : '🛍️ Customer / Buyer'} • {p.college || 'ASIET'}
                        </span>
                      </div>
                    </div>
                    {isActive ? (
                      <span className="text-xs text-primary font-bold px-2">Active</span>
                    ) : (
                      <span className="text-xs text-outline hover:text-primary px-2">Switch</span>
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* New Account Form Toggle */}
          <div className="pt-2 border-t border-outline-variant/40">
            <button
              onClick={() => setIsSignUp(!isSignUp)}
              className="text-xs font-semibold text-primary hover:underline flex items-center gap-1"
            >
              <span className="material-symbols-outlined text-[16px]">
                {isSignUp ? 'expand_less' : 'person_add'}
              </span>
              {isSignUp ? 'Hide Registration' : 'Register New College Account'}
            </button>

            {isSignUp && (
              <form onSubmit={handleRegister} className="mt-3 space-y-3 p-3 rounded-xl bg-surface border border-outline-variant/60 animate-fade-in">
                <div className="space-y-1">
                  <label className="block text-xs font-semibold text-on-surface">Full Name</label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Priya Sharma"
                    className="w-full p-2 rounded-lg bg-surface-container-lowest border border-outline-variant text-xs outline-none"
                  />
                </div>

                <div className="space-y-1">
                  <label className="block text-xs font-semibold text-on-surface">Campus Email (.edu)</label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="priya@campus.edu"
                    className="w-full p-2 rounded-lg bg-surface-container-lowest border border-outline-variant text-xs outline-none"
                  />
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div className="space-y-1">
                    <label className="block text-xs font-semibold text-on-surface">Role</label>
                    <select
                      value={role}
                      onChange={(e) => setRole(e.target.value as UserRole)}
                      className="w-full p-2 rounded-lg bg-surface-container-lowest border border-outline-variant text-xs outline-none"
                    >
                      <option value="customer">Customer</option>
                      <option value="maker">Maker / Creator</option>
                    </select>
                  </div>
                  <div className="space-y-1">
                    <label className="block text-xs font-semibold text-on-surface">College / Campus</label>
                    <input
                      type="text"
                      value={college}
                      onChange={(e) => setCollege(e.target.value)}
                      className="w-full p-2 rounded-lg bg-surface-container-lowest border border-outline-variant text-xs outline-none"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full py-2 bg-primary text-on-primary rounded-lg text-xs font-semibold hover:bg-primary-container transition-colors shadow-xs"
                >
                  Create & Login
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
