/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Search, MapPin, Trophy, Award, Calendar, Check, SlidersHorizontal, ArrowRight, ShieldCheck, Star } from 'lucide-react';
import { Coach } from '../types';

interface SearchSectionProps {
  coaches: Coach[];
  sports: string[];
  statesDistricts: { [key: string]: string[] };
  onSelectCoach: (coach: Coach) => void;
  onBookmarkCoach: (coach: Coach) => void;
  bookmarkedIds: string[];
  initialSearchQuery?: string;
  initialStateFilter?: string;
}

export default function SearchSection({
  coaches,
  sports,
  statesDistricts,
  onSelectCoach,
  onBookmarkCoach,
  bookmarkedIds,
  initialSearchQuery = '',
  initialStateFilter = ''
}: SearchSectionProps) {
  // Filters State
  const [searchTerm, setSearchTerm] = useState(initialSearchQuery);
  const [selectedState, setSelectedState] = useState(initialStateFilter);
  const [selectedDistrict, setSelectedDistrict] = useState('');
  const [selectedSport, setSelectedSport] = useState('');
  const [selectedQual, setSelectedQual] = useState('');
  const [selectedExp, setSelectedExp] = useState('');
  const [verifiedOnly, setVerifiedOnly] = useState(true);
  const [activeTab, setActiveTab] = useState<'all' | 'featured' | 'top-rated'>('all');

  // Interactive Map State
  const [activeMapState, setActiveMapState] = useState<string>('Rajasthan');

  useEffect(() => {
    if (initialSearchQuery) setSearchTerm(initialSearchQuery);
  }, [initialSearchQuery]);

  useEffect(() => {
    if (initialStateFilter) setSelectedState(initialStateFilter);
  }, [initialStateFilter]);

  const states = Object.keys(statesDistricts);
  const districts = selectedState ? statesDistricts[selectedState] : [];

  // Filter Logic
  const filteredCoaches = coaches.filter(coach => {
    // 1. Search term (Name, Academy, Specialization, etc.)
    const matchesSearch = searchTerm === '' || 
      coach.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      coach.currentAcademy.toLowerCase().includes(searchTerm.toLowerCase()) ||
      coach.sport.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (coach.specialization && coach.specialization.toLowerCase().includes(searchTerm.toLowerCase()));

    // 2. State Filter
    const matchesState = selectedState === '' || coach.state === selectedState;

    // 3. District Filter
    const matchesDistrict = selectedDistrict === '' || coach.district === selectedDistrict;

    // 4. Sport Filter
    const matchesSport = selectedSport === '' || coach.sport === selectedSport;

    // 5. Qualification
    const matchesQual = selectedQual === '' || 
      coach.coachingQualification.toLowerCase().includes(selectedQual.toLowerCase()) ||
      coach.highestQualification.toLowerCase().includes(selectedQual.toLowerCase()) ||
      coach.sportsQualification.toLowerCase().includes(selectedQual.toLowerCase());

    // 6. Experience
    const matchesExp = selectedExp === '' || 
      (selectedExp === '3' && coach.coachingExperience >= 3) ||
      (selectedExp === '5' && coach.coachingExperience >= 5) ||
      (selectedExp === '10' && coach.coachingExperience >= 10);

    // 7. Verified Only
    const matchesVerified = !verifiedOnly || coach.status === 'approved';

    // 8. Tab logic
    const matchesTab = 
      activeTab === 'all' || 
      (activeTab === 'featured' && coach.featured) || 
      (activeTab === 'top-rated' && coach.averageRating >= 4.8);

    return matchesSearch && matchesState && matchesDistrict && matchesSport && matchesQual && matchesExp && matchesVerified && matchesTab;
  });

  const handleStateClick = (stateName: string) => {
    setActiveMapState(stateName);
    setSelectedState(stateName);
    setSelectedDistrict(''); // Reset district
  };

  const clearFilters = () => {
    setSearchTerm('');
    setSelectedState('');
    setSelectedDistrict('');
    setSelectedSport('');
    setSelectedQual('');
    setSelectedExp('');
    setVerifiedOnly(false);
  };

  // Indian Regions for Stylized Interactive Map
  const regions = [
    { name: "North", states: ["Punjab", "Haryana", "Himachal Pradesh", "Jammu & Kashmir", "Delhi", "Uttarakhand", "Chandigarh"] },
    { name: "West", states: ["Rajasthan", "Gujarat", "Maharashtra", "Goa"] },
    { name: "South", states: ["Karnataka", "Kerala", "Tamil Nadu", "Andhra Pradesh", "Telangana", "Puducherry"] },
    { name: "East", states: ["West Bengal", "Bihar", "Jharkhand", "Odisha"] },
    { name: "Central & NE", states: ["Madhya Pradesh", "Uttar Pradesh", "Chhattisgarh", "Assam", "Manipur", "Meghalaya"] }
  ];

  return (
    <div id="search-section" className="relative py-20 bg-transparent overflow-hidden">
      
      {/* Background radial lines */}
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-blue-500/20 to-transparent" />
      <div className="absolute bottom-0 w-full h-80 bg-gradient-to-t from-slate-900/40 to-transparent pointer-events-none" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">

        {/* TRUSTED BY BANNER (TRUST SECTION) */}
        <div className="mb-20 text-center">
          <span className="text-[10px] font-mono tracking-[0.25em] uppercase text-amber-400">OFFICIALLY TRUSTED ECOSYSTEM</span>
          <div className="mt-4 flex flex-wrap justify-center items-center gap-x-12 gap-y-6 opacity-60">
            <div className="flex items-center gap-2 text-sm font-semibold tracking-wide text-slate-300">
              <ShieldCheck className="h-5 w-5 text-blue-500" />
              <span>Sports Authority of India Standards</span>
            </div>
            <div className="flex items-center gap-2 text-sm font-semibold tracking-wide text-slate-300">
              <Award className="h-5 w-5 text-amber-500" />
              <span>NIS Accredited Coaches</span>
            </div>
            <div className="flex items-center gap-2 text-sm font-semibold tracking-wide text-slate-300">
              <Trophy className="h-5 w-5 text-emerald-500" />
              <span>CBSE & SGFI Schools</span>
            </div>
            <div className="flex items-center gap-2 text-sm font-semibold tracking-wide text-slate-300">
              <MapPin className="h-5 w-5 text-purple-500" />
              <span>Private Sports Academies</span>
            </div>
            <div className="flex items-center gap-2 text-sm font-semibold tracking-wide text-slate-300">
              <Star className="h-5 w-5 text-pink-500" />
              <span>All India Inter-Universities</span>
            </div>
          </div>
        </div>

        {/* SEARCH BOX AND TITLE */}
        <div className="mb-12 text-center">
          <h2 className="text-3xl sm:text-4xl font-display font-extrabold text-white">
            Search National <span className="bg-gradient-to-r from-blue-400 to-amber-400 bg-clip-text text-transparent">Coach Directories</span>
          </h2>
          <p className="mt-2 text-sm text-slate-400 max-w-xl mx-auto">
            Use micro-filters to search certified training professionals across multiple sporting disciplines.
          </p>
        </div>

        {/* LUXURY FLOATING SEARCH BOX */}
        <div className="relative rounded-3xl border border-white/10 glass-premium p-6 sm:p-8 shadow-2xl mb-16 max-w-5xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
            
            {/* Direct Input */}
            <div className="md:col-span-8 relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
              <input
                type="text"
                placeholder="Search Coach, Academy, Sport, State or District..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-4 rounded-xl bg-white/5 border border-white/15 text-white placeholder-slate-400 focus:outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-400 transition-all font-sans text-sm"
              />
            </div>

            {/* Verified toggle and Clear */}
            <div className="md:col-span-4 flex items-center justify-between gap-3">
              <label className="flex items-center gap-2.5 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={verifiedOnly}
                  onChange={(e) => setVerifiedOnly(e.target.checked)}
                  className="rounded border-white/10 text-blue-600 focus:ring-blue-500 h-4.5 w-4.5 bg-slate-900"
                />
                <span className="text-xs font-semibold text-slate-300">Verified Only ✔</span>
              </label>

              <button
                onClick={clearFilters}
                className="px-4 py-2.5 rounded-xl border border-white/5 hover:border-red-500/30 hover:bg-red-500/5 text-xs font-semibold text-slate-400 hover:text-red-400 transition-all cursor-pointer"
              >
                Clear Filters
              </button>
            </div>

          </div>

          {/* ADVANCED FILTER SHELF */}
          <div className="mt-6 pt-6 border-t border-white/8 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3.5 text-left">
            
            {/* State Select */}
            <div className="flex flex-col gap-1.5">
              <label className="text-[10px] font-mono tracking-wider uppercase text-slate-400">State</label>
              <select
                value={selectedState}
                onChange={(e) => {
                  setSelectedState(e.target.value);
                  setSelectedDistrict('');
                }}
                className="w-full p-2.5 rounded-lg bg-white/5 border border-white/15 text-slate-200 text-xs focus:outline-none focus:border-amber-400"
              >
                <option value="">All States</option>
                {states.map(s => <option key={s} value={s}>{s}</option>)}
              </select>
            </div>

            {/* District Select */}
            <div className="flex flex-col gap-1.5">
              <label className="text-[10px] font-mono tracking-wider uppercase text-slate-400">District</label>
              <select
                value={selectedDistrict}
                onChange={(e) => setSelectedDistrict(e.target.value)}
                disabled={!selectedState}
                className="w-full p-2.5 rounded-lg bg-white/5 border border-white/15 text-slate-200 text-xs focus:outline-none focus:border-amber-400 disabled:opacity-55"
              >
                <option value="">All Districts</option>
                {districts.map(d => <option key={d} value={d}>{d}</option>)}
              </select>
            </div>

            {/* Sport Select */}
            <div className="flex flex-col gap-1.5">
              <label className="text-[10px] font-mono tracking-wider uppercase text-slate-400">Sport</label>
              <select
                value={selectedSport}
                onChange={(e) => setSelectedSport(e.target.value)}
                className="w-full p-2.5 rounded-lg bg-white/5 border border-white/15 text-slate-200 text-xs focus:outline-none focus:border-amber-400"
              >
                <option value="">All Sports</option>
                {sports.map(sp => <option key={sp} value={sp}>{sp}</option>)}
              </select>
            </div>

            {/* Qualification Select */}
            <div className="flex flex-col gap-1.5">
              <label className="text-[10px] font-mono tracking-wider uppercase text-slate-400">Credential</label>
              <select
                value={selectedQual}
                onChange={(e) => setSelectedQual(e.target.value)}
                className="w-full p-2.5 rounded-lg bg-white/5 border border-white/15 text-slate-200 text-xs focus:outline-none focus:border-amber-400"
              >
                <option value="">All Credentials</option>
                <option value="NIS">NIS Certified</option>
                <option value="SAI">SAI Certified</option>
                <option value="M.P.Ed">M.P.Ed degree</option>
                <option value="B.P.Ed">B.P.Ed degree</option>
              </select>
            </div>

            {/* Experience Select */}
            <div className="flex flex-col gap-1.5">
              <label className="text-[10px] font-mono tracking-wider uppercase text-slate-400">Experience</label>
              <select
                value={selectedExp}
                onChange={(e) => setSelectedExp(e.target.value)}
                className="w-full p-2.5 rounded-lg bg-white/5 border border-white/15 text-slate-200 text-xs focus:outline-none focus:border-amber-400"
              >
                <option value="">Any Experience</option>
                <option value="3">3+ Years</option>
                <option value="5">5+ Years</option>
                <option value="10">10+ Years</option>
              </select>
            </div>

          </div>

        </div>

        {/* INTERACTIVE STATE SELECTOR & APPROX MAP (INDIA MAP SECTION) */}
        <div className="mb-20">
          <div className="text-center mb-8">
            <span className="text-[10px] font-mono tracking-[0.25em] uppercase text-blue-400">INTERACTIVE REGIONAL MATRIX</span>
            <h3 className="mt-2 text-2xl font-extrabold text-white">Explore Sports Talent by States</h3>
            <p className="mt-1 text-xs text-slate-400">Click any state to load state districts and filter registered coaches immediately.</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch max-w-5xl mx-auto">
            
            {/* Zone Board Selector */}
            <div className="lg:col-span-8 border border-white/5 bg-slate-900/60 rounded-3xl p-6 flex flex-col justify-between">
              <div className="space-y-6">
                {regions.map((region) => (
                  <div key={region.name} className="space-y-2">
                    <span className="text-[10px] font-mono tracking-widest text-slate-500 uppercase">{region.name} Zone</span>
                    <div className="flex flex-wrap gap-2">
                      {region.states.map((st) => {
                        const coachCount = coaches.filter(c => c.state === st && c.status === 'approved').length;
                        const isActive = selectedState === st;
                        return (
                          <button
                            key={st}
                            onClick={() => handleStateClick(st)}
                            className={`px-3 py-2 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all ${
                              isActive
                                ? 'bg-gradient-to-r from-amber-500 to-yellow-500 text-slate-950 font-bold shadow-md'
                                : 'bg-white/5 hover:bg-white/10 text-slate-300 border border-white/10 backdrop-blur-sm'
                            }`}
                          >
                            <span>📍 {st}</span>
                            <span className={`text-[9px] px-1.5 py-0.5 rounded-full ${isActive ? 'bg-slate-950 text-amber-400' : 'bg-white/10 text-slate-400'}`}>
                              {coachCount}
                            </span>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>

              {/* Visual mini state card */}
              <div className="mt-6 pt-6 border-t border-white/5 flex flex-wrap gap-3 items-center justify-between">
                <div className="text-left">
                  <span className="text-[10px] text-slate-500 uppercase font-mono">Currently Focused</span>
                  <p className="text-base font-bold text-amber-400">📍 {selectedState || 'All India'}</p>
                </div>
                {selectedState && (
                  <div className="flex flex-wrap gap-1.5">
                    {statesDistricts[selectedState]?.slice(0, 5).map(dist => (
                      <button
                        key={dist}
                        onClick={() => setSelectedDistrict(dist)}
                        className={`px-2 py-1 rounded text-[10px] font-mono transition-all ${
                          selectedDistrict === dist ? 'bg-blue-600 text-white shadow-md' : 'bg-white/5 text-slate-400 border border-white/10 hover:bg-white/10'
                        }`}
                      >
                        {dist}
                      </button>
                    ))}
                    {statesDistricts[selectedState]?.length > 5 && <span className="text-[10px] text-slate-500 self-center">+{statesDistricts[selectedState].length - 5} more</span>}
                  </div>
                )}
              </div>
            </div>

            {/* Quick map visualization card */}
            <div className="lg:col-span-4 border border-amber-500/20 bg-gradient-to-br from-slate-900 to-slate-950 rounded-3xl p-6 flex flex-col justify-between shadow-xl relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/5 rounded-full blur-2xl pointer-events-none" />
              
              <div className="text-left z-10">
                <span className="text-[10px] font-mono text-amber-400 uppercase tracking-widest">STATE RADAR ACTIVE</span>
                <h4 className="text-xl font-bold text-white mt-1">
                  {selectedState ? `${selectedState} Registry` : "National Registry"}
                </h4>
                <p className="text-xs text-slate-400 mt-2">
                  {selectedState 
                    ? `Displaying all certified sport coaches registered from the districts of ${selectedState}.`
                    : "Filter coach certifications, government NIS diplomas, playing records, and age training specialties."}
                </p>
              </div>

              {/* Abstract decorative graphic representing India sports map */}
              <div className="my-6 relative flex h-36 items-center justify-center">
                <div className="absolute h-28 w-28 rounded-full border border-dashed border-white/10 animate-spin-slow flex items-center justify-center">
                  <div className="h-20 w-20 rounded-full border border-dashed border-amber-500/20" />
                </div>
                <div className="absolute flex flex-col items-center">
                  <Trophy className="h-10 w-10 text-amber-400 filter drop-shadow-[0_0_10px_rgba(245,158,11,0.3)]" />
                  <span className="text-[9px] font-mono text-slate-400 mt-2 uppercase">Verified National Code</span>
                </div>
              </div>

              <div className="text-left bg-slate-950/60 p-3.5 rounded-xl border border-white/5">
                <div className="flex justify-between items-center text-xs text-slate-300">
                  <span>Coaches Found:</span>
                  <span className="font-bold text-white text-sm bg-blue-600/30 px-2 py-0.5 rounded border border-blue-500/30">
                    {filteredCoaches.length}
                  </span>
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* RESULTS SECTION */}
        <div className="mb-8 flex flex-col sm:flex-row justify-between items-center gap-4 border-b border-white/8 pb-4">
          <div className="flex gap-2 text-sm font-semibold">
            <button
              onClick={() => setActiveTab('all')}
              className={`px-4.5 py-2 rounded-lg transition-all ${activeTab === 'all' ? 'bg-blue-600 text-white shadow-lg' : 'text-slate-400 hover:text-white'}`}
            >
              All Coaches ({coaches.filter(c => c.status === 'approved').length})
            </button>
            <button
              onClick={() => setActiveTab('featured')}
              className={`px-4.5 py-2 rounded-lg transition-all ${activeTab === 'featured' ? 'bg-blue-600 text-white shadow-lg' : 'text-slate-400 hover:text-white'}`}
            >
              ⭐ Featured ({coaches.filter(c => c.featured && c.status === 'approved').length})
            </button>
            <button
              onClick={() => setActiveTab('top-rated')}
              className={`px-4.5 py-2 rounded-lg transition-all ${activeTab === 'top-rated' ? 'bg-blue-600 text-white shadow-lg' : 'text-slate-400 hover:text-white'}`}
            >
              🏆 Top Rated ({coaches.filter(c => c.averageRating >= 4.8 && c.status === 'approved').length})
            </button>
          </div>

          <span className="text-xs font-mono text-slate-400">
            Showing <strong className="text-white">{filteredCoaches.length}</strong> of {coaches.length} registered coaches
          </span>
        </div>

        {/* COACH CARDS GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence>
            {filteredCoaches.length > 0 ? (
              filteredCoaches.map((coach, index) => {
                const isBookmarked = bookmarkedIds.includes(coach.id);
                return (
                  <motion.div
                    key={coach.id}
                    layout
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.4, delay: Math.min(index * 0.05, 0.4) }}
                    className="group relative rounded-2xl border border-white/10 glass-premium hover:border-white/20 hover:bg-white/10 hover:shadow-2xl hover:shadow-blue-500/10 transition-all duration-300 flex flex-col justify-between overflow-hidden p-5"
                  >
                    {/* Featured Gold Badge decoration */}
                    {coach.featured && (
                      <div className="absolute top-0 right-0 bg-amber-500 text-slate-950 font-bold text-[9px] tracking-wider uppercase px-2.5 py-1 rounded-bl-lg shadow-md z-10">
                        FEATURED
                      </div>
                    )}

                    <div>
                      {/* Coach main row */}
                      <div className="flex gap-4 items-start">
                        {/* Profile Image with glows */}
                        <div className="relative h-16 w-16 rounded-xl overflow-hidden border border-white/10 shrink-0">
                          <img src={coach.photo} alt={coach.fullName} className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-300" />
                        </div>

                        {/* Basic Details */}
                        <div className="text-left">
                          <div className="flex items-center gap-1.5 flex-wrap">
                            <h4 className="font-display font-bold text-white text-lg tracking-tight group-hover:text-blue-400 transition-colors">
                              {coach.fullName}
                            </h4>
                            {coach.isVerified && (
                              <span className="inline-flex items-center justify-center h-4 w-4 rounded-full bg-blue-500 text-white text-[10px]" title="Government Verified ✔">
                                ✔
                              </span>
                            )}
                          </div>
                          <span className="text-xs text-amber-400 font-medium tracking-wide flex items-center gap-1 mt-0.5">
                            🏆 {coach.sport} Specialization
                          </span>
                          <span className="text-[10px] text-slate-400 font-mono mt-1 block">
                            Reg ID: {coach.registrationNumber}
                          </span>
                        </div>
                      </div>

                      {/* Coach Bio summary snippet */}
                      <p className="mt-4 text-xs text-slate-300 text-left line-clamp-2">
                        {coach.biography}
                      </p>

                      {/* Key stats row */}
                      <div className="mt-4 grid grid-cols-2 gap-2 bg-slate-950/60 p-3 rounded-lg border border-white/5 text-left text-xs">
                        <div>
                          <span className="text-[10px] text-slate-500 block">Experience</span>
                          <span className="font-bold text-slate-200">{coach.coachingExperience} Years</span>
                        </div>
                        <div>
                          <span className="text-[10px] text-slate-500 block">Current Academy</span>
                          <span className="font-bold text-slate-200 truncate block max-w-full" title={coach.currentAcademy}>
                            {coach.currentAcademy}
                          </span>
                        </div>
                      </div>

                      {/* Sports Credentials & Badges row */}
                      <div className="mt-4 flex flex-wrap gap-1.5 justify-start">
                        {coach.coachingQualification && (
                          <span className="px-2 py-0.5 rounded text-[9px] font-mono bg-blue-600/10 text-blue-300 border border-blue-500/20">
                            {coach.coachingQualification.slice(0, 20)}
                          </span>
                        )}
                        {coach.highestQualification && (
                          <span className="px-2 py-0.5 rounded text-[9px] font-mono bg-purple-600/10 text-purple-300 border border-purple-500/20">
                            {coach.highestQualification.slice(0, 15)}
                          </span>
                        )}
                        <span className="px-2 py-0.5 rounded text-[9px] font-mono bg-slate-800 text-slate-300 border border-white/5">
                          📍 {coach.district}
                        </span>
                      </div>
                    </div>

                    {/* Bottom Action Footer */}
                    <div className="mt-5 pt-4 border-t border-white/5 flex items-center justify-between gap-2">
                      <div className="flex items-center gap-1">
                        <span className="text-xs font-bold text-white">⭐ {coach.averageRating > 0 ? coach.averageRating.toFixed(1) : "5.0"}</span>
                        <span className="text-[10px] text-slate-500">({coach.totalReviews} Reviews)</span>
                      </div>

                      <div className="flex gap-2">
                        {/* Bookmark Button */}
                        <button
                          onClick={() => onBookmarkCoach(coach)}
                          className={`p-2 rounded-lg border text-xs transition-all ${
                            isBookmarked 
                              ? 'bg-amber-500/10 border-amber-500 text-amber-400' 
                              : 'border-white/5 hover:border-slate-400 text-slate-400 hover:text-white'
                          }`}
                          title={isBookmarked ? "Remove Bookmark" : "Bookmark Coach"}
                        >
                          ★
                        </button>

                        <button
                          onClick={() => onSelectCoach(coach)}
                          className="px-4.5 py-1.5 rounded-lg text-xs font-semibold bg-blue-600 hover:bg-blue-500 text-white shadow-lg transition-all cursor-pointer flex items-center gap-1"
                        >
                          <span>View Profile</span>
                          <ArrowRight className="h-3 w-3" />
                        </button>
                      </div>
                    </div>

                  </motion.div>
                );
              })
            ) : (
              <div className="col-span-full py-16 text-center border border-dashed border-white/10 rounded-2xl bg-slate-900/20">
                <p className="text-slate-400 text-sm">No registered coaches found matching the filter criteria.</p>
                <button onClick={clearFilters} className="mt-4 px-4.5 py-2 bg-blue-600 text-white rounded-lg text-xs font-semibold cursor-pointer">
                  Reset Search Filters
                </button>
              </div>
            )}
          </AnimatePresence>
        </div>

      </div>
    </div>
  );
}
