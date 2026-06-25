/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { ShieldCheck, Mail, Phone, ExternalLink } from 'lucide-react';

interface FooterProps {
  onNavigate: (view: 'home' | 'coaches' | 'academies' | 'tournaments' | 'jobs' | 'blogs' | 'legal' | 'register' | 'dashboard' | 'admin') => void;
}

export default function Footer({ onNavigate }: FooterProps) {
  return (
    <footer className="bg-white/5 border-t border-white/10 backdrop-blur-md pt-16 pb-8">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Top bar with columns */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-left">
          
          {/* Brand Col */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="h-8 w-8 bg-blue-600 rounded-lg flex items-center justify-center text-white font-black text-sm">
                C
              </div>
              <div className="text-left">
                <span className="text-[10px] font-mono tracking-widest text-slate-500 uppercase block">INDIA NATIONAL REGISTER</span>
                <span className="font-display font-black text-white text-lg">CoachVerify.in</span>
              </div>
            </div>

            <p className="text-xs text-slate-400 leading-relaxed font-light">
              India's largest sports certification audit portal, helping school boards, parents, and clubs access verified training talent.
            </p>

            <span className="text-[10px] font-mono text-emerald-400 bg-emerald-500/10 px-2 py-1 rounded inline-block border border-emerald-500/20">
              🇮🇳 National Registry Active
            </span>
          </div>

          {/* Quick Services Directory */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-white tracking-widest uppercase font-mono">Service Portals</h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li>
                <button onClick={() => onNavigate('coaches')} className="hover:text-amber-400 transition-colors cursor-pointer">
                  Find Coaches Directory
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('academies')} className="hover:text-amber-400 transition-colors cursor-pointer">
                  Sports Academies Hub
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('tournaments')} className="hover:text-amber-400 transition-colors cursor-pointer">
                  CBSE & National Tournaments
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('jobs')} className="hover:text-amber-400 transition-colors cursor-pointer">
                  Sports Coaching Jobs
                </button>
              </li>
            </ul>
          </div>

          {/* Legal Compliance */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-white tracking-widest uppercase font-mono">Legal Council</h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li>
                <button onClick={() => onNavigate('legal')} className="hover:text-amber-400 transition-colors cursor-pointer">
                  About CoachVerify.in
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('legal')} className="hover:text-amber-400 transition-colors cursor-pointer">
                  Privacy Regulations
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('legal')} className="hover:text-amber-400 transition-colors cursor-pointer">
                  Terms & Conditions
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('legal')} className="hover:text-amber-400 transition-colors cursor-pointer">
                  Platform Refund Rules
                </button>
              </li>
            </ul>
          </div>

          {/* Helplines and Helpdesk */}
          <div className="space-y-3 text-xs text-slate-400">
            <h4 className="text-xs font-bold text-white tracking-widest uppercase font-mono">Registry Helpdesk</h4>
            <p>For credentials verification support or Razorpay receipt disputes, contact details:</p>
            <div className="space-y-1.5 pt-1.5 font-mono text-slate-300">
              <p className="flex items-center gap-1.5"><Mail className="h-4 w-4 text-slate-500" /> verify@coachverify.in</p>
              <p className="flex items-center gap-1.5"><Phone className="h-4 w-4 text-slate-500" /> +91 (11) 4839-2930</p>
            </div>
          </div>

        </div>

        {/* Lower compliance footer */}
        <div className="border-t border-white/5 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-slate-500">
          <div className="text-center md:text-left space-y-1">
            <p>© {new Date().getFullYear()} CoachVerify.in. All rights reserved. Secured by Razorpay checkout.</p>
            <p className="text-[10px] text-slate-600">Disclaimer: CoachVerify is an independent credential verification database. Registration does not constitute governmental delegation.</p>
          </div>

          <div className="flex gap-4">
            <button 
              onClick={() => onNavigate('admin')}
              className="text-xs font-mono font-bold text-slate-400 hover:text-amber-400 transition-colors cursor-pointer bg-slate-900 px-3 py-1.5 rounded border border-white/5"
            >
              🔒 Administrative Login
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
}
