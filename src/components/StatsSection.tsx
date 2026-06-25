/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { motion } from 'motion/react';
import { Users, CheckCircle2, Trophy, Map, Library, MapPin } from 'lucide-react';
import { SystemStats } from '../types';

interface StatsSectionProps {
  stats: SystemStats;
}

export default function StatsSection({ stats }: StatsSectionProps) {
  const statItems = [
    {
      id: 'coaches',
      label: 'Registered Coaches',
      value: stats.registeredCoaches,
      sub: 'Pan-India registrations',
      icon: Users,
      color: 'from-blue-600 to-indigo-600',
      textColor: 'text-blue-400'
    },
    {
      id: 'verified',
      label: 'Verified Coaches',
      value: stats.verifiedCoaches,
      sub: 'Approved by Sport Administrators',
      icon: CheckCircle2,
      color: 'from-emerald-600 to-teal-600',
      textColor: 'text-emerald-400'
    },
    {
      id: 'sports',
      label: 'Active Sports',
      value: stats.sportsCount,
      sub: 'Athletics, Combat, Team sports',
      icon: Trophy,
      color: 'from-amber-500 to-orange-500',
      textColor: 'text-amber-400'
    },
    {
      id: 'states',
      label: 'States & UTs Covered',
      value: stats.statesCount,
      sub: 'Every region in India',
      icon: Map,
      color: 'from-purple-600 to-pink-600',
      textColor: 'text-purple-400'
    },
    {
      id: 'districts',
      label: 'Districts Reached',
      value: stats.districtsCount,
      sub: 'Sub-divisional sports hubs',
      icon: MapPin,
      color: 'from-cyan-600 to-blue-500',
      textColor: 'text-cyan-400'
    },
    {
      id: 'academies',
      label: 'Registered Academies',
      value: stats.academiesCount,
      sub: 'Elite sports training zones',
      icon: Library,
      color: 'from-indigo-600 to-violet-600',
      textColor: 'text-indigo-400'
    }
  ];

  return (
    <div className="relative -mt-10 sm:-mt-16 z-30 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {statItems.map((stat, i) => (
          <motion.div
            key={stat.id}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.05 }}
            whileHover={{ y: -8, transition: { duration: 0.2 } }}
            className="relative overflow-hidden rounded-2xl border border-white/8 glass p-5 flex flex-col items-center justify-center text-center group"
          >
            {/* Hover decorative glowing circle */}
            <div className={`absolute -bottom-10 -right-10 w-24 h-24 bg-gradient-to-br ${stat.color} opacity-0 group-hover:opacity-10 rounded-full blur-xl transition-all duration-500`} />
            
            {/* Icon Wrapper */}
            <div className={`flex h-11 w-11 items-center justify-center rounded-xl bg-slate-900 border border-white/5 ${stat.textColor} group-hover:scale-110 transition-transform duration-300 shadow-md`}>
              <stat.icon className="h-5.5 w-5.5" />
            </div>

            {/* Stat Value */}
            <span className="mt-4 font-display text-2xl sm:text-3xl font-extrabold tracking-tight text-white">
              {stat.value}
            </span>

            {/* Stat Label */}
            <span className="mt-1 text-xs font-semibold text-slate-200">
              {stat.label}
            </span>

            {/* Stat Subtext */}
            <span className="mt-0.5 text-[10px] text-slate-400 font-mono tracking-wide">
              {stat.sub}
            </span>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
