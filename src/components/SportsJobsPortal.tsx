/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Briefcase, MapPin, Search, Mail, ShieldCheck, GraduationCap } from 'lucide-react';
import { JobVacancy } from '../types';

interface SportsJobsPortalProps {
  jobs: JobVacancy[];
  sports: string[];
  isCoachLoggedIn: boolean;
  onOpenAuth: () => void;
}

export default function SportsJobsPortal({ jobs, sports, isCoachLoggedIn, onOpenAuth }: SportsJobsPortalProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSport, setSelectedSport] = useState('');
  const [selectedOrgType, setSelectedOrgType] = useState('');

  const orgTypes = ['School', 'College', 'University', 'Academy', 'Sports Club'];

  const filteredJobs = jobs.filter(j => {
    const matchesSearch = searchTerm === '' || 
      j.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      j.organizationName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      j.location.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesSport = selectedSport === '' || j.sport === selectedSport;
    const matchesOrg = selectedOrgType === '' || j.organizationType === selectedOrgType;

    return matchesSearch && matchesSport && matchesOrg;
  });

  const handleApply = (job: JobVacancy) => {
    if (!isCoachLoggedIn) {
      alert('🔒 Profile Verification Required: Only registered & approved CoachVerify professionals can apply to vacancies.');
      onOpenAuth();
      return;
    }
    alert(`✔ Secured application packets successfully dispatched to ${job.organizationName}! Recruiting directors will contact your registered WhatsApp phone.`);
  };

  return (
    <div className="py-16 bg-transparent min-h-[calc(100vh-5rem)]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-10">
        
        {/* Title */}
        <div className="text-left space-y-2">
          <span className="text-[10px] font-mono tracking-widest text-blue-400 uppercase">NATIONAL OPPORTUNITIES</span>
          <h1 className="text-3xl font-display font-black text-white">Sports Coaching Vacancies</h1>
          <p className="text-sm text-slate-400">Discover job offers, physical development roles, and coaching contracts from schools, colleges, and clubs across India.</p>
        </div>

        {/* Micro filters box */}
        <div className="rounded-3xl border border-white/10 glass-premium p-6 grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
          <div className="md:col-span-6 relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4.5 w-4.5 text-slate-400" />
            <input
              type="text"
              placeholder="Search vacancies by title, institution or city..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-11 pr-4 py-3.5 rounded-xl bg-white/5 border border-white/15 text-white placeholder-slate-400 focus:outline-none focus:border-amber-400 text-xs"
            />
          </div>

          <div className="md:col-span-3">
            <select
              value={selectedOrgType}
              onChange={(e) => setSelectedOrgType(e.target.value)}
              className="w-full p-3.5 rounded-xl bg-white/5 border border-white/15 text-slate-300 text-xs focus:outline-none focus:border-amber-400"
            >
              <option value="">All Employers</option>
              {orgTypes.map(o => <option key={o} value={o}>{o}</option>)}
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

        {/* Jobs list */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredJobs.length > 0 ? (
            filteredJobs.map((j) => (
              <div 
                key={j.id}
                className="p-6 glass border border-white/10 hover:border-white/20 hover:bg-white/10 rounded-2xl flex flex-col justify-between text-left group transition-all duration-300"
              >
                <div className="space-y-4">
                  
                  {/* Employer Header */}
                  <div className="flex justify-between items-start gap-4">
                    <div className="space-y-1">
                      <span className="text-[10px] text-amber-400 uppercase font-mono tracking-wide">
                        🏆 {j.sport} Specialist Vacancy
                      </span>
                      <h3 className="text-lg font-display font-black text-white group-hover:text-blue-400 transition-colors">
                        {j.title}
                      </h3>
                      <p className="text-xs font-semibold text-slate-300 flex items-center gap-1">
                        {j.organizationName}
                        {j.isVerifiedOrganization && <ShieldCheck className="h-4 w-4 text-blue-500" title="Vetted Institution ✔" />}
                      </p>
                    </div>

                    <div className="h-10 w-10 rounded bg-slate-950 border border-white/5 flex items-center justify-center text-slate-400">
                      <Briefcase className="h-5 w-5" />
                    </div>
                  </div>

                  <p className="text-xs text-slate-400 leading-relaxed line-clamp-3">
                    {j.description}
                  </p>

                  <div className="grid grid-cols-2 gap-2 bg-slate-950/60 p-3.5 rounded-xl border border-white/5 text-xs text-slate-300">
                    <div>
                      <span className="text-[9px] text-slate-500 uppercase font-mono block">Remuneration</span>
                      <span className="font-bold text-slate-200">{j.salaryRange}</span>
                    </div>
                    <div>
                      <span className="text-[9px] text-slate-500 uppercase font-mono block">Experience Req</span>
                      <span className="font-bold text-slate-200">{j.experienceRequired} Years Min</span>
                    </div>
                  </div>

                  {/* Requirements bullet items */}
                  <div className="space-y-1.5 text-xs">
                    <span className="text-[10px] font-mono tracking-wider text-slate-500 uppercase block">Requirements</span>
                    {j.requirements?.slice(0, 2).map((req, ind) => (
                      <p key={ind} className="text-slate-400 pl-3 relative text-[11px]">
                        <span className="absolute left-0 text-amber-500">•</span> {req}
                      </p>
                    ))}
                  </div>

                  <div className="flex items-center gap-1.5 text-xs text-slate-400 pt-2 border-t border-white/5">
                    <MapPin className="h-4 w-4 text-slate-500" />
                    <span>Location: {j.location}</span>
                  </div>

                </div>

                <div className="mt-6 pt-4 border-t border-white/5">
                  <button
                    onClick={() => handleApply(j)}
                    className="w-full py-2.5 bg-blue-600 hover:bg-blue-500 text-xs font-bold text-white rounded-xl shadow-lg transition-all cursor-pointer"
                  >
                    Apply with Verified CV ID Card
                  </button>
                </div>

              </div>
            ))
          ) : (
            <div className="col-span-full py-16 text-center border border-dashed border-white/10 rounded-2xl bg-slate-900/20">
              <p className="text-slate-400 text-sm">No vacancy matching selected filters is open at this moment.</p>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}
