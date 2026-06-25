/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ShieldCheck, Trophy, Sparkles, Search, MapPin, 
  UserCheck, Award, MessageSquare, Plus, KeyRound, 
  User, CheckCircle2, SlidersHorizontal, ArrowRight, Loader2, BookOpen
} from 'lucide-react';

// Core Subcomponents
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import CoachProfile from './components/CoachProfileModal';
import CoachRegistrationForm from './components/CoachRegistrationForm';
import CoachDashboard from './components/CoachDashboard';
import AdminPanel from './components/AdminPanel';
import AcademyDirectory from './components/AcademyDirectory';
import TournamentDirectory from './components/TournamentDirectory';
import SportsJobsPortal from './components/SportsJobsPortal';
import BlogSection from './components/BlogSection';
import LegalPages from './components/LegalPages';
import Footer from './components/Footer';

// Seed & API Fallbacks
import { 
  fetchCoaches, fetchAcademies, fetchTournaments, 
  fetchJobs, fetchBlogs, fetchTestimonials
} from './lib/api';
import { Coach, Academy, Tournament, JobVacancy, BlogPost, Testimonial, SystemStats } from './types';
import { SPORTS_LIST, STATES_DISTRICTS } from '../server_seed';

export default function App() {
  // Navigation Router state
  const [currentView, setCurrentView] = useState<'home' | 'coaches' | 'academies' | 'tournaments' | 'jobs' | 'blogs' | 'legal' | 'register' | 'dashboard' | 'admin'>('home');

  // Core Database Collections State
  const [coaches, setCoaches] = useState<Coach[]>([]);
  const [academies, setAcademies] = useState<Academy[]>([]);
  const [tournaments, setTournaments] = useState<Tournament[]>([]);
  const [jobs, setJobs] = useState<JobVacancy[]>([]);
  const [blogs, setBlogs] = useState<BlogPost[]>([]);
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [stats, setStats] = useState<SystemStats>({
    coachesRegistered: 1250,
    coachesVerified: 840,
    academiesRegistered: 25,
    statesCovered: 28,
    activeAthletesLogged: 4500
  });

  // State Loader
  const [loading, setLoading] = useState(true);

  // Focus Profiles modals
  const [selectedCoach, setSelectedCoach] = useState<Coach | null>(null);

  // Logged-in Session State
  const [loggedInCoach, setLoggedInCoach] = useState<Coach | null>(null);
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(false);

  // Authentication Popup Overlay State
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [authMode, setAuthMode] = useState<'coach' | 'admin'>('coach');
  const [coachSearchId, setCoachSearchId] = useState('');
  const [adminPassword, setAdminPassword] = useState('');
  const [authError, setAuthError] = useState('');

  // Search & Filtering for Coaches Directory view
  const [coachSearchName, setCoachSearchName] = useState('');
  const [coachFilterSport, setCoachFilterSport] = useState('');
  const [coachFilterState, setCoachFilterState] = useState('');
  const [coachFilterDistrict, setCoachFilterDistrict] = useState('');
  const [coachFilterGender, setCoachFilterGender] = useState('All');

  useEffect(() => {
    loadDatabase();
  }, []);

  const loadDatabase = async () => {
    setLoading(true);
    try {
      const c = await fetchCoaches();
      const a = await fetchAcademies();
      const t = await fetchTournaments();
      const j = await fetchJobs();
      const b = await fetchBlogs();
      const test = await fetchTestimonials();

      setCoaches(c);
      setAcademies(a);
      setTournaments(t);
      setJobs(j);
      setBlogs(b);
      setTestimonials(test);
      
      // Calculate system stats dynamically from active list
      setStats({
        coachesRegistered: c.length * 3 + 120,
        coachesVerified: c.filter(item => item.status === 'approved').length,
        academiesRegistered: a.length,
        statesCovered: 28,
        activeAthletesLogged: 4500 + c.reduce((acc, curr) => acc + (curr.athleteMetrics?.length || 0), 0)
      });
    } catch (err) {
      console.error("Database fetch warning:", err);
    } finally {
      setLoading(false);
    }
  };

  // Auth Handler
  const handleCoachLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError('');
    if (!coachSearchId) return;

    // Search by coachId, registrationNumber or phone/whatsapp
    const found = coaches.find(
      c => c.coachId === coachSearchId || 
           c.registrationNumber === coachSearchId || 
           c.phone.includes(coachSearchId) || 
           c.whatsapp.includes(coachSearchId)
    );

    if (found) {
      setLoggedInCoach(found);
      setShowAuthModal(false);
      setCoachSearchId('');
      setCurrentView('dashboard');
    } else {
      setAuthError('No active profile matches this ID. Ensure payment is complete.');
    }
  };

  const handleAdminLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError('');
    if (adminPassword === 'admin' || adminPassword === 'verify') {
      setIsAdminLoggedIn(true);
      setShowAuthModal(false);
      setAdminPassword('');
      setCurrentView('admin');
    } else {
      setAuthError('Incorrect administrative security credential.');
    }
  };

  const handleLogOut = () => {
    setLoggedInCoach(null);
    setIsAdminLoggedIn(false);
    setCurrentView('home');
  };

  // Handle successful registration Step 7 callback
  const handleRegistrationSuccess = (newCoach: Coach) => {
    setCoaches(prev => [newCoach, ...prev]);
    setLoggedInCoach(newCoach);
    setCurrentView('dashboard');
  };

  // Active district options
  const districtOptions = coachFilterState ? STATES_DISTRICTS[coachFilterState] : [];

  // Filter coaches list
  const filteredCoaches = coaches.filter(c => {
    const matchesName = coachSearchName === '' || c.fullName.toLowerCase().includes(coachSearchName.toLowerCase());
    const matchesSport = coachFilterSport === '' || c.sport === coachFilterSport;
    const matchesState = coachFilterState === '' || c.state === coachFilterState;
    const matchesDistrict = coachFilterDistrict === '' || c.district === coachFilterDistrict;
    const matchesGender = coachFilterGender === 'All' || c.gender === coachFilterGender;
    // Only verified coaches should be visible to public search
    const matchesVerification = c.status === 'approved';

    return matchesName && matchesSport && matchesState && matchesDistrict && matchesGender && matchesVerification;
  });

  return (
    <div className="bg-transparent min-h-screen text-slate-100 flex flex-col font-sans select-none selection:bg-blue-600 selection:text-white">
      
      {/* Top Header Glass Banner */}
      <Navbar 
        currentView={currentView}
        onNavigate={(view) => {
          if (view === 'dashboard' && !loggedInCoach) {
            setAuthMode('coach');
            setShowAuthModal(true);
          } else if (view === 'admin' && !isAdminLoggedIn) {
            setAuthMode('admin');
            setShowAuthModal(true);
          } else {
            setCurrentView(view);
          }
        }}
        onOpenAuth={() => {
          setAuthMode('coach');
          setShowAuthModal(true);
        }}
        isCoachLoggedIn={!!loggedInCoach}
        isAdminLoggedIn={isAdminLoggedIn}
        onLogout={handleLogOut}
        bookmarksCount={0}
      />

      {/* Main Container Workspace */}
      <main className="flex-1">
        {loading ? (
          <div className="flex flex-col items-center justify-center py-40 gap-4">
            <Loader2 className="h-10 w-10 text-amber-400 animate-spin" />
            <p className="text-xs text-slate-500 font-mono">LOADING NATIONAL CERTIFICATE RECORDS DATABASE...</p>
          </div>
        ) : (
          <AnimatePresence mode="wait">
            <motion.div
              key={currentView}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
            >
              
              {/* VIEW: HOME VIEW */}
              {currentView === 'home' && (
                <div className="space-y-16">
                  
                  {/* Hero Board */}
                  <Hero 
                    stats={stats} 
                    onNavigate={(view) => {
                      if (view === 'register') {
                        setCurrentView('register');
                      } else {
                        setCurrentView('coaches');
                      }
                    }}
                    onScrollToSearch={() => setCurrentView('coaches')}
                    onOpenVerifyStatus={() => {
                      setAuthMode('coach');
                      setShowAuthModal(true);
                    }}
                  />

                  {/* Certified Badges Row */}
                  <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="p-8 rounded-3xl border border-white/5 bg-slate-900/30 text-center space-y-6">
                      <span className="text-[10px] font-mono tracking-widest text-slate-500 uppercase">NATIONAL REGULATORY COMPLIANCE</span>
                      <h3 className="text-sm font-display font-bold text-slate-300">Coaches Registered are Vetted in Alignment with Multi-federation Standards</h3>
                      
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 items-center justify-items-center opacity-60">
                        <div className="text-slate-400 font-mono font-extrabold text-xs">SAI COOPERATION</div>
                        <div className="text-slate-400 font-mono font-extrabold text-xs">NIS DIPLOMA COMPLIANT</div>
                        <div className="text-slate-400 font-mono font-extrabold text-xs">Aadhaar BIOMETRIC CHECK</div>
                        <div className="text-slate-400 font-mono font-extrabold text-xs">RAZORPAY SECURE ESCROW</div>
                      </div>
                    </div>
                  </div>

                  {/* How it Works Step Sections */}
                  <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-10">
                    <div className="text-left space-y-1.5">
                      <span className="text-[10px] font-mono tracking-widest text-amber-400 uppercase">VERIFICATION WORKFLOW</span>
                      <h2 className="text-2xl font-display font-black text-white">How CoachVerify.in Vets Credentials</h2>
                      <p className="text-xs text-slate-400">Strict procedural auditing that builds 100% confidence for schools and parents.</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-4 gap-6 text-left">
                      <div className="p-5 rounded-2xl bg-slate-900/40 border border-white/5 space-y-3">
                        <div className="h-10 w-10 bg-blue-600/10 text-blue-400 flex items-center justify-center font-bold font-mono text-xs rounded-lg">01</div>
                        <h4 className="font-bold text-white text-sm">Step 1: Enrollment</h4>
                        <p className="text-xs text-slate-400 font-light">Coach registers certificates, Aadhaar data, and tactical experiences across our 7-step panel.</p>
                      </div>
                      <div className="p-5 rounded-2xl bg-slate-900/40 border border-white/5 space-y-3">
                        <div className="h-10 w-10 bg-blue-600/10 text-blue-400 flex items-center justify-center font-bold font-mono text-xs rounded-lg">02</div>
                        <h4 className="font-bold text-white text-sm">Step 2: Security Fee</h4>
                        <p className="text-xs text-slate-400 font-light">Nominating platform registration audits backed by securely routed Razorpay checks.</p>
                      </div>
                      <div className="p-5 rounded-2xl bg-slate-900/40 border border-white/5 space-y-3">
                        <div className="h-10 w-10 bg-blue-600/10 text-blue-400 flex items-center justify-center font-bold font-mono text-xs rounded-lg">03</div>
                        <h4 className="font-bold text-white text-sm">Step 3: Document Vetting</h4>
                        <p className="text-xs text-slate-400 font-light">Manual validation of NIS, B.P.Ed, or National federation licenses by our administrative directors.</p>
                      </div>
                      <div className="p-5 rounded-2xl bg-slate-900/40 border border-white/5 space-y-3">
                        <div className="h-10 w-10 bg-blue-600/10 text-blue-400 flex items-center justify-center font-bold font-mono text-xs rounded-lg">04</div>
                        <h4 className="font-bold text-white text-sm">Step 4: Active Digital ID</h4>
                        <p className="text-xs text-slate-400 font-light">Approved profiles are indexed in the national database with unique QR verification tags.</p>
                      </div>
                    </div>
                  </div>

                  {/* Featured Coaches slider (Seeded Coaches) */}
                  <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-8">
                    <div className="flex justify-between items-end">
                      <div className="text-left space-y-1.5">
                        <span className="text-[10px] font-mono tracking-widest text-amber-400 uppercase">NATIONAL SHOWCASE</span>
                        <h2 className="text-2xl font-display font-black text-white">Recently Vetted Professionals</h2>
                        <p className="text-xs text-slate-400">Verified athletic talent newly registered to the National Registry.</p>
                      </div>
                      <button 
                        onClick={() => setCurrentView('coaches')}
                        className="text-xs text-blue-400 font-bold hover:text-blue-300 flex items-center gap-1 cursor-pointer"
                      >
                        Browse Directory <ArrowRight className="h-3.5 w-3.5" />
                      </button>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 text-left">
                      {coaches.filter(c => c.status === 'approved').slice(0, 4).map((coach) => (
                        <div 
                          key={coach.id}
                          className="group p-5 bg-slate-900/40 hover:bg-slate-900/80 border border-white/5 hover:border-amber-500/20 rounded-2xl transition-all shadow-lg cursor-pointer"
                          onClick={() => setSelectedCoach(coach)}
                        >
                          <div className="h-44 w-full rounded-xl overflow-hidden bg-slate-950 border border-white/10 mb-4">
                            <img src={coach.photo} alt={coach.fullName} className="h-full w-full object-cover group-hover:scale-103 transition-transform" />
                          </div>
                          
                          <div className="space-y-1">
                            <span className="bg-emerald-500/10 text-emerald-400 text-[8px] font-bold px-2 py-0.5 rounded inline-block border border-emerald-500/10 mb-1">
                              VERIFIED ✔
                            </span>
                            <h4 className="font-bold text-white text-sm group-hover:text-blue-400 transition-colors truncate">{coach.fullName}</h4>
                            <p className="text-xs text-amber-400 font-medium font-mono">{coach.sport} Coach</p>
                            <p className="text-[10px] text-slate-500 font-mono truncate">{coach.city}, {coach.state}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Trust Testimonials Grid */}
                  <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-8 py-8">
                    <div className="text-left space-y-1.5">
                      <span className="text-[10px] font-mono tracking-widest text-amber-400 uppercase">RECRUITERS & PARENTS RESPONSES</span>
                      <h2 className="text-2xl font-display font-black text-white">Trust Testimonials</h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
                      {testimonials.map((t) => (
                        <div key={t.id} className="p-6 bg-slate-900/40 border border-white/5 rounded-2xl flex flex-col justify-between space-y-4">
                          <p className="text-xs text-slate-300 leading-relaxed italic font-light">
                            "{t.comment}"
                          </p>
                          <div className="flex justify-between items-center border-t border-white/5 pt-3 text-xs text-slate-400">
                            <div>
                              <span className="font-bold text-white block">{t.name}</span>
                              <span className="text-[9px] font-mono uppercase">{t.role}</span>
                            </div>
                            <span className="text-amber-400 font-bold font-mono">★ {t.rating}.0</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                </div>
              )}

              {/* VIEW: COACHES SEARCH DIRECTORY */}
              {currentView === 'coaches' && (
                <div className="py-16 bg-slate-950 min-h-[calc(100vh-5rem)]">
                  <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-10">
                    
                    {/* Header */}
                    <div className="text-left space-y-2">
                      <span className="text-[10px] font-mono tracking-widest text-blue-400 uppercase">INDIA SPORTS COUNCIL</span>
                      <h1 className="text-3xl font-display font-black text-white">Verified Sports Coaches Registry</h1>
                      <p className="text-sm text-slate-400">Find and inspect verified physical trainers, sports academy coaches, and technical instructors across India.</p>
                    </div>

                    {/* Integrated Search & Filters Box */}
                    <div className="rounded-3xl border border-white/10 glass-premium p-6 space-y-4">
                      
                      {/* Search & Sport selectors */}
                      <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
                        <div className="md:col-span-6 relative">
                          <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4.5 w-4.5 text-slate-400" />
                          <input
                            type="text"
                            placeholder="Search coach by name, specialized training, or district..."
                            value={coachSearchName}
                            onChange={(e) => setCoachSearchName(e.target.value)}
                            className="w-full pl-11 pr-4 py-3.5 rounded-xl bg-slate-950 border border-white/15 text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 text-xs"
                          />
                        </div>

                        <div className="md:col-span-3">
                          <select
                            value={coachFilterSport}
                            onChange={(e) => setCoachFilterSport(e.target.value)}
                            className="w-full p-3.5 rounded-xl bg-slate-950 border border-white/15 text-slate-300 text-xs focus:outline-none focus:border-blue-500"
                          >
                            <option value="">All Sports</option>
                            {SPORTS_LIST.map(s => <option key={s} value={s}>{s}</option>)}
                          </select>
                        </div>

                        <div className="md:col-span-3">
                          <select
                            value={coachFilterGender}
                            onChange={(e) => setCoachFilterGender(e.target.value)}
                            className="w-full p-3.5 rounded-xl bg-slate-950 border border-white/15 text-slate-300 text-xs focus:outline-none focus:border-blue-500"
                          >
                            <option value="All">All Genders</option>
                            <option value="Male">Male Only</option>
                            <option value="Female">Female Only</option>
                          </select>
                        </div>
                      </div>

                      {/* State & district filters */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                        <div className="flex flex-col gap-1 text-left">
                          <label className="text-[10px] text-slate-500 uppercase font-mono tracking-wider">Filter State</label>
                          <select
                            value={coachFilterState}
                            onChange={(e) => {
                              setCoachFilterState(e.target.value);
                              setCoachFilterDistrict(''); // Clear district
                            }}
                            className="w-full p-3 rounded-xl bg-slate-950 border border-white/10 text-slate-200 text-xs focus:outline-none"
                          >
                            <option value="">Select State</option>
                            {Object.keys(STATES_DISTRICTS).map(st => <option key={st} value={st}>{st}</option>)}
                          </select>
                        </div>

                        <div className="flex flex-col gap-1 text-left">
                          <label className="text-[10px] text-slate-500 uppercase font-mono tracking-wider">Filter District</label>
                          <select
                            value={coachFilterDistrict}
                            onChange={(e) => setCoachFilterDistrict(e.target.value)}
                            disabled={!coachFilterState}
                            className="w-full p-3 rounded-xl bg-slate-950 border border-white/10 text-slate-200 text-xs focus:outline-none disabled:opacity-55"
                          >
                            <option value="">Select District</option>
                            {districtOptions.map(ds => <option key={ds} value={ds}>{ds}</option>)}
                          </select>
                        </div>
                      </div>

                    </div>

                    {/* Coaches list grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                      {filteredCoaches.length > 0 ? (
                        filteredCoaches.map((coach) => (
                          <div
                            key={coach.id}
                            className="group p-5 bg-slate-900/40 hover:bg-slate-900/80 border border-white/8 hover:border-amber-500/20 rounded-2xl flex flex-col justify-between text-left shadow-lg transition-all duration-300 cursor-pointer"
                            onClick={() => setSelectedCoach(coach)}
                          >
                            <div>
                              {/* Avatar wrapper */}
                              <div className="h-48 w-full rounded-xl overflow-hidden bg-slate-950 border border-white/10 mb-4 relative">
                                <img src={coach.photo} alt={coach.fullName} className="h-full w-full object-cover group-hover:scale-103 transition-transform duration-300" />
                                <div className="absolute top-3 left-3 bg-emerald-500 text-slate-950 font-bold text-[8px] px-2 py-0.5 rounded">
                                  VERIFIED ✔
                                </div>
                              </div>

                              <div className="space-y-2">
                                <div className="space-y-0.5">
                                  <h4 className="font-display font-black text-white text-base group-hover:text-blue-400 transition-colors truncate">
                                    {coach.fullName}
                                  </h4>
                                  <span className="text-xs text-amber-400 font-mono font-bold uppercase tracking-wide block">
                                    {coach.sport} Specialization
                                  </span>
                                </div>

                                <p className="text-xs text-slate-400 font-light line-clamp-3 leading-relaxed">
                                  {coach.biography}
                                </p>
                              </div>
                            </div>

                            {/* bottom metadata */}
                            <div className="border-t border-white/5 pt-4 mt-5 space-y-2">
                              <div className="flex items-center gap-1.5 text-[10px] text-slate-400 font-mono">
                                <MapPin className="h-3.5 w-3.5 text-slate-500 shrink-0" />
                                <span className="truncate">{coach.district}, {coach.state}</span>
                              </div>
                              
                              {/* Experience & qualification row */}
                              <div className="flex justify-between items-center text-[9px] font-mono text-slate-500 uppercase tracking-wide">
                                <span>Exp: {coach.coachingExperience} Years</span>
                                <span className="truncate max-w-[120px] text-slate-400">{coach.coachingQualification.split(' ')[0]}</span>
                              </div>
                            </div>

                          </div>
                        ))
                      ) : (
                        <div className="col-span-full py-20 text-center border border-dashed border-white/10 rounded-2xl bg-slate-900/20">
                          <p className="text-slate-400 text-sm">No certified coaches matching selected parameters were found.</p>
                        </div>
                      )}
                    </div>

                  </div>
                </div>
              )}

              {/* VIEW: ACADEMY DIRECTORY */}
              {currentView === 'academies' && (
                <AcademyDirectory 
                  academies={academies} 
                  sports={SPORTS_LIST} 
                  statesDistricts={STATES_DISTRICTS} 
                />
              )}

              {/* VIEW: TOURNAMENTS */}
              {currentView === 'tournaments' && (
                <TournamentDirectory 
                  tournaments={tournaments} 
                  sports={SPORTS_LIST} 
                />
              )}

              {/* VIEW: JOBS PORTAL */}
              {currentView === 'jobs' && (
                <SportsJobsPortal 
                  jobs={jobs} 
                  sports={SPORTS_LIST} 
                  isCoachLoggedIn={!!loggedInCoach} 
                  onOpenAuth={() => {
                    setAuthMode('coach');
                    setShowAuthModal(true);
                  }}
                />
              )}

              {/* VIEW: ADVICE BLOG */}
              {currentView === 'blogs' && (
                <BlogSection blogs={blogs} />
              )}

              {/* VIEW: LEGAL COMPLIANCE PAGES */}
              {currentView === 'legal' && (
                <LegalPages />
              )}

              {/* VIEW: REGISTER MULTI-STEP */}
              {currentView === 'register' && (
                <CoachRegistrationForm
                  sports={SPORTS_LIST}
                  statesDistricts={STATES_DISTRICTS}
                  registrationFee={100}
                  onSuccess={handleRegistrationSuccess}
                />
              )}

              {/* VIEW: COACH DASHBOARD */}
              {currentView === 'dashboard' && loggedInCoach && (
                <CoachDashboard 
                  coach={loggedInCoach} 
                  onUpdateCoach={(updated) => {
                    setLoggedInCoach(updated);
                    // Update main collection cache
                    setCoaches(prev => prev.map(c => c.id === updated.id ? updated : c));
                  }}
                />
              )}

              {/* VIEW: ADMIN COMMAND CENTER */}
              {currentView === 'admin' && isAdminLoggedIn && (
                <AdminPanel 
                  initialCoaches={coaches} 
                  onCoachesUpdated={loadDatabase} 
                />
              )}

            </motion.div>
          </AnimatePresence>
        )}
      </main>

      {/* FOOTER */}
      <Footer onNavigate={(view) => setCurrentView(view)} />

      {/* COACH VIEW DETAIL MODAL */}
      <AnimatePresence>
        {selectedCoach && (
          <CoachProfile 
            coach={selectedCoach} 
            onClose={() => setSelectedCoach(null)} 
            onReviewsUpdated={loadDatabase}
          />
        )}
      </AnimatePresence>

      {/* AUTHENTICATION / LOGIN POPUP MODAL */}
      <AnimatePresence>
        {showAuthModal && (
          <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4">
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="relative w-full max-w-sm bg-slate-900 border border-white/10 rounded-2xl p-6 shadow-2xl space-y-4 text-left"
            >
              <div className="flex justify-between items-center">
                <h4 className="text-base font-bold text-white uppercase tracking-wider font-mono">
                  {authMode === 'coach' ? 'Coach Portal Login' : 'Admin Area Login'}
                </h4>
                <button 
                  onClick={() => {
                    setShowAuthModal(false);
                    setAuthError('');
                  }} 
                  className="text-slate-400 hover:text-white"
                >
                  ✕
                </button>
              </div>

              {authError && (
                <p className="text-xs text-red-400 font-semibold bg-red-500/10 p-2.5 rounded">
                  ⚠️ {authError}
                </p>
              )}

              {authMode === 'coach' ? (
                <form onSubmit={handleCoachLogin} className="space-y-4">
                  <div className="flex flex-col gap-1">
                    <label className="text-xs text-slate-400">Coach Registration ID or Phone Number</label>
                    <input
                      type="text"
                      placeholder="e.g. CV_AATH_001 or +919876543210"
                      value={coachSearchId}
                      onChange={(e) => setCoachSearchId(e.target.value)}
                      className="p-3 rounded bg-slate-950 border border-white/10 text-white font-mono text-xs focus:outline-none"
                      required
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full py-2.5 bg-blue-600 hover:bg-blue-500 text-xs font-bold text-white rounded-lg transition-all cursor-pointer"
                  >
                    Load Personal Dashboard
                  </button>

                  <p className="text-[10px] text-slate-500 text-center leading-relaxed">
                    Don't have a National profile? <button type="button" onClick={() => { setShowAuthModal(false); setCurrentView('register'); }} className="text-blue-400 font-bold hover:underline">Register Now</button>
                  </p>
                </form>
              ) : (
                <form onSubmit={handleAdminLogin} className="space-y-4">
                  <div className="flex flex-col gap-1">
                    <label className="text-xs text-slate-400">Administrative Key Secret</label>
                    <input
                      type="password"
                      placeholder="Enter admin password"
                      value={adminPassword}
                      onChange={(e) => setAdminPassword(e.target.value)}
                      className="p-3 rounded bg-slate-950 border border-white/10 text-white font-mono text-xs focus:outline-none"
                      required
                    />
                  </div>
                  <div className="flex gap-2">
                    <button
                      type="button"
                      onClick={() => {
                        setAdminPassword('admin');
                        setIsAdminLoggedIn(true);
                        setShowAuthModal(false);
                        setCurrentView('admin');
                      }}
                      className="flex-1 py-2.5 bg-slate-950 hover:bg-slate-900 border border-white/5 text-slate-400 hover:text-white text-[10px] font-mono font-bold rounded"
                    >
                      Bypass Quick
                    </button>
                    <button
                      type="submit"
                      className="flex-1 py-2.5 bg-blue-600 hover:bg-blue-500 text-xs font-bold text-white rounded transition-all"
                    >
                      Access Center
                    </button>
                  </div>
                </form>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}
