/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { 
  Users, CheckCircle2, ShieldAlert, CreditCard, Star, 
  MessageSquare, Settings, Edit, Trash2, Check, X, FileText 
} from 'lucide-react';
import { Coach, PaymentDetails, Review, ContactMessage } from '../types';
import { 
  fetchCoaches, updateCoachProfile, deleteCoachProfile, 
  fetchAllPayments, fetchAllReviews, approveReview, deleteReview, 
  fetchContactMessages, updateAdminSettings, fetchAdminSettings 
} from '../lib/api';

interface AdminPanelProps {
  initialCoaches: Coach[];
  onCoachesUpdated: () => void;
}

export default function AdminPanel({ initialCoaches, onCoachesUpdated }: AdminPanelProps) {
  const [coaches, setCoaches] = useState<Coach[]>(initialCoaches);
  const [payments, setPayments] = useState<PaymentDetails[]>([]);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [contacts, setContacts] = useState<ContactMessage[]>([]);
  const [registrationFee, setRegistrationFee] = useState(100);
  const [activeTab, setActiveTab] = useState<'applications' | 'payments' | 'reviews' | 'contacts' | 'settings'>('applications');
  const [appFilter, setAppFilter] = useState<'pending' | 'approved' | 'rejected' | 'correction'>('pending');

  const [loading, setLoading] = useState(false);
  const [successMsg, setSuccessMsg] = useState('');
  
  // Correction Notes modal state
  const [focusCoach, setFocusCoach] = useState<Coach | null>(null);
  const [correctionNote, setCorrectionNote] = useState('');

  useEffect(() => {
    loadAdminData();
  }, []);

  const loadAdminData = async () => {
    try {
      const cList = await fetchCoaches();
      setCoaches(cList);
      
      const pList = await fetchAllPayments();
      setPayments(pList);
      
      const rList = await fetchAllReviews();
      setReviews(rList);
      
      const mList = await fetchContactMessages();
      setContacts(mList);

      const settings = await fetchAdminSettings();
      setRegistrationFee(settings.registrationFee);
    } catch (err) {
      console.error(err);
    }
  };

  const handleStatusChange = async (coachId: string, status: 'approved' | 'rejected' | 'correction', notes?: string) => {
    setLoading(true);
    try {
      await updateCoachProfile(coachId, { 
        status, 
        correctionNotes: notes,
        isVerified: status === 'approved' 
      });
      setSuccessMsg(`✔ Application status updated to ${status.toUpperCase()}!`);
      setTimeout(() => setSuccessMsg(''), 3000);
      loadAdminData();
      onCoachesUpdated();
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
      setFocusCoach(null);
      setCorrectionNote('');
    }
  };

  const handleDeleteCoach = async (id: string) => {
    if (!window.confirm('Are you absolutely sure you want to permanently delete this coach profile?')) return;
    try {
      await deleteCoachProfile(id);
      setSuccessMsg('✔ Coach deleted successfully.');
      setTimeout(() => setSuccessMsg(''), 3000);
      loadAdminData();
      onCoachesUpdated();
    } catch (err) {
      console.error(err);
    }
  };

  const handleApproveReview = async (id: string) => {
    try {
      await approveReview(id);
      setSuccessMsg('✔ Review approved and catalogued!');
      setTimeout(() => setSuccessMsg(''), 3000);
      loadAdminData();
    } catch (err) {
      console.error(err);
    }
  };

  const handleDeleteReview = async (id: string) => {
    try {
      await deleteReview(id);
      setSuccessMsg('✔ Review moderated and deleted.');
      setTimeout(() => setSuccessMsg(''), 3000);
      loadAdminData();
    } catch (err) {
      console.error(err);
    }
  };

  const handleUpdateFee = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await updateAdminSettings({ registrationFee, paymentGatewayEnabled: true });
      setSuccessMsg('✔ Registration fee configuration updated!');
      setTimeout(() => setSuccessMsg(''), 3000);
    } catch (err) {
      console.error(err);
    }
  };

  // Filtered applications list
  const filteredApps = coaches.filter(c => c.status === appFilter);

  // Stats Counters
  const pendingCount = coaches.filter(c => c.status === 'pending').length;
  const approvedCount = coaches.filter(c => c.status === 'approved').length;
  const rejectedCount = coaches.filter(c => c.status === 'rejected').length;
  const correctionCount = coaches.filter(c => c.status === 'correction').length;

  const totalFeeCollected = payments.reduce((acc, curr) => acc + curr.amount, 0);

  return (
    <div className="py-12 bg-slate-950 min-h-[calc(100vh-5rem)]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Admin Title */}
        <div className="text-left space-y-2">
          <span className="text-[10px] font-mono tracking-[0.25em] uppercase text-amber-400 font-bold bg-amber-500/10 px-2.5 py-1 rounded">
            CENTRAL NATIONAL COMMAND
          </span>
          <h1 className="text-3xl font-display font-black text-white">CoachVerify Administrative Command Center</h1>
          <p className="text-sm text-slate-400">Review sports credentials, manage registrations, audit payments, and moderate review submissions.</p>
        </div>

        {/* Stats Summary Bento Block */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          <div className="p-4 bg-slate-900 border border-white/5 rounded-2xl text-left">
            <span className="text-[10px] text-slate-500 font-mono block">Pending Reviews</span>
            <span className="text-2xl font-display font-black text-amber-400">{pendingCount}</span>
          </div>
          <div className="p-4 bg-slate-900 border border-white/5 rounded-2xl text-left">
            <span className="text-[10px] text-slate-500 font-mono block">Approved Registry</span>
            <span className="text-2xl font-display font-black text-emerald-400">{approvedCount}</span>
          </div>
          <div className="p-4 bg-slate-900 border border-white/5 rounded-2xl text-left">
            <span className="text-[10px] text-slate-500 font-mono block">Needs Correction</span>
            <span className="text-2xl font-display font-black text-blue-400">{correctionCount}</span>
          </div>
          <div className="p-4 bg-slate-900 border border-white/5 rounded-2xl text-left col-span-2 md:col-span-1">
            <span className="text-[10px] text-slate-500 font-mono block">Reviews Moderation</span>
            <span className="text-2xl font-display font-black text-purple-400">{reviews.filter(r => !r.isApproved).length} Pending</span>
          </div>
          <div className="p-4 bg-gradient-to-br from-slate-900 to-slate-950 border border-amber-500/20 rounded-2xl text-left col-span-2">
            <span className="text-[10px] text-amber-400 font-mono block">Total Revenue Audited</span>
            <span className="text-2xl font-display font-black text-white">₹{totalFeeCollected + approvedCount * 100}.00</span>
          </div>
        </div>

        {successMsg && (
          <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-semibold text-left">
            {successMsg}
          </div>
        )}

        {/* ADMIN WORKSPACE SUB NAVIGATION */}
        <div className="flex flex-wrap gap-2 border-b border-white/5 pb-4">
          <button
            onClick={() => setActiveTab('applications')}
            className={`px-4.5 py-2.5 rounded-lg text-xs font-bold transition-all ${activeTab === 'applications' ? 'bg-blue-600 text-white shadow-md' : 'text-slate-400 hover:text-white'}`}
          >
            Applications Dashboard ({pendingCount})
          </button>
          <button
            onClick={() => setActiveTab('payments')}
            className={`px-4.5 py-2.5 rounded-lg text-xs font-bold transition-all ${activeTab === 'payments' ? 'bg-blue-600 text-white shadow-md' : 'text-slate-400 hover:text-white'}`}
          >
            Razorpay Transaction Logs ({payments.length})
          </button>
          <button
            onClick={() => setActiveTab('reviews')}
            className={`px-4.5 py-2.5 rounded-lg text-xs font-bold transition-all ${activeTab === 'reviews' ? 'bg-blue-600 text-white shadow-md' : 'text-slate-400 hover:text-white'}`}
          >
            Student Reviews Moderation ({reviews.filter(r => !r.isApproved).length})
          </button>
          <button
            onClick={() => setActiveTab('contacts')}
            className={`px-4.5 py-2.5 rounded-lg text-xs font-bold transition-all ${activeTab === 'contacts' ? 'bg-blue-600 text-white shadow-md' : 'text-slate-400 hover:text-white'}`}
          >
            Contact Center Messages ({contacts.length})
          </button>
          <button
            onClick={() => setActiveTab('settings')}
            className={`px-4.5 py-2.5 rounded-lg text-xs font-bold transition-all ${activeTab === 'settings' ? 'bg-blue-600 text-white shadow-md' : 'text-slate-400 hover:text-white'}`}
          >
            Config & Platform Fees
          </button>
        </div>

        {/* WORKSPACE AREA */}
        <div className="rounded-3xl border border-white/10 glass-premium p-6 sm:p-8 min-h-[400px]">
          
          {/* APPLICATIONS REVIEW PANEL */}
          {activeTab === 'applications' && (
            <div className="space-y-6 text-left">
              
              {/* Internal filters */}
              <div className="flex gap-2 border-b border-white/5 pb-4 text-xs font-semibold">
                <button
                  onClick={() => setAppFilter('pending')}
                  className={`px-3 py-1.5 rounded-lg ${appFilter === 'pending' ? 'bg-amber-500/10 border border-amber-500 text-amber-400' : 'text-slate-400'}`}
                >
                  Pending Review ({pendingCount})
                </button>
                <button
                  onClick={() => setAppFilter('approved')}
                  className={`px-3 py-1.5 rounded-lg ${appFilter === 'approved' ? 'bg-emerald-500/10 border border-emerald-500 text-emerald-400' : 'text-slate-400'}`}
                >
                  Approved Registry ({approvedCount})
                </button>
                <button
                  onClick={() => setAppFilter('rejected')}
                  className={`px-3 py-1.5 rounded-lg ${appFilter === 'rejected' ? 'bg-red-500/10 border border-red-500 text-red-400' : 'text-slate-400'}`}
                >
                  Rejected Profiles ({rejectedCount})
                </button>
                <button
                  onClick={() => setAppFilter('correction')}
                  className={`px-3 py-1.5 rounded-lg ${appFilter === 'correction' ? 'bg-blue-500/10 border border-blue-500 text-blue-400' : 'text-slate-400'}`}
                >
                  Corrections requested ({correctionCount})
                </button>
              </div>

              {/* Coach Application cards */}
              <div className="space-y-4">
                {filteredApps.length > 0 ? (
                  filteredApps.map((coach) => (
                    <div key={coach.id} className="p-5 bg-slate-950/60 rounded-2xl border border-white/5 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                      
                      <div className="flex gap-4 items-start text-left">
                        <img src={coach.photo} alt="coach avatar" className="h-12 w-12 rounded-xl object-cover border border-white/10" />
                        <div className="space-y-1">
                          <h4 className="font-bold text-white text-base">{coach.fullName}</h4>
                          <span className="text-xs text-amber-400 font-medium tracking-wide">🏆 {coach.sport} SPECIALIST</span>
                          <div className="text-[10px] text-slate-500 font-mono">
                            Reg: {coach.registrationNumber} | State: {coach.state} | Aadhaar: {coach.aadhaarNumber}
                          </div>
                        </div>
                      </div>

                      {/* Action Triggers */}
                      <div className="flex flex-wrap gap-2 self-stretch sm:self-center items-center justify-end">
                        
                        {appFilter === 'pending' && (
                          <>
                            <button
                              onClick={() => handleStatusChange(coach.id, 'approved')}
                              className="px-3.5 py-2 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold rounded-lg shadow cursor-pointer"
                            >
                              Approve Profile ✔
                            </button>
                            <button
                              onClick={() => setFocusCoach(coach)}
                              className="px-3.5 py-2 bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold rounded-lg shadow cursor-pointer"
                            >
                              Request Correction
                            </button>
                            <button
                              onClick={() => handleStatusChange(coach.id, 'rejected')}
                              className="px-3.5 py-2 bg-red-600 hover:bg-red-500 text-white text-xs font-bold rounded-lg shadow cursor-pointer"
                            >
                              Reject ✕
                            </button>
                          </>
                        )}

                        {(appFilter === 'approved' || appFilter === 'rejected' || appFilter === 'correction') && (
                          <button
                            onClick={() => handleDeleteCoach(coach.id)}
                            className="p-2 text-red-400 border border-red-500/10 hover:bg-red-500/10 rounded-lg text-xs"
                            title="Delete Permanently"
                          >
                            <Trash2 className="h-4.5 w-4.5" />
                          </button>
                        )}

                      </div>

                    </div>
                  ))
                ) : (
                  <p className="text-xs text-slate-500 py-6 text-center">No profiles found in this category.</p>
                )}
              </div>

            </div>
          )}

          {/* PAYMENTS LOG PANEL */}
          {activeTab === 'payments' && (
            <div className="space-y-6 text-left">
              <div>
                <h3 className="text-lg font-bold text-white">Razorpay Audited Transaction Logs</h3>
                <p className="text-xs text-slate-400">Verifiable transactional logs compiled during digital portal creation.</p>
              </div>

              <div className="bg-slate-950 rounded-xl overflow-hidden border border-white/5">
                <div className="p-4 bg-slate-900 border-b border-white/5 grid grid-cols-5 text-xs font-bold text-slate-400">
                  <span>Applicant Coach</span>
                  <span>Payment Gateway ID</span>
                  <span>Order Reference</span>
                  <span>Method</span>
                  <span className="text-right">Transaction Fee</span>
                </div>

                <div className="divide-y divide-white/5 max-h-[350px] overflow-y-auto">
                  {payments.length > 0 ? (
                    payments.map((p) => (
                      <div key={p.id} className="p-4 grid grid-cols-5 text-xs items-center">
                        <span className="font-semibold text-slate-200">{p.coachName}</span>
                        <span className="font-mono text-slate-500">{p.paymentId}</span>
                        <span className="font-mono text-slate-500">{p.orderId}</span>
                        <span className="font-bold text-blue-400 uppercase">{p.method}</span>
                        <span className="text-right font-black text-amber-400">₹{p.amount}.00</span>
                      </div>
                    ))
                  ) : (
                    <div className="p-8 text-center text-xs text-slate-500">No payment logs audited. All initial seeded profiles are marked pre-verified.</div>
                  )}
                </div>
              </div>

            </div>
          )}

          {/* REVIEWS MODERATION PANEL */}
          {activeTab === 'reviews' && (
            <div className="space-y-6 text-left">
              <div>
                <h3 className="text-lg font-bold text-white">Student Review Submissions</h3>
                <p className="text-xs text-slate-400">Moderate submitted review text. Reviews will appear on coach public records only upon approval.</p>
              </div>

              <div className="space-y-4">
                {reviews.filter(r => !r.isApproved).length > 0 ? (
                  reviews.filter(r => !r.isApproved).map((r) => (
                    <div key={r.id} className="p-4 bg-slate-950/60 border border-white/5 rounded-2xl flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                      <div className="text-left space-y-1 flex-1">
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-white text-xs">{r.studentName}</span>
                          <span className="text-amber-400 font-mono text-[10px]">★ {r.rating} Stars</span>
                        </div>
                        <p className="text-xs text-slate-300 leading-relaxed font-light">"{r.reviewText}"</p>
                        <span className="text-[9px] font-mono text-slate-500 block">Coach ID focus: {r.coachId}</span>
                      </div>

                      <div className="flex gap-2">
                        <button
                          onClick={() => handleApproveReview(r.id)}
                          className="px-3.5 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs rounded-lg cursor-pointer"
                        >
                          Approve Review
                        </button>
                        <button
                          onClick={() => handleDeleteReview(r.id)}
                          className="px-3 py-1.5 border border-red-500/20 hover:bg-red-500/10 text-red-400 text-xs font-semibold rounded-lg"
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="text-xs text-slate-500 py-6 text-center">All review submissions have been audited and moderated!</p>
                )}
              </div>

            </div>
          )}

          {/* CONTACT MESSAGES PANEL */}
          {activeTab === 'contacts' && (
            <div className="space-y-6 text-left">
              <div>
                <h3 className="text-lg font-bold text-white">Contact Center Submissions</h3>
                <p className="text-xs text-slate-400">Read general, legal, and operational inquiry emails sent through CoachVerify helpdesks.</p>
              </div>

              <div className="space-y-4 max-h-[350px] overflow-y-auto pr-2">
                {contacts.length > 0 ? (
                  contacts.map((msg) => (
                    <div key={msg.id} className="p-4 bg-slate-950/60 border border-white/5 rounded-2xl text-left space-y-2">
                      <div className="flex justify-between items-center text-xs text-slate-400 font-mono">
                        <span>From: <strong>{msg.name}</strong> ({msg.email})</span>
                        <span>{new Date(msg.createdAt).toLocaleDateString()}</span>
                      </div>
                      <p className="text-xs font-bold text-white">Subject: {msg.subject}</p>
                      <p className="text-xs text-slate-300 bg-slate-950 p-3 rounded-lg border border-white/5 leading-relaxed">
                        "{msg.message}"
                      </p>
                    </div>
                  ))
                ) : (
                  <p className="text-xs text-slate-500 py-6 text-center">No helpdesk messages received.</p>
                )}
              </div>

            </div>
          )}

          {/* CONFIG PLATFORM SETTINGS */}
          {activeTab === 'settings' && (
            <form onSubmit={handleUpdateFee} className="space-y-6 text-left max-w-md">
              <div>
                <h3 className="text-lg font-bold text-white">Platform Configurations</h3>
                <p className="text-xs text-slate-400">Modify dynamic platform fees, audit payment channels, or enable testing modes.</p>
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-xs text-slate-400 font-semibold">One-time Registration Fee (INR) *</label>
                <div className="relative">
                  <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 text-sm font-bold">₹</span>
                  <input
                    type="number"
                    value={registrationFee}
                    onChange={(e) => setRegistrationFee(parseInt(e.target.value) || 0)}
                    className="w-full pl-8 pr-4 py-3 rounded-lg bg-slate-950 border border-white/10 text-white text-sm font-mono font-bold"
                    required
                  />
                </div>
                <span className="text-[10px] text-slate-500">This fee is charged to sports coaches during step-7 of the enrollment process.</span>
              </div>

              <button
                type="submit"
                className="px-6 py-2.5 bg-blue-600 hover:bg-blue-500 text-xs font-bold text-white rounded-lg shadow-lg cursor-pointer"
              >
                Save Platforms Configurations
              </button>

            </form>
          )}

        </div>

      </div>

      {/* CORRECTION NOTES DIALOG POPUP */}
      {focusCoach && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-white/10 rounded-2xl p-6 w-full max-w-md text-left space-y-4">
            <h4 className="text-base font-bold text-white">Request Application Correction</h4>
            <p className="text-xs text-slate-400">Provide bullet points detailing the corrections required by the applicant (e.g., cleaner certificate copies, details mismatch etc).</p>
            
            <textarea
              placeholder="e.g. Please upload a clear digital scan of your central NIS Coaching certificate to finalize verification."
              value={correctionNote}
              onChange={(e) => setCorrectionNote(e.target.value)}
              rows={4}
              className="w-full p-3 rounded-lg bg-slate-950 border border-white/10 text-xs text-white placeholder-slate-600 focus:outline-none"
            />

            <div className="flex justify-end gap-2">
              <button onClick={() => setFocusCoach(null)} className="px-4 py-2 border border-white/5 text-xs text-slate-400 rounded-lg">Cancel</button>
              <button
                onClick={() => handleStatusChange(focusCoach.id, 'correction', correctionNote)}
                className="px-4 py-2 bg-blue-600 text-white text-xs font-bold rounded-lg"
              >
                Send Request
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
