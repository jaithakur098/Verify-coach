/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { ShieldCheck, Trophy, Menu, X, User, Bell, Bookmark, Settings, LayoutDashboard } from 'lucide-react';

interface NavbarProps {
  currentView: string;
  onNavigate: (view: string) => void;
  onOpenAuth: () => void;
  isCoachLoggedIn: boolean;
  isAdminLoggedIn: boolean;
  onLogout: () => void;
  bookmarksCount: number;
}

export default function Navbar({
  currentView,
  onNavigate,
  onOpenAuth,
  isCoachLoggedIn,
  isAdminLoggedIn,
  onLogout,
  bookmarksCount
}: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { id: 'home', label: 'Home' },
    { id: 'directory', label: 'Directory' },
    { id: 'academies', label: 'Academies' },
    { id: 'tournaments', label: 'Tournaments' },
    { id: 'jobs', label: 'Sports Jobs' },
    { id: 'blogs', label: 'Blog & Advice' },
  ];

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-white/10 glass">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-20 items-center justify-between">
          
          {/* Logo Brand */}
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => onNavigate('home')}>
            <div className="relative flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-blue-600 to-amber-500 p-[1.5px] shadow-lg">
              <div className="flex h-full w-full items-center justify-center rounded-[10px] bg-slate-900">
                <ShieldCheck className="h-6 w-6 text-amber-400 absolute" />
                <Trophy className="h-3 w-3 text-blue-400 -translate-y-1 translate-x-1" />
              </div>
            </div>
            <div className="flex flex-col">
              <span className="font-display text-2xl font-extrabold tracking-tight text-white">
                Coach<span className="bg-gradient-to-r from-blue-400 via-amber-400 to-amber-500 bg-clip-text text-transparent">Verify</span><span className="text-amber-400 text-xs font-semibold">.in</span>
              </span>
              <span className="text-[9px] font-mono tracking-wider uppercase text-blue-400 flex items-center gap-1">
                <span>🇮🇳</span> National Directory Platform
              </span>
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-1">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => {
                  onNavigate(item.id);
                  setIsOpen(false);
                }}
                className={`px-4 py-2 text-sm font-medium rounded-lg transition-all duration-300 ${
                  currentView === item.id
                    ? 'bg-blue-600/20 text-blue-400 border border-blue-500/30'
                    : 'text-slate-300 hover:bg-white/5 hover:text-white'
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>

          {/* User/System Actions */}
          <div className="hidden md:flex items-center gap-3">
            {bookmarksCount > 0 && (
              <button 
                onClick={() => onNavigate('bookmarks')}
                className="relative p-2 text-slate-400 hover:text-amber-400 hover:bg-white/5 rounded-lg transition-all"
                title="Your Bookmarked Coaches"
              >
                <Bookmark className="h-5 w-5" />
                <span className="absolute -top-1 -right-1 flex h-4.5 w-4.5 items-center justify-center rounded-full bg-amber-500 text-[10px] font-bold text-slate-950">
                  {bookmarksCount}
                </span>
              </button>
            )}

            {isAdminLoggedIn ? (
              <button
                onClick={() => onNavigate('admin')}
                className={`flex items-center gap-2 px-4 py-2 text-sm font-semibold rounded-lg transition-all border ${
                  currentView === 'admin'
                    ? 'bg-amber-500 text-slate-950 border-amber-500'
                    : 'bg-amber-500/10 text-amber-400 border-amber-500/30 hover:bg-amber-500 hover:text-slate-950'
                }`}
              >
                <Settings className="h-4 w-4 animate-spin-slow" />
                Admin Panel
              </button>
            ) : isCoachLoggedIn ? (
              <button
                onClick={() => onNavigate('dashboard')}
                className={`flex items-center gap-2 px-4 py-2 text-sm font-semibold rounded-lg transition-all border ${
                  currentView === 'dashboard'
                    ? 'bg-blue-600 text-white border-blue-500'
                    : 'bg-blue-600/10 text-blue-400 border-blue-500/30 hover:bg-blue-600 hover:text-white'
                }`}
              >
                <LayoutDashboard className="h-4 w-4" />
                Coach Panel
              </button>
            ) : null}

            {isCoachLoggedIn || isAdminLoggedIn ? (
              <button
                onClick={onLogout}
                className="px-4 py-2 text-sm font-medium text-red-400 border border-red-500/20 hover:bg-red-500/10 rounded-lg transition-all"
              >
                Logout
              </button>
            ) : (
              <button
                onClick={onOpenAuth}
                className="flex items-center gap-2 px-5 py-2.5 text-sm font-semibold text-slate-950 bg-gradient-to-r from-blue-500 via-amber-400 to-amber-500 hover:from-blue-600 hover:to-amber-600 rounded-lg shadow-[0_4px_20px_rgba(59,130,246,0.3)] hover:shadow-[0_4px_25px_rgba(245,158,11,0.4)] transition-all duration-300 font-display transform hover:-translate-y-[1px]"
              >
                <User className="h-4 w-4" />
                Portal Access
              </button>
            )}
          </div>

          {/* Mobile Menu Trigger */}
          <div className="flex md:hidden items-center gap-2">
            {bookmarksCount > 0 && (
              <button 
                onClick={() => onNavigate('bookmarks')}
                className="p-2 text-slate-400 hover:text-amber-400 rounded-lg relative"
              >
                <Bookmark className="h-5 w-5" />
                <span className="absolute top-0 right-0 h-4 w-4 bg-amber-500 text-[9px] font-bold text-slate-950 rounded-full flex items-center justify-center">
                  {bookmarksCount}
                </span>
              </button>
            )}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 text-slate-400 hover:text-white hover:bg-white/5 rounded-lg"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Menu Panel */}
      {isOpen && (
        <div className="md:hidden border-t border-white/10 bg-slate-950/95 backdrop-blur-lg px-4 py-6 space-y-3">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => {
                onNavigate(item.id);
                setIsOpen(false);
              }}
              className={`block w-full text-left px-4 py-3 text-base font-medium rounded-lg transition-all ${
                currentView === item.id
                  ? 'bg-blue-600/20 text-blue-400 border border-blue-500/30'
                  : 'text-slate-300 hover:bg-white/5'
              }`}
            >
              {item.label}
            </button>
          ))}
          
          <div className="pt-4 border-t border-white/10 space-y-2">
            {isAdminLoggedIn && (
              <button
                onClick={() => {
                  onNavigate('admin');
                  setIsOpen(false);
                }}
                className="flex items-center gap-2 w-full px-4 py-3 text-base font-semibold text-amber-400 bg-amber-500/10 border border-amber-500/20 rounded-lg"
              >
                <Settings className="h-5 w-5" />
                Admin Dashboard
              </button>
            )}

            {isCoachLoggedIn && (
              <button
                onClick={() => {
                  onNavigate('dashboard');
                  setIsOpen(false);
                }}
                className="flex items-center gap-2 w-full px-4 py-3 text-base font-semibold text-blue-400 bg-blue-600/10 border border-blue-500/20 rounded-lg"
              >
                <LayoutDashboard className="h-5 w-5" />
                Coach Dashboard
              </button>
            )}

            {isCoachLoggedIn || isAdminLoggedIn ? (
              <button
                onClick={() => {
                  onLogout();
                  setIsOpen(false);
                }}
                className="block w-full text-center px-4 py-3 text-base font-medium text-red-400 border border-red-500/20 rounded-lg"
              >
                Logout
              </button>
            ) : (
              <button
                onClick={() => {
                  onOpenAuth();
                  setIsOpen(false);
                }}
                className="flex items-center justify-center gap-2 w-full px-4 py-3 text-base font-semibold text-slate-950 bg-gradient-to-r from-blue-500 to-amber-400 rounded-lg"
              >
                <User className="h-5 w-5" />
                Portal Access
              </button>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
