/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion } from 'motion/react';
import { 
  FileText, ShieldCheck, RefreshCw, Mail, Phone, MapPin, 
  Send, HelpCircle, Building 
} from 'lucide-react';
import { submitContactMessage } from '../lib/api';

export default function LegalPages() {
  const [activeTab, setActiveTab] = useState<'about' | 'privacy' | 'refund' | 'terms' | 'support'>('about');
  
  // Support helpdesk state
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState('');

  const handleSubmitMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !subject || !message) return;

    setLoading(true);
    try {
      await submitContactMessage({ name, email, subject, message });
      setSuccess('✔ Inquiry successfully recorded! Support executives will follow up via email within 12 business hours.');
      setName('');
      setEmail('');
      setSubject('');
      setMessage('');
      setTimeout(() => setSuccess(''), 5000);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const navs = [
    { id: 'about', label: 'About CoachVerify.in', icon: Building },
    { id: 'terms', label: 'Terms & Conditions', icon: FileText },
    { id: 'privacy', label: 'Privacy Regulations', icon: ShieldCheck },
    { id: 'refund', label: 'Refund Policy', icon: RefreshCw },
    { id: 'support', label: 'Support & Helpdesk', icon: Mail }
  ];

  return (
    <div className="py-16 bg-slate-950 min-h-[calc(100vh-5rem)]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-10">
        
        <div className="text-left space-y-2 border-b border-white/5 pb-6">
          <span className="text-[10px] font-mono tracking-widest text-blue-400 uppercase">CORPORATE CHARTER DEPT</span>
          <h1 className="text-3xl font-display font-black text-white">Institutional Regulations & Support</h1>
          <p className="text-sm text-slate-400">Review our national sports compliance policies, refund regulations, terms of service, and access dynamic helpline resources.</p>
        </div>

        {/* Dynamic Dual-Layout Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          
          {/* Navigation panel */}
          <div className="lg:col-span-3 space-y-2">
            {navs.map((nv) => (
              <button
                key={nv.id}
                onClick={() => setActiveTab(nv.id as any)}
                className={`w-full flex items-center gap-3 px-4.5 py-3.5 rounded-xl text-xs font-bold text-left transition-all ${
                  activeTab === nv.id
                    ? 'bg-blue-600 text-white shadow-lg'
                    : 'bg-slate-900/40 hover:bg-slate-900 border border-white/5 text-slate-400 hover:text-white'
                }`}
              >
                <nv.icon className="h-4 w-4 shrink-0" />
                {nv.label}
              </button>
            ))}
          </div>

          {/* Documents Workspace */}
          <div className="lg:col-span-9 rounded-3xl border border-white/10 glass-premium p-6 sm:p-10 text-left min-h-[480px]">
            
            {/* ABOUT US TAB */}
            {activeTab === 'about' && (
              <div className="space-y-6 text-slate-300 text-sm leading-relaxed">
                <h2 className="text-2xl font-display font-black text-white">About CoachVerify.in</h2>
                <p>
                  CoachVerify.in is India's largest and most trusted National Sports Coach Verification, Registration & Directory Platform. 
                  Operated in alignment with physical development initiatives, our main purpose is to weed out uncertified trainers and build an audited registry of active sports professionals.
                </p>
                <p>
                  From grassroots village schools to elite Olympic training academies, we map coaching credentials, NIS/SAI diplomas, and athletic records, offering athletes and parents 100% confidence.
                </p>
                
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4">
                  <div className="p-4 bg-slate-950 rounded-xl border border-white/5">
                    <span className="text-xs text-slate-500 block font-mono">VISION</span>
                    <p className="text-white text-xs font-bold mt-1">To systematically certify 1,00,000+ elite coaches by 2028.</p>
                  </div>
                  <div className="p-4 bg-slate-950 rounded-xl border border-white/5">
                    <span className="text-xs text-slate-500 block font-mono">AUDIT METRIC</span>
                    <p className="text-white text-xs font-bold mt-1">Every coach profile is scrutinized manually by retired SAI directors.</p>
                  </div>
                  <div className="p-4 bg-slate-950 rounded-xl border border-white/5">
                    <span className="text-xs text-slate-500 block font-mono">COOPERATION</span>
                    <p className="text-white text-xs font-bold mt-1">Open data pipelines for school recruitment boards & federations.</p>
                  </div>
                </div>
              </div>
            )}

            {/* TERMS & CONDITIONS TAB */}
            {activeTab === 'terms' && (
              <div className="space-y-6 text-slate-300 text-sm leading-relaxed">
                <h2 className="text-2xl font-display font-black text-white">Terms & Conditions of Registry</h2>
                <p className="text-xs font-mono text-slate-500">Effective: June 2026</p>
                
                <p>
                  By enrolling in CoachVerify.in, you agree to submit legally valid identification (Aadhaar, PAN) and authentic certifications. 
                  Our board reserves the right to suspend any registry profile containing falsified claims, fake sports certificates, or misleading representation without any prior notice.
                </p>

                <h4 className="font-bold text-white text-sm">1. Verification Limits</h4>
                <p>
                  Our Verification stamp (VERIFIED ✔) is an administrative vetting of the submitted document scans. 
                  It does not serve as an absolute endorsement or assumption of liability for a coach's on-ground tactical behavior.
                </p>

                <h4 className="font-bold text-white text-sm">2. Profile Visibility & Direct Communication</h4>
                <p>
                  Verified profiles are immediately discoverable by school scouts, parents, and athletic recruiters. 
                  Communication links (WhatsApp, Phone) remain public to foster collaborative sporting opportunities.
                </p>
              </div>
            )}

            {/* PRIVACY POLICY TAB */}
            {activeTab === 'privacy' && (
              <div className="space-y-6 text-slate-300 text-sm leading-relaxed">
                <h2 className="text-2xl font-display font-black text-white">Privacy Regulations</h2>
                <p className="text-xs font-mono text-slate-500">GDPR & Digital Personal Data Protection (DPDP) Act Aligned</p>
                
                <p>
                  CoachVerify.in is committed to protecting applicant private data. Your Aadhaar details, PAN numbers, and legal identity cards are strictly secured behind 256-bit encrypted environments and are NEVER shown publicly.
                </p>

                <h4 className="font-bold text-white text-sm">What data is public:</h4>
                <ul className="list-disc pl-5 space-y-1 text-slate-400 text-xs">
                  <li>Your Name, Sport, coaching experience, designation, and biography.</li>
                  <li>Your verified academic certifications (e.g. B.P.Ed, NIS, FIFA Licenses).</li>
                  <li>Affiliated training academies, district, state, and student review ratings.</li>
                </ul>
              </div>
            )}

            {/* REFUND POLICY TAB */}
            {activeTab === 'refund' && (
              <div className="space-y-6 text-slate-300 text-sm leading-relaxed">
                <h2 className="text-2xl font-display font-black text-white">Platform Refund Regulations</h2>
                <p className="text-xs font-mono text-slate-500">Fair Transparency Rules</p>
                
                <p>
                  CoachVerify.in charges a nominal, one-time verification fee to process manual verification audits with National/State councils.
                </p>

                <h4 className="font-bold text-white text-sm">Refund Eligibility Guidelines:</h4>
                <ul className="list-disc pl-5 space-y-2 text-slate-400 text-xs">
                  <li>If an application has not yet been reviewed by the admin, you can request a cancellation with 100% refund within 24 hours of enrollment.</li>
                  <li>If the admin requests corrections (Step 5/6) and the coach is unable to provide certificates, a partial refund of 50% can be requested.</li>
                  <li>If an application is rejected due to **fraudulent, forged, or edited certificate uploads**, the registration fee is permanently forfeited to cover legal screening labor.</li>
                </ul>
              </div>
            )}

            {/* SUPPORT HELPDESK TAB */}
            {activeTab === 'support' && (
              <div className="space-y-6">
                <div>
                  <h2 className="text-2xl font-display font-black text-white">24/7 National Coach Helpdesk</h2>
                  <p className="text-xs text-slate-400">Need support regarding verification steps, Razorpay status, or changing your registered email? Fill out the quick card below.</p>
                </div>

                {success && (
                  <div className="p-4 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-bold rounded-xl">
                    {success}
                  </div>
                )}

                <form onSubmit={handleSubmitMessage} className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs text-slate-400 font-medium">Your Name *</label>
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="e.g. Ramesh Kumar"
                      className="p-3 rounded-lg bg-slate-950 border border-white/10 text-white text-xs"
                      required
                    />
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs text-slate-400 font-medium">Your Email *</label>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="e.g. ramesh@gmail.com"
                      className="p-3 rounded-lg bg-slate-950 border border-white/10 text-white text-xs"
                      required
                    />
                  </div>

                  <div className="sm:col-span-2 flex flex-col gap-1.5">
                    <label className="text-xs text-slate-400 font-medium">Subject / Inquiry category *</label>
                    <input
                      type="text"
                      value={subject}
                      onChange={(e) => setSubject(e.target.value)}
                      placeholder="e.g. Help needed with SAI license verification"
                      className="p-3 rounded-lg bg-slate-950 border border-white/10 text-white text-xs"
                      required
                    />
                  </div>

                  <div className="sm:col-span-2 flex flex-col gap-1.5">
                    <label className="text-xs text-slate-400 font-medium">Message Body *</label>
                    <textarea
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="Describe your issue or custom request..."
                      rows={4}
                      className="p-3 rounded-lg bg-slate-950 border border-white/10 text-white text-xs focus:outline-none"
                      required
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="sm:col-span-2 py-3 bg-blue-600 hover:bg-blue-500 text-xs font-bold text-white rounded-xl shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <Send className="h-4 w-4" />
                    {loading ? 'Sending message...' : 'Submit Helpdesk Inquiry'}
                  </button>
                </form>

              </div>
            )}

          </div>

        </div>

      </div>
    </div>
  );
}
