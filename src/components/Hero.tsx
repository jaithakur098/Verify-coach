/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { motion } from 'motion/react';
import { Search, PenTool, CheckCircle, Trophy, Star, MapPin, Sparkles } from 'lucide-react';
import { SystemStats } from '../types';

interface HeroProps {
  stats: SystemStats;
  onNavigate: (view: string) => void;
  onScrollToSearch: () => void;
  onOpenVerifyStatus: () => void;
}

export default function Hero({ stats, onNavigate, onScrollToSearch, onOpenVerifyStatus }: HeroProps) {
  // Floating cards animation configuration
  const floatAnimation = (delay: number) => ({
    initial: { y: 0 },
    animate: {
      y: [0, -15, 0],
      transition: {
        duration: 5,
        repeat: Infinity,
        repeatType: "reverse" as const,
        ease: "easeInOut",
        delay
      }
    }
  });

  return (
    <section className="relative min-h-[calc(100vh-5rem)] flex items-center justify-center overflow-hidden bg-transparent py-12">
      
      {/* Background Decorative Glow Lights */}
      <div className="absolute top-1/4 left-1/4 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-blue-600/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 translate-x-1/2 translate-y-1/2 w-[400px] h-[400px] bg-amber-500/10 rounded-full blur-[150px] pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_20%,#020617_90%)] pointer-events-none" />

      {/* Grid Pattern Overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:4rem_4rem] pointer-events-none" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 w-full z-10 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        
        {/* Left Column: Copy & Actions */}
        <div className="lg:col-span-7 flex flex-col items-start text-left space-y-6">
          
          {/* Badge */}
          <motion.div 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-amber-500/30 bg-amber-500/5 text-amber-300 text-xs font-semibold tracking-wide uppercase"
          >
            <span className="flex h-2 w-2 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-500"></span>
            </span>
            <span>🇮🇳 India's Largest Verified Sports Coach Directory</span>
          </motion.div>

          {/* Main Heading */}
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="text-4xl sm:text-5xl lg:text-6xl font-display font-extrabold tracking-tight text-white leading-[1.1]"
          >
            Find India's <br />
            <span className="bg-gradient-to-r from-blue-400 via-amber-400 to-amber-500 bg-clip-text text-transparent">
              Best Verified Sports Coaches
            </span>
          </motion.h1>

          {/* Subheading */}
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-base sm:text-lg text-slate-300 max-w-2xl font-light leading-relaxed"
          >
            Discover trusted and verified sports coaches from every state, district and sport across India. 
            Search by location, qualification, academy or sport and connect with certified professionals.
          </motion.p>

          {/* Action Buttons */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="flex flex-wrap gap-4 w-full sm:w-auto"
          >
            <button
              onClick={onScrollToSearch}
              className="flex items-center justify-center gap-2 px-6 py-3.5 text-sm font-bold text-slate-950 bg-gradient-to-r from-blue-500 via-amber-400 to-amber-500 hover:from-blue-600 hover:to-amber-600 rounded-xl shadow-lg shadow-blue-500/10 hover:shadow-amber-500/20 hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 w-full sm:w-auto cursor-pointer"
            >
              <Search className="h-4 w-4 text-slate-950" />
              Find Best Coach
            </button>

            <button
              onClick={() => onNavigate('register')}
              className="flex items-center justify-center gap-2 px-6 py-3.5 text-sm font-semibold text-white bg-slate-900 border border-white/10 hover:border-blue-500 hover:bg-slate-800 rounded-xl hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 w-full sm:w-auto cursor-pointer"
            >
              <PenTool className="h-4 w-4 text-blue-400" />
              Register as Coach
            </button>

            <button
              onClick={onOpenVerifyStatus}
              className="flex items-center justify-center gap-2 px-6 py-3.5 text-sm font-semibold text-amber-400 bg-amber-500/5 border border-amber-500/20 hover:border-amber-500 hover:bg-amber-500/10 rounded-xl hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 w-full sm:w-auto cursor-pointer"
            >
              <CheckCircle className="h-4 w-4 text-amber-400" />
              Verify Coach Profile
            </button>
          </motion.div>

        </div>

        {/* Right Column: Premium Hero Visualization with Floating Cards */}
        <div className="lg:col-span-5 relative flex items-center justify-center min-h-[350px] sm:min-h-[450px]">
          
          {/* Light Glow behind the person */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 h-72 bg-blue-500/20 rounded-full blur-[80px] z-0" />
          <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-56 h-56 bg-amber-500/10 rounded-full blur-[60px] z-0" />

          {/* Coach Picture Frame */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1 }}
            className="relative h-80 w-80 sm:h-96 sm:w-96 rounded-full overflow-hidden border border-white/15 bg-slate-900 shadow-[0_20px_50px_rgba(0,0,0,0.5)] z-10 flex items-center justify-center"
          >
            <div className="absolute inset-0 bg-gradient-to-tr from-slate-950 via-transparent to-blue-500/20 z-10" />
            <img 
              src="https://images.unsplash.com/photo-1552674605-db6ffd4facb5?auto=format&fit=crop&q=80&w=500" 
              alt="Professional Sports Coach" 
              className="h-full w-full object-cover"
            />
          </motion.div>

          {/* Floating Luxury Glass Cards */}
          
          {/* Card 1: Verified Coach */}
          <motion.div
            variants={floatAnimation(0)}
            initial="initial"
            animate="animate"
            className="absolute top-4 left-0 sm:-left-4 z-20 flex items-center gap-2.5 px-4 py-2.5 rounded-xl border border-emerald-500/30 bg-emerald-950/40 backdrop-blur-md shadow-lg"
          >
            <div className="flex h-7 w-7 items-center justify-center rounded-full bg-emerald-500/20 text-emerald-400">
              <CheckCircle className="h-4.5 w-4.5" />
            </div>
            <div className="flex flex-col text-left">
              <span className="text-xs font-bold text-white tracking-wide">🏆 Verified Coach</span>
              <span className="text-[9px] text-emerald-400 font-mono">100% SECURE</span>
            </div>
          </motion.div>

          {/* Card 2: NIS Certified */}
          <motion.div
            variants={floatAnimation(1.5)}
            initial="initial"
            animate="animate"
            className="absolute right-0 sm:-right-4 top-16 z-20 flex items-center gap-2.5 px-4 py-2.5 rounded-xl border border-amber-500/30 bg-slate-950/50 backdrop-blur-md shadow-lg"
          >
            <div className="flex h-7 w-7 items-center justify-center rounded-full bg-amber-500/20 text-amber-400">
              <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
            </div>
            <div className="flex flex-col text-left">
              <span className="text-xs font-bold text-white">⭐ NIS Certified</span>
              <span className="text-[9px] text-amber-400 font-mono">GOVT RECOGNIZED</span>
            </div>
          </motion.div>

          {/* Card 3: National Coach */}
          <motion.div
            variants={floatAnimation(0.8)}
            initial="initial"
            animate="animate"
            className="absolute left-2 bottom-12 sm:-left-8 z-20 flex items-center gap-2.5 px-4 py-2.5 rounded-xl border border-blue-500/30 bg-blue-950/40 backdrop-blur-md shadow-lg"
          >
            <div className="flex h-7 w-7 items-center justify-center rounded-full bg-blue-500/20 text-blue-400">
              <Trophy className="h-4 w-4" />
            </div>
            <div className="flex flex-col text-left">
              <span className="text-xs font-bold text-white">🎖 National Coach</span>
              <span className="text-[9px] text-blue-300 font-mono">SAI STANDARDS</span>
            </div>
          </motion.div>

          {/* Card 4: Location Badge */}
          <motion.div
            variants={floatAnimation(2.2)}
            initial="initial"
            animate="animate"
            className="absolute right-4 bottom-4 sm:right-0 z-20 flex items-center gap-2 px-3 py-1.5 rounded-full border border-white/10 bg-slate-950/60 backdrop-blur-md shadow-lg"
          >
            <MapPin className="h-3.5 w-3.5 text-amber-400" />
            <span className="text-[11px] font-semibold text-slate-200">📍 Rajasthan, Haryana & 28+ States</span>
          </motion.div>

          {/* Sport Chips Floating */}
          <motion.div
            variants={floatAnimation(2.8)}
            initial="initial"
            animate="animate"
            className="absolute top-1/2 left-2 sm:-left-12 z-20 flex flex-col gap-1.5"
          >
            <span className="px-2.5 py-1 rounded-md text-[10px] font-mono bg-blue-500/20 border border-blue-500/30 text-blue-300 shadow-md">🥋 Taekwondo</span>
            <span className="px-2.5 py-1 rounded-md text-[10px] font-mono bg-amber-500/20 border border-amber-500/30 text-amber-300 shadow-md">⚽ Football</span>
          </motion.div>

          <motion.div
            variants={floatAnimation(1.2)}
            initial="initial"
            animate="animate"
            className="absolute top-1/2 right-2 sm:-right-12 z-20 flex flex-col gap-1.5"
          >
            <span className="px-2.5 py-1 rounded-md text-[10px] font-mono bg-yellow-500/20 border border-yellow-500/30 text-yellow-300 shadow-md">🏏 Cricket</span>
            <span className="px-2.5 py-1 rounded-md text-[10px] font-mono bg-purple-500/20 border border-purple-500/30 text-purple-300 shadow-md">🏸 Badminton</span>
          </motion.div>

        </div>

      </div>

    </section>
  );
}
