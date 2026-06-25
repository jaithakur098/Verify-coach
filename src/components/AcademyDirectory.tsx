/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Search, MapPin, Globe, Phone, Award, Users, ShieldCheck } from 'lucide-react';
import { Academy } from '../types';

interface AcademyDirectoryProps {
  academies: Academy[];
  sports: string[];
  statesDistricts: { [key: string]: string[] };
}

export default function AcademyDirectory({ academies, sports, statesDistricts }: AcademyDirectoryProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedState, setSelectedState] = useState('');
  const [selectedSport, setSelectedSport] = useState('');

  const states = Object.keys(statesDistricts);

  const filteredAcademies = academies.filter(acad => {
    const matchesSearch = searchTerm === '' || 
      acad.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      acad.ownerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      acad.district.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesState = selectedState === '' || acad.state === selectedState;
    const matchesSport = selectedSport === '' || acad.sportsAvailable.includes(selectedSport);

    return matchesSearch && matchesState && matchesSport;
  });

  return (
    <div className="py-16 bg-transparent min-h-[calc(100vh-5rem)]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-10">
        
        {/* Title */}
        <div className="text-left space-y-2">
          <span className="text-[10px] font-mono tracking-widest text-blue-400 uppercase">NATIONAL TRAINING NETWORKS</span>
          <h1 className="text-3xl font-display font-black text-white">Sports Academies & Clubs Directory</h1>
          <p className="text-sm text-slate-400">Discover top-tier sports academies, high-performance training centers, and sports clubs across India.</p>
        </div>

        {/* Micro filters box */}
        <div className="rounded-3xl border border-white/10 glass-premium p-6 grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
          <div className="md:col-span-6 relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4.5 w-4.5 text-slate-400" />
            <input
              type="text"
              placeholder="Search academy by name, location or head director..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-11 pr-4 py-3.5 rounded-xl bg-white/5 border border-white/15 text-white placeholder-slate-400 focus:outline-none focus:border-amber-400 text-xs"
            />
          </div>

          <div className="md:col-span-3">
            <select
              value={selectedState}
              onChange={(e) => setSelectedState(e.target.value)}
              className="w-full p-3.5 rounded-xl bg-white/5 border border-white/15 text-slate-300 text-xs focus:outline-none focus:border-amber-400"
            >
              <option value="">All States</option>
              {states.map(s => <option key={s} value={s}>{s}</option>)}
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

        {/* Academies Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredAcademies.length > 0 ? (
            filteredAcademies.map((acad) => (
              <div 
                key={acad.id} 
                className="group border border-white/10 glass hover:bg-white/10 hover:border-white/20 rounded-2xl overflow-hidden flex flex-col justify-between transition-all duration-300"
              >
                <div>
                  {/* Photo cover */}
                  <div className="h-44 overflow-hidden relative border-b border-white/5 bg-slate-950">
                    <img src={acad.photos[0]} alt={acad.name} className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-300" />
                    {acad.isVerified && (
                      <div className="absolute top-3 left-3 bg-blue-600 text-white font-bold text-[9px] px-2.5 py-1 rounded-md shadow flex items-center gap-1">
                        <ShieldCheck className="h-3 w-3" /> VERIFIED ACADEMY
                      </div>
                    )}
                  </div>

                  {/* Body details */}
                  <div className="p-5 text-left space-y-4">
                    <div className="space-y-1">
                      <h3 className="font-display font-extrabold text-white text-lg group-hover:text-blue-400 transition-colors">
                        {acad.name}
                      </h3>
                      <span className="text-[10px] text-slate-400 flex items-center gap-1">
                        <MapPin className="h-3 w-3 text-amber-500" /> {acad.address}
                      </span>
                    </div>

                    {/* Meta info columns */}
                    <div className="grid grid-cols-2 gap-3 bg-slate-950/60 p-3 rounded-lg border border-white/5 text-xs">
                      <div>
                        <span className="text-[9px] text-slate-500 block uppercase font-mono">Head Director</span>
                        <span className="font-bold text-slate-200">{acad.ownerName}</span>
                      </div>
                      <div>
                        <span className="text-[9px] text-slate-500 block uppercase font-mono">Head Coach</span>
                        <span className="font-bold text-slate-200">{acad.headCoach}</span>
                      </div>
                    </div>

                    {/* Available Sports chips */}
                    <div className="space-y-1.5">
                      <span className="text-[9px] font-mono tracking-wider text-slate-500 uppercase block">Affiliated Sports Disciplines</span>
                      <div className="flex flex-wrap gap-1">
                        {acad.sportsAvailable.map(sp => (
                          <span key={sp} className="px-2 py-0.5 rounded text-[9px] font-mono bg-blue-600/10 text-blue-300 border border-blue-500/20">
                            {sp}
                          </span>
                        ))}
                      </div>
                    </div>

                    <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed">
                      {acad.studentAchievements}
                    </p>
                  </div>
                </div>

                {/* Footer action */}
                <div className="p-5 pt-0 border-t border-white/5 mt-4 flex items-center justify-between gap-2">
                  <div className="flex gap-2 text-slate-400">
                    {acad.website && (
                      <a href={`https://${acad.website}`} target="_blank" rel="noreferrer" title="Website" className="p-1.5 rounded bg-slate-950 hover:text-white transition-all">
                        <Globe className="h-4 w-4" />
                      </a>
                    )}
                  </div>

                  <a
                    href={`https://wa.me/${acad.whatsapp.replace('+', '')}`}
                    target="_blank"
                    rel="noreferrer"
                    className="px-4 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs rounded-lg shadow-md transition-all flex items-center gap-1.5 cursor-pointer"
                  >
                    <Phone className="h-3.5 w-3.5" /> Contact Academy
                  </a>
                </div>

              </div>
            ))
          ) : (
            <div className="col-span-full py-16 text-center border border-dashed border-white/10 rounded-2xl bg-slate-900/20">
              <p className="text-slate-400 text-sm">No sports academies found matching the criteria.</p>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}
