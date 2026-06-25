/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Calendar, MapPin, Award, Trophy, Search } from 'lucide-react';
import { Tournament } from '../types';

interface TournamentDirectoryProps {
  tournaments: Tournament[];
  sports: string[];
}

export default function TournamentDirectory({ tournaments, sports }: TournamentDirectoryProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSport, setSelectedSport] = useState('');
  const [selectedLevel, setSelectedLevel] = useState('');

  const levels = ['National', 'State', 'District', 'School Games', 'CBSE', 'Khelo India', 'SGFI'];

  const filteredTournaments = tournaments.filter(t => {
    const matchesSearch = searchTerm === '' || 
      t.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      t.venue.toLowerCase().includes(searchTerm.toLowerCase()) ||
      t.organizer.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesSport = selectedSport === '' || t.sport === selectedSport;
    const matchesLevel = selectedLevel === '' || t.level === selectedLevel;

    return matchesSearch && matchesSport && matchesLevel;
  });

  return (
    <div className="py-16 bg-transparent min-h-[calc(100vh-5rem)]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-10">
        
        {/* Title */}
        <div className="text-left space-y-2">
          <span className="text-[10px] font-mono tracking-widest text-blue-400 uppercase">ATHLETE ARENA PLATFORMS</span>
          <h1 className="text-3xl font-display font-black text-white">National Tournament Directory</h1>
          <p className="text-sm text-slate-400">Discover scheduled school games, national trials, CBSE meets, Khelo India trials, and regional sports championships.</p>
        </div>

        {/* Micro filters box */}
        <div className="rounded-3xl border border-white/10 glass-premium p-6 grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
          <div className="md:col-span-6 relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4.5 w-4.5 text-slate-400" />
            <input
              type="text"
              placeholder="Search tournaments by title, venue or organizer..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-11 pr-4 py-3.5 rounded-xl bg-white/5 border border-white/15 text-white placeholder-slate-400 focus:outline-none focus:border-amber-400 text-xs"
            />
          </div>

          <div className="md:col-span-3">
            <select
              value={selectedLevel}
              onChange={(e) => setSelectedLevel(e.target.value)}
              className="w-full p-3.5 rounded-xl bg-white/5 border border-white/15 text-slate-300 text-xs focus:outline-none focus:border-amber-400"
            >
              <option value="">All Levels</option>
              {levels.map(l => <option key={l} value={l}>{l}</option>)}
            </select>
          </div>

          <div className="md:col-span-3">
            <select
              value={selectedSport}
              onChange={(e) => setSelectedSport(e.target.value)}
              className="w-full p-3.5 rounded-xl bg-white/5 border border-white/15 text-slate-300 text-xs focus:outline-none focus:border-amber-400"
            >
              <option value="">All Sports</option>
              {sports.map(sp => <option key={sp} value={sp}>{sp}</option>)}
            </select>
          </div>
        </div>

        {/* Tournaments list */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredTournaments.length > 0 ? (
            filteredTournaments.map((t) => (
              <div 
                key={t.id}
                className="p-6 glass border border-white/10 hover:border-white/20 hover:bg-white/10 rounded-2xl flex flex-col justify-between text-left group transition-all duration-300"
              >
                <div className="space-y-4">
                  
                  {/* Badge Row */}
                  <div className="flex justify-between items-center flex-wrap gap-2">
                    <span className="px-2.5 py-1 rounded bg-blue-600/15 text-blue-300 border border-blue-500/20 text-[10px] font-mono uppercase tracking-wide font-bold">
                      {t.level}
                    </span>
                    <span className="text-[10px] font-mono text-slate-400">Sport focus: {t.sport}</span>
                  </div>

                  <h3 className="text-lg font-display font-black text-white group-hover:text-blue-400 transition-colors">
                    {t.title}
                  </h3>

                  <p className="text-xs text-slate-400 leading-relaxed">
                    {t.description}
                  </p>

                  <div className="space-y-2 border-t border-white/5 pt-4 text-xs text-slate-300">
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-amber-400" />
                      <span>Date: <strong>{t.date}</strong></span>
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin className="h-4 w-4 text-amber-400" />
                      <span className="truncate">Venue: {t.venue}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Award className="h-4 w-4 text-amber-400" />
                      <span className="truncate">Organizer: {t.organizer}</span>
                    </div>
                  </div>

                </div>

                <div className="flex gap-2 pt-6 border-t border-white/5 mt-6">
                  <a
                    href="https://coachverify.in/docs/mock_brochure.pdf"
                    target="_blank"
                    rel="noreferrer"
                    className="flex-1 py-2 rounded-xl border border-white/10 hover:bg-white/5 text-xs text-center font-semibold text-slate-300 block"
                    onClick={(e) => {
                      e.preventDefault();
                      alert('✔ Mock PDF Tournament Brochure starting download!');
                    }}
                  >
                    Download Brochure
                  </a>

                  <a
                    href={t.registrationLink}
                    className="flex-1 py-2 bg-blue-600 hover:bg-blue-500 text-xs text-center font-bold text-white rounded-xl shadow-lg block"
                    onClick={(e) => {
                      e.preventDefault();
                      alert('✔ Redirecting to secured central tournament sign-up boards.');
                    }}
                  >
                    Online Register
                  </a>
                </div>

              </div>
            ))
          ) : (
            <div className="col-span-full py-16 text-center border border-dashed border-white/10 rounded-2xl bg-slate-900/20">
              <p className="text-slate-400 text-sm">No scheduled sports events or trials match current filters.</p>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}
