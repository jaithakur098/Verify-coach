/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { X, CheckCircle, Calendar, Phone, Mail, Globe, MapPin, Award, BookOpen, MessageSquare, Star, Share2, Printer, Download, ArrowRight, ShieldAlert } from 'lucide-react';
import { Coach, Review } from '../types';
import { fetchApprovedReviews, submitReview } from '../lib/api';

interface CoachProfileModalProps {
  coach: Coach;
  onClose: () => void;
  isAdminMode?: boolean;
  onReviewsUpdated?: () => void;
}

export default function CoachProfileModal({ coach, onClose, isAdminMode = false, onReviewsUpdated }: CoachProfileModalProps) {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [studentName, setStudentName] = useState('');
  const [rating, setRating] = useState(5);
  const [reviewText, setReviewText] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState('');
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    loadReviews();
  }, [coach]);

  const loadReviews = async () => {
    try {
      const data = await fetchApprovedReviews(coach.id);
      setReviews(data);
    } catch (e) {
      console.error(e);
    }
  };

  const handleReviewSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!studentName || !reviewText) return;

    setSubmitting(true);
    try {
      await submitReview({
        coachId: coach.id,
        studentName,
        rating,
        reviewText
      });
      setMessage('✔ Review submitted successfully! It will be visible once approved by the admin.');
      setStudentName('');
      setReviewText('');
      setRating(5);
      onReviewsUpdated?.();
    } catch (err) {
      console.error(err);
      setMessage('❌ Failed to submit review. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  const handleShare = () => {
    const url = `${window.location.origin}/verify/${coach.registrationNumber}`;
    navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4">
      <div className="relative w-full max-w-5xl bg-slate-900 border border-white/10 rounded-3xl overflow-hidden shadow-2xl flex flex-col max-h-[92vh]">
        
        {/* Header bar */}
        <div className="flex justify-between items-center px-6 py-4 border-b border-white/5 bg-slate-950/60 sticky top-0 z-20">
          <div className="flex items-center gap-2">
            <span className="text-xs bg-amber-500/10 text-amber-400 font-mono font-bold border border-amber-500/20 px-2.5 py-1 rounded">
              CV PROFILE ENGINE
            </span>
            <span className="text-xs text-slate-400">ID: {coach.coachId}</span>
          </div>
          <button onClick={onClose} className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-white/5 transition-all">
            <X className="h-6 w-6" />
          </button>
        </div>

        {/* Scrollable Profile Content */}
        <div className="overflow-y-auto p-6 sm:p-8 space-y-8 text-left printable-area">
          
          {/* TOP COVER SUMMARY CARD */}
          <div className="relative glass-premium border border-amber-500/15 rounded-2xl p-6 flex flex-col md:flex-row gap-6 items-center md:items-start justify-between shadow-xl">
            {/* Background luxury gradient cover strip */}
            <div className="absolute top-0 inset-x-0 h-1.5 bg-gradient-to-r from-blue-600 via-amber-500 to-amber-600" />

            <div className="flex flex-col md:flex-row gap-6 items-center md:items-start text-center md:text-left">
              {/* Photo */}
              <div className="relative h-28 w-28 rounded-2xl overflow-hidden border border-white/15 shadow-md">
                <img src={coach.photo} alt={coach.fullName} className="h-full w-full object-cover" />
              </div>

              {/* Identity Details */}
              <div className="space-y-1.5">
                <div className="flex items-center gap-2 flex-wrap justify-center md:justify-start">
                  <h2 className="text-2xl sm:text-3xl font-display font-extrabold text-white tracking-tight">
                    {coach.fullName}
                  </h2>
                  <span className="bg-emerald-500 text-slate-950 font-extrabold text-[10px] tracking-wide uppercase px-2 py-0.5 rounded flex items-center gap-1">
                    ✔ VERIFIED
                  </span>
                </div>

                <p className="text-sm text-amber-400 font-semibold">{coach.designation} at {coach.currentAcademy}</p>
                <div className="flex flex-wrap gap-2 text-xs text-slate-300 justify-center md:justify-start font-mono">
                  <span>🏏 {coach.sport}</span>
                  <span>•</span>
                  <span>📍 {coach.district}, {coach.state}</span>
                  <span>•</span>
                  <span>⏱ {coach.coachingExperience} Years Exp</span>
                </div>

                <div className="pt-2 flex flex-wrap gap-1.5 justify-center md:justify-start">
                  <span className="px-2.5 py-1 rounded bg-blue-500/10 text-blue-300 border border-blue-500/20 text-xs font-mono">
                    Reg No: {coach.registrationNumber}
                  </span>
                  <span className="px-2.5 py-1 rounded bg-slate-800 text-slate-300 border border-white/5 text-xs font-mono">
                    DOB: {coach.dob}
                  </span>
                </div>
              </div>
            </div>

            {/* QR Verification and Digital Badge Side */}
            <div className="flex flex-col items-center justify-between border-t md:border-t-0 md:border-l border-white/10 pt-4 md:pt-0 md:pl-6 self-stretch min-w-[140px] gap-3">
              <div className="bg-white p-1 rounded-xl h-24 w-24 flex items-center justify-center">
                <img src={coach.qrCode} alt="Verification QR" className="h-full w-full" />
              </div>
              <span className="text-[9px] font-mono tracking-wider text-slate-400 uppercase text-center block">
                SCAN FOR SECURE CERTIFICATE
              </span>
            </div>
          </div>

          {/* TWO COLUMN GRID FOR SPECIFICS */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* LEFT COLUMN: ABOUT, DETAILS, BIO */}
            <div className="lg:col-span-8 space-y-8">
              
              {/* BIOGRAPHY */}
              <div className="space-y-3">
                <h3 className="text-lg font-bold text-white flex items-center gap-2 border-b border-white/5 pb-2">
                  <BookOpen className="h-5 w-5 text-blue-400" /> Biography & Coach Vision
                </h3>
                <p className="text-slate-300 text-sm leading-relaxed whitespace-pre-wrap">
                  {coach.biography}
                </p>
              </div>

              {/* ACHIEVEMENTS AND AWARDS */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                
                {/* Sports Achievements */}
                <div className="border border-white/5 bg-slate-900/40 p-5 rounded-2xl text-left space-y-2">
                  <h4 className="text-xs font-mono tracking-wider uppercase text-amber-400">🥇 Career Achievements</h4>
                  <p className="text-slate-300 text-xs leading-relaxed">
                    {coach.achievements || "Successfully developed and mentored regional athletes toward tournament podium entries."}
                  </p>
                </div>

                {/* Awards */}
                <div className="border border-white/5 bg-slate-900/40 p-5 rounded-2xl text-left space-y-2">
                  <h4 className="text-xs font-mono tracking-wider uppercase text-amber-400">🎖 Outstanding Awards</h4>
                  <p className="text-slate-300 text-xs leading-relaxed">
                    {coach.awards || "Recipient of district sports administration citations for dedication to youth physical curriculum."}
                  </p>
                </div>

              </div>

              {/* ACADEMICS & QUALIFICATIONS */}
              <div className="space-y-4">
                <h3 className="text-lg font-bold text-white flex items-center gap-2 border-b border-white/5 pb-2">
                  <Award className="h-5 w-5 text-blue-400" /> Certifications & Educational Credentials
                </h3>
                
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="bg-slate-950 p-4 rounded-xl border border-white/5">
                    <span className="text-[10px] text-slate-500 font-mono uppercase block">Highest Qualification</span>
                    <span className="text-xs font-bold text-white block mt-1">{coach.highestQualification}</span>
                  </div>
                  <div className="bg-slate-950 p-4 rounded-xl border border-white/5">
                    <span className="text-[10px] text-slate-500 font-mono uppercase block">Sports Qualification</span>
                    <span className="text-xs font-bold text-white block mt-1">{coach.sportsQualification}</span>
                  </div>
                  <div className="bg-slate-950 p-4 rounded-xl border border-white/5">
                    <span className="text-[10px] text-slate-500 font-mono uppercase block">Coaching Licensure</span>
                    <span className="text-xs font-bold text-white block mt-1">{coach.coachingQualification}</span>
                  </div>
                </div>
              </div>

              {/* ADDITIONAL PARTICIPATION DETAIL */}
              <div className="border border-white/5 bg-slate-900/40 p-5 rounded-2xl space-y-3">
                <h4 className="text-sm font-bold text-white uppercase font-mono tracking-wide">🏆 National & International Representation</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs text-slate-300">
                  <div>
                    <span className="text-slate-500 block">National Level Participation:</span>
                    <span className="font-semibold text-slate-200 block mt-0.5">{coach.nationalParticipation || "Represented state team in state-level championship trails."}</span>
                  </div>
                  <div>
                    <span className="text-slate-500 block">International Representation:</span>
                    <span className="font-semibold text-slate-200 block mt-0.5">{coach.internationalParticipation || "None / State Levels"}</span>
                  </div>
                </div>
              </div>

              {/* GALLERY AND STUDENT TRIUMPHS */}
              <div className="space-y-4">
                <h3 className="text-lg font-bold text-white flex items-center gap-2 border-b border-white/5 pb-2">
                  📸 Showcase & Gallery
                </h3>
                <div className="grid grid-cols-3 gap-3">
                  {coach.gallery && coach.gallery.length > 0 ? (
                    coach.gallery.map((img, i) => (
                      <div key={i} className="h-24 sm:h-32 rounded-xl overflow-hidden border border-white/5 bg-slate-950">
                        <img src={img} alt="Showcase" className="h-full w-full object-cover" />
                      </div>
                    ))
                  ) : (
                    <div className="col-span-full py-8 text-center bg-slate-950 border border-white/5 rounded-xl text-xs text-slate-500">
                      No gallery media uploaded.
                    </div>
                  )}
                </div>
              </div>

            </div>

            {/* RIGHT COLUMN: CONTACT, SHARE, RATINGS, DIGITAL ID */}
            <div className="lg:col-span-4 space-y-6">
              
              {/* ACTION TOOLBAR CARD */}
              <div className="bg-slate-950 p-5 rounded-2xl border border-white/10 space-y-3">
                <h4 className="text-xs font-mono tracking-widest uppercase text-slate-400 mb-2">ACTIONS</h4>
                
                {/* Print button */}
                <button
                  onClick={handlePrint}
                  className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl border border-white/10 hover:border-amber-500/40 hover:bg-amber-500/5 text-xs font-semibold text-slate-200 hover:text-amber-400 transition-all cursor-pointer"
                >
                  <Printer className="h-4 w-4" />
                  Print Verified Record
                </button>

                {/* Share URL */}
                <button
                  onClick={handleShare}
                  className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-xs font-bold text-white shadow-lg transition-all cursor-pointer"
                >
                  <Share2 className="h-4 w-4" />
                  {copied ? "Copied Link!" : "Copy Verification URL"}
                </button>

                {/* Direct buttons */}
                <a
                  href={`https://wa.me/${coach.whatsapp.replace('+', '')}`}
                  target="_blank"
                  rel="noreferrer"
                  className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl border border-emerald-500/30 bg-emerald-500/5 hover:bg-emerald-500/15 text-xs font-bold text-emerald-400 transition-all text-center block"
                >
                  💬 Chat on WhatsApp
                </a>

                <a
                  href={`tel:${coach.phone}`}
                  className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl border border-white/5 hover:bg-white/5 text-xs font-semibold text-slate-300 transition-all text-center block"
                >
                  📞 Call Now
                </a>
              </div>

              {/* DIGITAL COACH ID MINIATURE SHOWCASE */}
              <div className="bg-gradient-to-br from-slate-900 to-slate-950 rounded-2xl p-5 border border-amber-500/20 shadow-xl space-y-4">
                <span className="text-[10px] font-mono tracking-widest text-amber-400 uppercase">DIGITAL IDENTITY PASSPORT</span>
                
                {/* Premium Identity Card Rendering */}
                <div className="relative rounded-2xl overflow-hidden bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 border border-amber-500/30 p-4 shadow-2xl flex flex-col justify-between h-48 text-left group">
                  {/* Decorative Shield graphic */}
                  <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/5 rounded-full blur-xl pointer-events-none" />
                  <div className="absolute top-2 right-2 flex items-center gap-1.5 bg-amber-500/15 text-amber-400 font-bold font-mono text-[8px] px-1.5 py-0.5 rounded border border-amber-500/20">
                    CV ID ✔
                  </div>

                  <div className="flex gap-3 items-start z-10">
                    <div className="h-14 w-14 rounded-lg overflow-hidden border border-white/10">
                      <img src={coach.photo} alt={coach.fullName} className="h-full w-full object-cover" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h5 className="font-display font-extrabold text-white text-sm truncate">{coach.fullName}</h5>
                      <span className="text-[9px] text-amber-400 font-mono tracking-wide font-bold block">{coach.sport} SPECIALIST</span>
                      <span className="text-[8px] font-mono text-slate-400 uppercase block mt-1">Reg: {coach.registrationNumber}</span>
                    </div>
                  </div>

                  <div className="flex justify-between items-end pt-2 border-t border-white/5 z-10">
                    <div className="text-left">
                      <span className="text-[7px] text-slate-500 uppercase font-mono block">State Council</span>
                      <span className="text-[10px] font-bold text-slate-300">{coach.state}</span>
                    </div>
                    <div className="h-10 w-10 bg-white p-0.5 rounded">
                      <img src={coach.qrCode} alt="mini qr" className="h-full w-full" />
                    </div>
                  </div>
                </div>

                <button
                  onClick={handlePrint}
                  className="w-full py-2 bg-slate-900 hover:bg-slate-850 text-slate-300 border border-white/5 rounded-lg text-xs font-semibold"
                >
                  Download HD Badge (Print)
                </button>
              </div>

              {/* RATINGS & STUDENT REVIEWS MODERATED ZONE */}
              <div className="border border-white/5 bg-slate-900/60 p-5 rounded-2xl space-y-4">
                <h4 className="text-sm font-bold text-white uppercase font-mono tracking-wide border-b border-white/5 pb-2">
                  ⭐ Student Ratings
                </h4>
                
                <div className="flex items-center gap-3">
                  <div className="text-3xl font-extrabold text-white">{coach.averageRating > 0 ? coach.averageRating.toFixed(1) : "5.0"}</div>
                  <div>
                    <div className="flex gap-0.5">
                      {[1, 2, 3, 4, 5].map((s) => (
                        <Star key={s} className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
                      ))}
                    </div>
                    <span className="text-[10px] text-slate-500 font-mono block">Based on {coach.totalReviews} total reviews</span>
                  </div>
                </div>

                {/* Submissions form */}
                <form onSubmit={handleReviewSubmit} className="space-y-3 text-left pt-2 border-t border-white/5">
                  <span className="text-[10px] font-mono text-slate-400 uppercase block">Submit a Written Review</span>
                  
                  <div>
                    <input
                      type="text"
                      placeholder="Your Full Name"
                      value={studentName}
                      onChange={(e) => setStudentName(e.target.value)}
                      className="w-full p-2 text-xs rounded bg-slate-950 border border-white/10 text-white placeholder-slate-500"
                      required
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-xs text-slate-300">Your Rating:</span>
                    <select
                      value={rating}
                      onChange={(e) => setRating(parseInt(e.target.value))}
                      className="p-1.5 text-xs bg-slate-950 border border-white/10 text-slate-200 rounded"
                    >
                      <option value="5">⭐⭐⭐⭐⭐ (5/5)</option>
                      <option value="4">⭐⭐⭐⭐ (4/5)</option>
                      <option value="3">⭐⭐⭐ (3/5)</option>
                      <option value="2">⭐⭐ (2/5)</option>
                      <option value="1">⭐ (1/5)</option>
                    </select>
                  </div>

                  <div>
                    <textarea
                      placeholder="Share your coaching experience with this verified professional..."
                      value={reviewText}
                      onChange={(e) => setReviewText(e.target.value)}
                      rows={2}
                      className="w-full p-2 text-xs rounded bg-slate-950 border border-white/10 text-white placeholder-slate-500"
                      required
                    />
                  </div>

                  {message && <p className="text-[10px] font-mono text-amber-400">{message}</p>}

                  <button
                    type="submit"
                    disabled={submitting}
                    className="w-full py-1.5 bg-blue-600 hover:bg-blue-500 disabled:opacity-50 text-white text-xs font-bold rounded-lg cursor-pointer"
                  >
                    {submitting ? "Submitting..." : "Submit Review for Verification"}
                  </button>
                </form>

                {/* Review logs display */}
                <div className="space-y-3 pt-3 border-t border-white/5">
                  <span className="text-[10px] font-mono text-slate-400 uppercase block">Recent Verified Reviews</span>
                  {reviews.length > 0 ? (
                    reviews.map((r) => (
                      <div key={r.id} className="p-3 bg-slate-950 rounded-lg text-xs space-y-1">
                        <div className="flex justify-between items-center font-bold">
                          <span className="text-slate-200">{r.studentName}</span>
                          <span className="text-amber-400">★ {r.rating}</span>
                        </div>
                        <p className="text-slate-400 leading-relaxed font-light">{r.reviewText}</p>
                      </div>
                    ))
                  ) : (
                    <p className="text-[10px] text-slate-600">No public reviews available yet. Be the first to rate!</p>
                  )}
                </div>

              </div>

            </div>

          </div>

        </div>

      </div>
    </div>
  );
}
