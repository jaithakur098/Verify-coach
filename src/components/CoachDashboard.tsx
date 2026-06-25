/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  User, QrCode, CreditCard, Award, Plus, Sliders, LineChart, 
  Trash2, Edit, Save, BookOpen, Clock, Settings, Sparkles, CheckCircle2,
  ListPlus, Star, Trophy, UsersRound
} from 'lucide-react';
import { Coach, AthletePerformance } from '../types';
import { addAthleteToCoach, updateAthleteMetrics, updateCoachProfile } from '../lib/api';

interface CoachDashboardProps {
  coach: Coach;
  onUpdateCoach: (updated: Coach) => void;
}

export default function CoachDashboard({ coach, onUpdateCoach }: CoachDashboardProps) {
  const [activeTab, setActiveTab] = useState<'athlete-tracker' | 'digital-id' | 'profile-edit' | 'payments'>('athlete-tracker');
  const [loading, setLoading] = useState(false);
  const [successMsg, setSuccessMsg] = useState('');

  // Edit Profile Form State
  const [fullName, setFullName] = useState(coach.fullName);
  const [designation, setDesignation] = useState(coach.designation);
  const [biography, setBiography] = useState(coach.biography);
  const [currentAcademy, setCurrentAcademy] = useState(coach.currentAcademy);
  const [phone, setPhone] = useState(coach.phone);
  const [whatsapp, setWhatsapp] = useState(coach.whatsapp);

  // New Athlete Form State
  const [newAthleteName, setNewAthleteName] = useState('');
  const [newAthleteNotes, setNewAthleteNotes] = useState('');
  const [showAddAthleteModal, setShowAddAthleteModal] = useState(false);

  // Selected Athlete for Detailed Progression Logging
  const [selectedAthlete, setSelectedAthlete] = useState<AthletePerformance | null>(
    coach.athleteMetrics && coach.athleteMetrics.length > 0 ? coach.athleteMetrics[0] : null
  );

  // Log new metrics state
  const [metricSpeed, setMetricSpeed] = useState(80);
  const [metricStamina, setMetricStamina] = useState(80);
  const [metricStrength, setMetricStrength] = useState(80);
  const [metricSkill, setMetricSkill] = useState(80);
  const [metricDiscipline, setMetricDiscipline] = useState(80);
  const [progressNotes, setProgressNotes] = useState('Weekly training metrics updated.');

  const handleProfileSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const updated = await updateCoachProfile(coach.id, {
        fullName,
        designation,
        biography,
        currentAcademy,
        phone,
        whatsapp
      });
      onUpdateCoach(updated);
      setSuccessMsg('✔ Profile updated successfully!');
      setTimeout(() => setSuccessMsg(''), 3000);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleAddAthleteSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newAthleteName) return;

    setLoading(true);
    try {
      const updated = await addAthleteToCoach(coach.id, {
        athleteName: newAthleteName,
        notes: newAthleteNotes,
        metrics: {
          speed: 75,
          stamina: 75,
          strength: 75,
          skill: 75,
          discipline: 75
        }
      });
      onUpdateCoach(updated);
      setNewAthleteName('');
      setNewAthleteNotes('');
      setShowAddAthleteModal(false);
      
      // Select the newly added athlete
      if (updated.athleteMetrics && updated.athleteMetrics.length > 0) {
        setSelectedAthlete(updated.athleteMetrics[0]);
      }
      setSuccessMsg('✔ New student athlete registered!');
      setTimeout(() => setSuccessMsg(''), 3000);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateProgressSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedAthlete) return;

    setLoading(true);
    try {
      const updated = await updateAthleteMetrics(coach.id, selectedAthlete.id, {
        metrics: {
          speed: metricSpeed,
          stamina: metricStamina,
          strength: metricStrength,
          skill: metricSkill,
          discipline: metricDiscipline
        },
        notes: selectedAthlete.notes,
        historyNotes: progressNotes
      });
      onUpdateCoach(updated);
      
      // Update local focus focus
      const freshAthlete = updated.athleteMetrics?.find(a => a.id === selectedAthlete.id);
      if (freshAthlete) {
        setSelectedAthlete(freshAthlete);
      }
      setProgressNotes('Weekly metrics registered.');
      setSuccessMsg('✔ Performance metrics logged and plotted!');
      setTimeout(() => setSuccessMsg(''), 3000);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const menuItems = [
    { id: 'athlete-tracker', label: 'Athlete Progress Tracker', icon: LineChart },
    { id: 'digital-id', label: 'Identity & QR Code', icon: QrCode },
    { id: 'profile-edit', label: 'Modify Profile Details', icon: Edit },
    { id: 'payments', label: 'Payment Audit & Fee History', icon: CreditCard },
  ];

  return (
    <div className="py-12 bg-slate-950 min-h-[calc(100vh-5rem)]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Welcome Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-slate-900/60 p-6 rounded-2xl border border-white/5 text-left">
          <div className="space-y-1.5">
            <span className="text-[10px] font-mono tracking-widest text-blue-400 uppercase">OFFICIAL PORTAL PROFILE</span>
            <div className="flex items-center gap-2">
              <h1 className="text-2xl font-display font-black text-white">Welcome, {coach.fullName}</h1>
              <span className="text-xs bg-emerald-500/10 text-emerald-400 font-bold px-2 py-0.5 rounded border border-emerald-500/20">
                {coach.status.toUpperCase()}
              </span>
            </div>
            <p className="text-xs text-slate-400">
              National Registration ID: <strong className="text-slate-200 font-mono">{coach.registrationNumber}</strong> | Credential: {coach.coachingQualification}
            </p>
          </div>

          <div className="flex gap-2">
            <div className="px-4 py-2.5 bg-slate-950/60 rounded-xl border border-white/5 text-xs">
              <span className="text-slate-500 block">Total Views</span>
              <span className="font-bold text-white font-mono text-sm">342 Hits</span>
            </div>
            <div className="px-4 py-2.5 bg-slate-950/60 rounded-xl border border-white/5 text-xs">
              <span className="text-slate-500 block">Document Downloads</span>
              <span className="font-bold text-amber-400 font-mono text-sm">28 PDFs</span>
            </div>
          </div>
        </div>

        {successMsg && (
          <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-semibold text-left">
            {successMsg}
          </div>
        )}

        {/* MAIN GRID */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Navigation Sidebar */}
          <div className="lg:col-span-3 space-y-2">
            {menuItems.map((item) => (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id as any)}
                className={`w-full flex items-center gap-3 px-4.5 py-3.5 rounded-xl text-xs font-bold text-left transition-all ${
                  activeTab === item.id
                    ? 'bg-blue-600 text-white shadow-lg'
                    : 'bg-slate-900/40 hover:bg-slate-900 border border-white/5 text-slate-400 hover:text-white'
                }`}
              >
                <item.icon className="h-4 w-4 shrink-0" />
                {item.label}
              </button>
            ))}
          </div>

          {/* Tab Workspaces */}
          <div className="lg:col-span-9 rounded-3xl border border-white/10 glass-premium p-6 sm:p-8 min-h-[500px]">
            
            {/* TAB 1: ATHLETE METRICS TRACKER */}
            {activeTab === 'athlete-tracker' && (
              <div className="space-y-6 text-left">
                
                <div className="flex justify-between items-center border-b border-white/5 pb-4">
                  <div>
                    <h2 className="text-xl font-extrabold text-white">Student Athlete Performance Tracker</h2>
                    <p className="text-xs text-slate-400">Map speed, stamina, skills, and plot chronological development metrics over time.</p>
                  </div>
                  <button
                    onClick={() => setShowAddAthleteModal(true)}
                    className="flex items-center gap-1.5 px-4 py-2 bg-blue-600 hover:bg-blue-500 text-xs font-bold text-white rounded-lg shadow transition-all cursor-pointer"
                  >
                    <Plus className="h-3.5 w-3.5" />
                    Add Athlete
                  </button>
                </div>

                {/* Sub-Layout: Athlete selection list or main empty prompt */}
                {coach.athleteMetrics && coach.athleteMetrics.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
                    
                    {/* Athlete List (4 Columns) */}
                    <div className="md:col-span-4 border-r border-white/5 pr-4 space-y-2 max-h-[450px] overflow-y-auto">
                      <span className="text-[10px] font-mono uppercase text-slate-500 tracking-wider">YOUR STUDENTS</span>
                      {coach.athleteMetrics.map((ath) => (
                        <button
                          key={ath.id}
                          onClick={() => {
                            setSelectedAthlete(ath);
                            setMetricSpeed(ath.metrics.speed);
                            setMetricStamina(ath.metrics.stamina);
                            setMetricStrength(ath.metrics.strength);
                            setMetricSkill(ath.metrics.skill);
                            setMetricDiscipline(ath.metrics.discipline);
                          }}
                          className={`w-full p-3.5 rounded-xl text-left border transition-all flex flex-col gap-1 ${
                            selectedAthlete?.id === ath.id
                              ? 'bg-blue-600/10 border-blue-500/40 text-blue-300'
                              : 'bg-slate-950 border-white/5 text-slate-400 hover:text-white'
                          }`}
                        >
                          <span className="font-bold text-xs truncate">{ath.athleteName}</span>
                          <span className="text-[10px] text-slate-500 font-mono tracking-wide uppercase">Primary: {ath.sport}</span>
                        </button>
                      ))}
                    </div>

                    {/* Performance details (8 Columns) */}
                    {selectedAthlete && (
                      <div className="md:col-span-8 space-y-6">
                        
                        {/* Selected Bio */}
                        <div className="flex justify-between items-center bg-slate-950 p-4 rounded-xl border border-white/5">
                          <div className="space-y-0.5">
                            <span className="text-[9px] font-mono text-blue-400 uppercase font-semibold">ACTIVELY TRACKING</span>
                            <h4 className="font-display font-extrabold text-base text-white">{selectedAthlete.athleteName}</h4>
                            <p className="text-[10px] text-slate-500 font-light">Added: {new Date(selectedAthlete.createdAt).toLocaleDateString()}</p>
                          </div>
                          <div className="text-right">
                            <span className="text-[9px] text-slate-500 uppercase font-mono block">Overall Performance</span>
                            <span className="text-xl font-display font-black text-amber-400">
                              {Math.round(
                                (selectedAthlete.metrics.speed + 
                                 selectedAthlete.metrics.stamina + 
                                 selectedAthlete.metrics.strength + 
                                 selectedAthlete.metrics.skill + 
                                 selectedAthlete.metrics.discipline) / 5
                              )}%
                            </span>
                          </div>
                        </div>

                        {/* SLIDERS & RADIAL METRICS LOGS */}
                        <form onSubmit={handleUpdateProgressSubmit} className="grid grid-cols-1 sm:grid-cols-2 gap-6 bg-slate-900/30 p-5 rounded-2xl border border-white/5">
                          
                          <div className="space-y-4 text-left">
                            <span className="text-[10px] font-mono text-amber-400 uppercase tracking-wider block">TRAINING METRICS</span>
                            
                            {/* Speed slider */}
                            <div className="space-y-1">
                              <div className="flex justify-between text-xs font-semibold text-slate-300">
                                <span>Speed & Agility</span>
                                <span className="font-mono text-blue-400">{metricSpeed}/100</span>
                              </div>
                              <input
                                type="range" min="10" max="100"
                                value={metricSpeed}
                                onChange={(e) => setMetricSpeed(parseInt(e.target.value))}
                                className="w-full h-1 bg-slate-950 rounded-lg appearance-none cursor-pointer accent-blue-500"
                              />
                            </div>

                            {/* Stamina slider */}
                            <div className="space-y-1">
                              <div className="flex justify-between text-xs font-semibold text-slate-300">
                                <span>Stamina & Cardio</span>
                                <span className="font-mono text-blue-400">{metricStamina}/100</span>
                              </div>
                              <input
                                type="range" min="10" max="100"
                                value={metricStamina}
                                onChange={(e) => setMetricStamina(parseInt(e.target.value))}
                                className="w-full h-1 bg-slate-950 rounded-lg appearance-none cursor-pointer accent-blue-500"
                              />
                            </div>

                            {/* Strength slider */}
                            <div className="space-y-1">
                              <div className="flex justify-between text-xs font-semibold text-slate-300">
                                <span>Power & Strength</span>
                                <span className="font-mono text-blue-400">{metricStrength}/100</span>
                              </div>
                              <input
                                type="range" min="10" max="100"
                                value={metricStrength}
                                onChange={(e) => setMetricStrength(parseInt(e.target.value))}
                                className="w-full h-1 bg-slate-950 rounded-lg appearance-none cursor-pointer accent-blue-500"
                              />
                            </div>

                            {/* Skill slider */}
                            <div className="space-y-1">
                              <div className="flex justify-between text-xs font-semibold text-slate-300">
                                <span>Tactical Skillset</span>
                                <span className="font-mono text-blue-400">{metricSkill}/100</span>
                              </div>
                              <input
                                type="range" min="10" max="100"
                                value={metricSkill}
                                onChange={(e) => setMetricSkill(parseInt(e.target.value))}
                                className="w-full h-1 bg-slate-950 rounded-lg appearance-none cursor-pointer accent-blue-500"
                              />
                            </div>

                            {/* Discipline slider */}
                            <div className="space-y-1">
                              <div className="flex justify-between text-xs font-semibold text-slate-300">
                                <span>Discipline & Focus</span>
                                <span className="font-mono text-blue-400">{metricDiscipline}/100</span>
                              </div>
                              <input
                                type="range" min="10" max="100"
                                value={metricDiscipline}
                                onChange={(e) => setMetricDiscipline(parseInt(e.target.value))}
                                className="w-full h-1 bg-slate-950 rounded-lg appearance-none cursor-pointer accent-blue-500"
                              />
                            </div>
                          </div>

                          <div className="space-y-4 flex flex-col justify-between">
                            <div className="space-y-3">
                              <span className="text-[10px] font-mono text-slate-500 uppercase tracking-wider block">LOG ENTRY NOTES</span>
                              
                              <textarea
                                placeholder="Log athlete feedback, training milestones, or tactical changes..."
                                value={progressNotes}
                                onChange={(e) => setProgressNotes(e.target.value)}
                                rows={3}
                                className="w-full p-2.5 rounded-lg bg-slate-950 border border-white/10 text-xs text-white placeholder-slate-600 focus:outline-none"
                              />
                            </div>

                            <button
                              type="submit"
                              disabled={loading}
                              className="w-full py-2.5 bg-blue-600 hover:bg-blue-500 text-xs font-bold text-white rounded-lg shadow-lg"
                            >
                              {loading ? 'Plotting...' : '✔ Log Performance Node'}
                            </button>
                          </div>

                        </form>

                        {/* HISTORICAL TIMELINE MAP */}
                        <div className="space-y-4">
                          <span className="text-[10px] font-mono text-slate-500 uppercase tracking-wider block">HISTORICAL PROGRESS TIMELINE</span>
                          <div className="space-y-2 max-h-[160px] overflow-y-auto">
                            {selectedAthlete.progressHistory?.map((hist, ind) => (
                              <div key={ind} className="p-3 bg-slate-950 rounded-xl border border-white/5 flex items-start gap-4 text-xs">
                                <div className="h-8 w-8 rounded-full bg-blue-600/10 text-blue-400 flex items-center justify-center font-bold text-[10px] shrink-0 font-mono">
                                  {hist.overallScore}%
                                </div>
                                <div className="flex-1 min-w-0 text-left">
                                  <div className="flex justify-between items-center text-[10px] font-mono text-slate-500">
                                    <span>Session Node</span>
                                    <span>{hist.date}</span>
                                  </div>
                                  <p className="text-slate-300 mt-1">{hist.notes}</p>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>

                      </div>
                    )}

                  </div>
                ) : (
                  <div className="py-16 text-center border border-dashed border-white/10 rounded-2xl bg-slate-900/20">
                    <p className="text-slate-400 text-sm">No student athletes added yet. Click "Add Athlete" to begin tracking progress metrics.</p>
                  </div>
                )}

              </div>
            )}

            {/* TAB 2: DIGITAL ID & QR CODES */}
            {activeTab === 'digital-id' && (
              <div className="space-y-8 text-left">
                <div>
                  <h2 className="text-xl font-extrabold text-white">Your Premium Digital Identification</h2>
                  <p className="text-xs text-slate-400">Authorized CoachVerify card designed to demonstrate credentials on demand.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center justify-items-center">
                  
                  {/* Luxury ID Badge Front-Back */}
                  <div className="relative rounded-3xl bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 border border-amber-500/40 p-6 shadow-2xl flex flex-col justify-between h-80 w-full max-w-[340px] text-left">
                    <div className="absolute inset-0 bg-radial-gradient(ellipse_at_center,transparent_30%,#020617_90%) pointer-events-none" />
                    
                    {/* Header */}
                    <div className="flex justify-between items-start z-10">
                      <div className="flex items-center gap-2">
                        <div className="h-8 w-8 bg-blue-600 rounded-lg flex items-center justify-center text-white font-black text-sm">
                          C
                        </div>
                        <div className="text-left">
                          <span className="text-[8px] font-mono text-slate-500 tracking-wider block">NATIONAL COUNCIL</span>
                          <h4 className="text-xs font-black text-white">CoachVerify.in</h4>
                        </div>
                      </div>
                      <span className="bg-emerald-500/15 text-emerald-400 font-bold text-[8px] px-2 py-0.5 rounded border border-emerald-500/20">
                        VERIFIED ✔
                      </span>
                    </div>

                    {/* Coach Body */}
                    <div className="flex gap-4 items-center z-10 my-4">
                      <div className="h-18 w-18 rounded-xl overflow-hidden border border-white/10 shrink-0">
                        <img src={coach.photo} alt={coach.fullName} className="h-full w-full object-cover" />
                      </div>
                      <div className="min-w-0">
                        <h4 className="font-display font-black text-white text-base truncate">{coach.fullName}</h4>
                        <span className="text-[10px] text-amber-400 font-mono tracking-wider font-bold block">{coach.sport} NATIONAL COACH</span>
                        <span className="text-[9px] font-mono text-slate-500 block mt-1">ID: {coach.coachId}</span>
                      </div>
                    </div>

                    {/* Bottom strip */}
                    <div className="flex justify-between items-end border-t border-white/5 pt-4 z-10">
                      <div>
                        <span className="text-[7px] text-slate-500 uppercase font-mono block">State Council Division</span>
                        <span className="text-xs font-bold text-slate-300">{coach.state}</span>
                      </div>
                      <div className="h-12 w-12 bg-white p-0.5 rounded shadow-lg">
                        <img src={coach.qrCode} alt="verification qr" className="h-full w-full" />
                      </div>
                    </div>
                  </div>

                  {/* QR Card Instructions */}
                  <div className="space-y-4">
                    <div className="p-5 bg-slate-900/60 rounded-2xl border border-white/5 text-xs space-y-2">
                      <h4 className="font-bold text-white flex items-center gap-1">★ Features & Privileges:</h4>
                      <p className="text-slate-400">Scan this code to instantly open your public portal page and verify certificates securely with parents, scouts, or school administrators.</p>
                      <p className="text-slate-400">Download the printable high-resolution certificate directly from your dashboard.</p>
                    </div>

                    <div className="flex gap-2">
                      <button 
                        onClick={() => window.print()}
                        className="flex-1 py-3 bg-blue-600 hover:bg-blue-500 text-xs font-bold text-white rounded-xl shadow-lg cursor-pointer text-center"
                      >
                        Print ID Card
                      </button>
                      <button 
                        onClick={() => {
                          navigator.clipboard.writeText(`${window.location.origin}/verify/${coach.registrationNumber}`);
                          setSuccessMsg('✔ Verification profile link copied!');
                          setTimeout(() => setSuccessMsg(''), 3000);
                        }}
                        className="flex-1 py-3 bg-slate-900 hover:bg-slate-800 text-xs font-bold text-slate-300 border border-white/10 rounded-xl"
                      >
                        Copy Share Link
                      </button>
                    </div>
                  </div>

                </div>

              </div>
            )}

            {/* TAB 3: MODIFY PROFILE DETAILS */}
            {activeTab === 'profile-edit' && (
              <form onSubmit={handleProfileSave} className="space-y-6 text-left">
                <div>
                  <h2 className="text-xl font-extrabold text-white">Modify Professional Biography</h2>
                  <p className="text-xs text-slate-400">Update your current training affiliation, contact directories, or introduction statement.</p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs text-slate-400 font-semibold">Your Full Name</label>
                    <input
                      type="text"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      className="p-3 rounded-lg bg-slate-950 border border-white/10 text-white text-sm"
                    />
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs text-slate-400 font-semibold">Your Designation</label>
                    <input
                      type="text"
                      value={designation}
                      onChange={(e) => setDesignation(e.target.value)}
                      className="p-3 rounded-lg bg-slate-950 border border-white/10 text-white text-sm"
                    />
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs text-slate-400 font-semibold">Affiliated Training School / Academy</label>
                    <input
                      type="text"
                      value={currentAcademy}
                      onChange={(e) => setCurrentAcademy(e.target.value)}
                      className="p-3 rounded-lg bg-slate-950 border border-white/10 text-white text-sm"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <div className="flex flex-col gap-1.5">
                      <label className="text-xs text-slate-400 font-semibold">Phone Number</label>
                      <input
                        type="text"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        className="p-3 rounded-lg bg-slate-950 border border-white/10 text-white text-xs font-mono"
                      />
                    </div>
                    <div className="flex flex-col gap-1.5">
                      <label className="text-xs text-slate-400 font-semibold">WhatsApp Number</label>
                      <input
                        type="text"
                        value={whatsapp}
                        onChange={(e) => setWhatsapp(e.target.value)}
                        className="p-3 rounded-lg bg-slate-950 border border-white/10 text-white text-xs font-mono"
                      />
                    </div>
                  </div>

                  <div className="sm:col-span-2 flex flex-col gap-1.5">
                    <label className="text-xs text-slate-400 font-semibold">Training Philosophy & Biography</label>
                    <textarea
                      value={biography}
                      onChange={(e) => setBiography(e.target.value)}
                      rows={5}
                      className="p-3 rounded-lg bg-slate-950 border border-white/10 text-white text-sm focus:outline-none"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="px-6 py-2.5 bg-blue-600 hover:bg-blue-500 text-xs font-bold text-white rounded-lg cursor-pointer"
                >
                  {loading ? 'Saving updates...' : 'Save Profile Changes'}
                </button>
              </form>
            )}

            {/* TAB 4: PAYMENT AUDIT HISTORY */}
            {activeTab === 'payments' && (
              <div className="space-y-6 text-left">
                <div>
                  <h2 className="text-xl font-extrabold text-white">Enrollment Payment Audit Trails</h2>
                  <p className="text-xs text-slate-400">Verifiable transaction logs generated during digital profile activation.</p>
                </div>

                <div className="bg-slate-950 rounded-xl overflow-hidden border border-white/5">
                  <div className="p-4 bg-slate-900 border-b border-white/5 grid grid-cols-4 text-xs font-bold text-slate-400">
                    <span>Transaction Type</span>
                    <span>Razorpay Reference</span>
                    <span>Date logged</span>
                    <span className="text-right">Amount</span>
                  </div>
                  
                  {/* Active list */}
                  <div className="p-4 grid grid-cols-4 text-xs items-center gap-y-4">
                    <span className="font-bold text-white">★ Platform Activation</span>
                    <span className="font-mono text-slate-400">pay_razorpay_98431</span>
                    <span className="text-slate-400">{new Date(coach.createdAt).toLocaleDateString()}</span>
                    <span className="text-right font-bold text-amber-400">₹100.00</span>
                  </div>
                </div>
              </div>
            )}

          </div>

        </div>

      </div>

      {/* ADD ATHLETE DIALOG POPUP */}
      <AnimatePresence>
        {showAddAthleteModal && (
          <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4">
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="relative w-full max-w-md bg-slate-900 border border-white/10 rounded-2xl p-6 shadow-2xl text-left space-y-4"
            >
              <div className="flex justify-between items-center">
                <h4 className="text-lg font-bold text-white">Add Athlete Profile</h4>
                <button onClick={() => setShowAddAthleteModal(false)} className="text-slate-400 hover:text-white">✕</button>
              </div>

              <form onSubmit={handleAddAthleteSubmit} className="space-y-4">
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs text-slate-400">Athlete Full Name *</label>
                  <input
                    type="text"
                    value={newAthleteName}
                    onChange={(e) => setNewAthleteName(e.target.value)}
                    placeholder="Enter athlete name"
                    className="p-2.5 rounded-lg bg-slate-950 border border-white/10 text-white text-xs"
                    required
                  />
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-xs text-slate-400">Initial Training Notes / Goals</label>
                  <textarea
                    value={newAthleteNotes}
                    onChange={(e) => setNewAthleteNotes(e.target.value)}
                    placeholder="e.g. Preparing for CBSE state hurdles tournament"
                    className="p-2.5 rounded-lg bg-slate-950 border border-white/10 text-white text-xs"
                    rows={2}
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-2.5 bg-blue-600 hover:bg-blue-500 text-xs font-bold text-white rounded-lg shadow cursor-pointer"
                >
                  Register Student Profile
                </button>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}
