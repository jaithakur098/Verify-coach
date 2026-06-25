/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { FileText, User, MapPin, Phone, Trophy, Award, Sparkles, CheckCircle2, ShieldCheck, CreditCard, Loader2 } from 'lucide-react';
import { Coach } from '../types';
import { submitCoachRegistration, recordPayment } from '../lib/api';

interface CoachRegistrationFormProps {
  sports: string[];
  statesDistricts: { [key: string]: string[] };
  registrationFee: number;
  onSuccess: (registeredCoach: Coach) => void;
}

export default function CoachRegistrationForm({
  sports,
  statesDistricts,
  registrationFee,
  onSuccess
}: CoachRegistrationFormProps) {
  const [currentStep, setCurrentStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  
  // Custom mock Payment Overlay state
  const [showPaymentGateway, setShowPaymentGateway] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState<'upi' | 'card' | 'netbanking'>('upi');
  const [upiId, setUpiId] = useState('sportsman@okaxis');
  const [cardNumber, setCardNumber] = useState('4111 2222 3333 4444');
  const [paymentLoading, setPaymentLoading] = useState(false);

  // Form State
  const [formData, setFormData] = useState<Partial<Coach>>({
    fullName: '',
    fatherName: '',
    motherName: '',
    gender: 'Male',
    dob: '',
    bloodGroup: 'B+',
    nationality: 'Indian',
    aadhaarNumber: '',
    panNumber: '',
    
    address: '',
    village: '',
    city: '',
    district: '',
    state: '',
    pincode: '',
    
    phone: '',
    whatsapp: '',
    email: '',
    website: '',
    instagram: '',
    facebook: '',
    linkedin: '',
    youtube: '',
    
    sport: '',
    specialization: '',
    playingExperience: 5,
    coachingExperience: 3,
    currentAcademy: '',
    previousAcademy: '',
    designation: 'Sports Coach',
    languages: ['Hindi', 'English'],
    ageGroups: ['Under-14', 'Under-19'],
    
    highestQualification: 'Bachelor of Physical Education (B.P.Ed)',
    sportsQualification: 'NIS Diploma in Sports Coaching',
    coachingQualification: 'NIS Certified',
    certificates: ['nis_cert.pdf', 'first_aid.pdf'],
    
    nationalParticipation: 'Yes, Silver Medalist in National Athletics Trials',
    internationalParticipation: 'No',
    awards: 'District Sports Excellence Award',
    achievements: 'Developed 3 state level champions in badminton',
    studentAchievements: 'Junior state champion represented Under-19 state trials',
    gallery: [
      'https://images.unsplash.com/photo-1541534741688-6078c6bfb5c5?auto=format&fit=crop&q=80&w=400',
      'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&q=80&w=400'
    ],
    videos: [],
    
    photo: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&q=80&w=400' // Default placeholder coach
  });

  const states = Object.keys(statesDistricts);
  const districts = formData.state ? statesDistricts[formData.state] : [];

  const handleInputChange = (field: keyof Coach, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleStepNext = () => {
    // Basic validation before step shifts
    if (currentStep === 1) {
      if (!formData.fullName || !formData.dob || !formData.aadhaarNumber) {
        setErrorMessage('Please fill in Name, DOB, and Aadhaar to proceed.');
        return;
      }
    }
    if (currentStep === 2) {
      if (!formData.address || !formData.city || !formData.state || !formData.district) {
        setErrorMessage('Complete address, state, and district values are mandatory.');
        return;
      }
    }
    if (currentStep === 3) {
      if (!formData.phone || !formData.email) {
        setErrorMessage('Active contact Mobile and Email are mandatory.');
        return;
      }
    }
    if (currentStep === 4) {
      if (!formData.sport || !formData.currentAcademy) {
        setErrorMessage('Please declare your Primary Sport and current training academy.');
        return;
      }
    }

    setErrorMessage('');
    setCurrentStep(prev => prev + 1);
  };

  const handleStepBack = () => {
    setErrorMessage('');
    setCurrentStep(prev => prev - 1);
  };

  const triggerRazorpayCheckout = () => {
    setErrorMessage('');
    // Open our visual fallback payment portal to keep everything 100% reliable inside AI Studio sandboxed iframe!
    setShowPaymentGateway(true);
  };

  // Simulate Razorpay transaction approval
  const handlePaymentSuccess = async () => {
    setPaymentLoading(true);
    
    const paymentId = `pay_mock_${Date.now().toString().substring(5)}`;
    const orderId = `order_CV_${Date.now().toString().substring(7)}`;
    const txId = `txn_${Date.now().toString().substring(6)}`;

    try {
      // 1. Submit coach registration to server
      const savedCoach = await submitCoachRegistration(formData);

      // 2. Record payment audit details
      await recordPayment({
        coachId: savedCoach.id,
        coachName: savedCoach.fullName,
        paymentId,
        orderId,
        transactionId: txId,
        amount: registrationFee,
        status: 'success',
        method: paymentMethod.toUpperCase()
      });

      // 3. Callback
      setPaymentLoading(false);
      setShowPaymentGateway(false);
      onSuccess(savedCoach);
    } catch (err: any) {
      console.error(err);
      setPaymentLoading(false);
      setErrorMessage(err.message || 'Payment success callback failed to save application records.');
    }
  };

  const renderStepIndicator = () => {
    const steps = [
      { num: 1, label: "Identity", icon: User },
      { num: 2, label: "Address", icon: MapPin },
      { num: 3, label: "Contact", icon: Phone },
      { num: 4, label: "Sport Info", icon: Trophy },
      { num: 5, label: "Credentials", icon: Award },
      { num: 6, label: "Triumphs", icon: Sparkles },
      { num: 7, label: "Declaration", icon: FileText }
    ];

    return (
      <div className="flex flex-wrap items-center justify-between gap-2 max-w-4xl mx-auto border-b border-white/5 pb-8 mb-10 text-left">
        {steps.map((s) => {
          const isActive = currentStep === s.num;
          const isCompleted = currentStep > s.num;
          return (
            <div key={s.num} className="flex items-center gap-2">
              <div className={`flex h-8 w-8 items-center justify-center rounded-lg border font-mono text-xs font-bold transition-all ${
                isActive 
                  ? 'bg-blue-600 border-blue-500 text-white'
                  : isCompleted 
                    ? 'bg-emerald-500/20 border-emerald-500 text-emerald-400' 
                    : 'border-white/10 text-slate-500 bg-slate-900'
              }`}>
                {isCompleted ? "✔" : s.num}
              </div>
              <span className={`text-xs font-semibold ${isActive ? 'text-white' : 'text-slate-500'} hidden sm:inline`}>
                {s.label}
              </span>
            </div>
          );
        })}
      </div>
    );
  };

  return (
    <div className="py-16 bg-slate-950 min-h-[calc(100vh-5rem)]">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
        
        {/* Header */}
        <div className="mb-10 text-left">
          <span className="text-[10px] font-mono tracking-widest text-amber-400 uppercase">NATIONAL REGISTER REGISTRY</span>
          <h2 className="text-3xl font-display font-extrabold text-white mt-1">Multi-Step Coach Enrollment</h2>
          <p className="text-sm text-slate-400 mt-2">
            Verify credentials, complete secure digital ID payments, and enter India's active national directory.
          </p>
        </div>

        {/* Multi-step progress bar */}
        {renderStepIndicator()}

        {errorMessage && (
          <div className="mb-6 p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm font-semibold text-left">
            ⚠️ {errorMessage}
          </div>
        )}

        {/* STEP WRAPPER GLASS CONTAINER */}
        <div className="rounded-3xl border border-white/10 glass-premium p-6 sm:p-10 shadow-2xl text-left">
          
          {/* STEP 1: PERSONAL INFORMATION */}
          {currentStep === 1 && (
            <div className="space-y-6">
              <h3 className="text-lg font-bold text-white border-b border-white/5 pb-2">Step 1: Personal & Identity Particulars</h3>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs text-slate-400 font-medium">Coach Full Name (as in Aadhaar) *</label>
                  <input
                    type="text"
                    value={formData.fullName}
                    onChange={(e) => handleInputChange('fullName', e.target.value)}
                    placeholder="Enter full name"
                    className="p-3 rounded-lg bg-slate-900 border border-white/10 text-white text-sm focus:outline-none focus:border-blue-500"
                    required
                  />
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-xs text-slate-400 font-medium">Profile Photo URL</label>
                  <input
                    type="text"
                    value={formData.photo}
                    onChange={(e) => handleInputChange('photo', e.target.value)}
                    placeholder="Enter valid image URL or leave default"
                    className="p-3 rounded-lg bg-slate-900 border border-white/10 text-white text-sm focus:outline-none focus:border-blue-500 font-mono text-xs"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs text-slate-400 font-medium">Gender *</label>
                    <select
                      value={formData.gender}
                      onChange={(e) => handleInputChange('gender', e.target.value)}
                      className="p-3 rounded-lg bg-slate-900 border border-white/10 text-slate-200 text-sm focus:outline-none focus:border-blue-500"
                    >
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs text-slate-400 font-medium">Date of Birth *</label>
                    <input
                      type="date"
                      value={formData.dob}
                      onChange={(e) => handleInputChange('dob', e.target.value)}
                      className="p-3 rounded-lg bg-slate-900 border border-white/10 text-slate-200 text-sm focus:outline-none focus:border-blue-500"
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs text-slate-400 font-medium">Father Name</label>
                    <input
                      type="text"
                      value={formData.fatherName}
                      onChange={(e) => handleInputChange('fatherName', e.target.value)}
                      placeholder="Father's name"
                      className="p-3 rounded-lg bg-slate-900 border border-white/10 text-white text-sm focus:outline-none focus:border-blue-500"
                    />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs text-slate-400 font-medium">Mother Name</label>
                    <input
                      type="text"
                      value={formData.motherName}
                      onChange={(e) => handleInputChange('motherName', e.target.value)}
                      placeholder="Mother's name"
                      className="p-3 rounded-lg bg-slate-900 border border-white/10 text-white text-sm focus:outline-none focus:border-blue-500"
                    />
                  </div>
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-xs text-slate-400 font-medium">Aadhaar National Number *</label>
                  <input
                    type="text"
                    value={formData.aadhaarNumber}
                    onChange={(e) => handleInputChange('aadhaarNumber', e.target.value)}
                    placeholder="Enter 12-digit Aadhaar"
                    maxLength={14}
                    className="p-3 rounded-lg bg-slate-900 border border-white/10 text-white text-sm focus:outline-none focus:border-blue-500 font-mono"
                    required
                  />
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-xs text-slate-400 font-medium">PAN Tax Registration Number</label>
                  <input
                    type="text"
                    value={formData.panNumber}
                    onChange={(e) => handleInputChange('panNumber', e.target.value)}
                    placeholder="PAN number"
                    maxLength={10}
                    className="p-3 rounded-lg bg-slate-900 border border-white/10 text-white text-sm focus:outline-none focus:border-blue-500 uppercase font-mono"
                  />
                </div>
              </div>
            </div>
          )}

          {/* STEP 2: ADDRESS */}
          {currentStep === 2 && (
            <div className="space-y-6">
              <h3 className="text-lg font-bold text-white border-b border-white/5 pb-2">Step 2: State Council Address & Coordinates</h3>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div className="sm:col-span-2 flex flex-col gap-1.5">
                  <label className="text-xs text-slate-400 font-medium">Full Street Address *</label>
                  <input
                    type="text"
                    value={formData.address}
                    onChange={(e) => handleInputChange('address', e.target.value)}
                    placeholder="Street, Phase, Colony etc"
                    className="p-3 rounded-lg bg-slate-900 border border-white/10 text-white text-sm focus:outline-none focus:border-blue-500"
                    required
                  />
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-xs text-slate-400 font-medium">Village / Local Community</label>
                  <input
                    type="text"
                    value={formData.village}
                    onChange={(e) => handleInputChange('village', e.target.value)}
                    placeholder="Enter village if applicable"
                    className="p-3 rounded-lg bg-slate-900 border border-white/10 text-white text-sm"
                  />
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-xs text-slate-400 font-medium">City *</label>
                  <input
                    type="text"
                    value={formData.city}
                    onChange={(e) => handleInputChange('city', e.target.value)}
                    placeholder="City name"
                    className="p-3 rounded-lg bg-slate-900 border border-white/10 text-white text-sm"
                    required
                  />
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-xs text-slate-400 font-medium">State *</label>
                  <select
                    value={formData.state}
                    onChange={(e) => {
                      handleInputChange('state', e.target.value);
                      handleInputChange('district', ''); // Reset district
                    }}
                    className="p-3 rounded-lg bg-slate-900 border border-white/10 text-slate-200 text-sm focus:outline-none focus:border-blue-500"
                    required
                  >
                    <option value="">Select State</option>
                    {states.map(s => <option key={s} value={s}>{s}</option>)}
                  </select>
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-xs text-slate-400 font-medium">District *</label>
                  <select
                    value={formData.district}
                    onChange={(e) => handleInputChange('district', e.target.value)}
                    disabled={!formData.state}
                    className="p-3 rounded-lg bg-slate-900 border border-white/10 text-slate-200 text-sm focus:outline-none focus:border-blue-500 disabled:opacity-50"
                    required
                  >
                    <option value="">Select District</option>
                    {districts.map(d => <option key={d} value={d}>{d}</option>)}
                  </select>
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-xs text-slate-400 font-medium">Pincode *</label>
                  <input
                    type="text"
                    value={formData.pincode}
                    onChange={(e) => handleInputChange('pincode', e.target.value)}
                    placeholder="6 digit PIN"
                    maxLength={6}
                    className="p-3 rounded-lg bg-slate-900 border border-white/10 text-white text-sm font-mono"
                    required
                  />
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-xs text-slate-400 font-medium">Google Maps Academy Location URL</label>
                  <input
                    type="text"
                    value={formData.googleMap}
                    onChange={(e) => handleInputChange('googleMap', e.target.value)}
                    placeholder="Enter maps URL"
                    className="p-3 rounded-lg bg-slate-900 border border-white/10 text-white text-xs font-mono"
                  />
                </div>
              </div>
            </div>
          )}

          {/* STEP 3: CONTACT DETAILS */}
          {currentStep === 3 && (
            <div className="space-y-6">
              <h3 className="text-lg font-bold text-white border-b border-white/5 pb-2">Step 3: Communication & Social Portals</h3>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs text-slate-400 font-medium">Primary Mobile Phone *</label>
                  <input
                    type="text"
                    value={formData.phone}
                    onChange={(e) => handleInputChange('phone', e.target.value)}
                    placeholder="+919876543210"
                    className="p-3 rounded-lg bg-slate-900 border border-white/10 text-white text-sm font-mono"
                    required
                  />
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-xs text-slate-400 font-medium">Active WhatsApp Number *</label>
                  <input
                    type="text"
                    value={formData.whatsapp}
                    onChange={(e) => handleInputChange('whatsapp', e.target.value)}
                    placeholder="+919876543210"
                    className="p-3 rounded-lg bg-slate-900 border border-white/10 text-white text-sm font-mono"
                    required
                  />
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-xs text-slate-400 font-medium">Email Address *</label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    placeholder="coach@domain.com"
                    className="p-3 rounded-lg bg-slate-900 border border-white/10 text-white text-sm"
                    required
                  />
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-xs text-slate-400 font-medium">Website</label>
                  <input
                    type="text"
                    value={formData.website}
                    onChange={(e) => handleInputChange('website', e.target.value)}
                    placeholder="www.academy.com"
                    className="p-3 rounded-lg bg-slate-900 border border-white/10 text-white text-sm font-mono"
                  />
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-xs text-slate-400 font-medium">Instagram Handle</label>
                  <input
                    type="text"
                    value={formData.instagram}
                    onChange={(e) => handleInputChange('instagram', e.target.value)}
                    placeholder="instagram.com/handle"
                    className="p-3 rounded-lg bg-slate-900 border border-white/10 text-white text-sm"
                  />
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-xs text-slate-400 font-medium">LinkedIn URL</label>
                  <input
                    type="text"
                    value={formData.linkedin}
                    onChange={(e) => handleInputChange('linkedin', e.target.value)}
                    placeholder="linkedin.com/in/profile"
                    className="p-3 rounded-lg bg-slate-900 border border-white/10 text-white text-sm"
                  />
                </div>
              </div>
            </div>
          )}

          {/* STEP 4: SPORTS INFORMATION */}
          {currentStep === 4 && (
            <div className="space-y-6">
              <h3 className="text-lg font-bold text-white border-b border-white/5 pb-2">Step 4: Primary Sport Specialties</h3>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs text-slate-400 font-medium">Sporting Discipline *</label>
                  <select
                    value={formData.sport}
                    onChange={(e) => handleInputChange('sport', e.target.value)}
                    className="p-3 rounded-lg bg-slate-900 border border-white/10 text-slate-200 text-sm focus:outline-none"
                    required
                  >
                    <option value="">Select Sport</option>
                    {sports.map(s => <option key={s} value={s}>{s}</option>)}
                  </select>
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-xs text-slate-400 font-medium">Core Tactical Specialization *</label>
                  <input
                    type="text"
                    value={formData.specialization}
                    onChange={(e) => handleInputChange('specialization', e.target.value)}
                    placeholder="e.g. Sprints training, Middle-order batting etc"
                    className="p-3 rounded-lg bg-slate-900 border border-white/10 text-white text-sm"
                    required
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs text-slate-400 font-medium">Playing Experience (Yrs)</label>
                    <input
                      type="number"
                      value={formData.playingExperience}
                      onChange={(e) => handleInputChange('playingExperience', parseInt(e.target.value) || 0)}
                      className="p-3 rounded-lg bg-slate-900 border border-white/10 text-white text-sm font-mono"
                    />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs text-slate-400 font-medium">Coaching Experience (Yrs)</label>
                    <input
                      type="number"
                      value={formData.coachingExperience}
                      onChange={(e) => handleInputChange('coachingExperience', parseInt(e.target.value) || 0)}
                      className="p-3 rounded-lg bg-slate-900 border border-white/10 text-white text-sm font-mono"
                    />
                  </div>
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-xs text-slate-400 font-medium">Current Affiliated Academy *</label>
                  <input
                    type="text"
                    value={formData.currentAcademy}
                    onChange={(e) => handleInputChange('currentAcademy', e.target.value)}
                    placeholder="Enter training school or academy"
                    className="p-3 rounded-lg bg-slate-900 border border-white/10 text-white text-sm"
                    required
                  />
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-xs text-slate-400 font-medium">Previous Affiliated Academy</label>
                  <input
                    type="text"
                    value={formData.previousAcademy}
                    onChange={(e) => handleInputChange('previousAcademy', e.target.value)}
                    placeholder="Previous organization"
                    className="p-3 rounded-lg bg-slate-900 border border-white/10 text-white text-sm"
                  />
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-xs text-slate-400 font-medium">Professional Designation</label>
                  <input
                    type="text"
                    value={formData.designation}
                    onChange={(e) => handleInputChange('designation', e.target.value)}
                    placeholder="e.g. Senior Instructor, Academy Director"
                    className="p-3 rounded-lg bg-slate-900 border border-white/10 text-white text-sm"
                  />
                </div>
              </div>
            </div>
          )}

          {/* STEP 5: EDUCATION & CERTIFICATES */}
          {currentStep === 5 && (
            <div className="space-y-6">
              <h3 className="text-lg font-bold text-white border-b border-white/5 pb-2">Step 5: Professional Educational Accreditation</h3>
              
              <div className="grid grid-cols-1 gap-5">
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs text-slate-400 font-medium">Highest Academic Qualification</label>
                  <input
                    type="text"
                    value={formData.highestQualification}
                    onChange={(e) => handleInputChange('highestQualification', e.target.value)}
                    placeholder="PhD, M.P.Ed, B.P.Ed, High School"
                    className="p-3 rounded-lg bg-slate-900 border border-white/10 text-white text-sm"
                  />
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-xs text-slate-400 font-medium">National Sports Licensing / SAI Accreditations</label>
                  <input
                    type="text"
                    value={formData.sportsQualification}
                    onChange={(e) => handleInputChange('sportsQualification', e.target.value)}
                    placeholder="SAI Coach A-Licence / National Federation Certification"
                    className="p-3 rounded-lg bg-slate-900 border border-white/10 text-white text-sm"
                  />
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-xs text-slate-400 font-medium">Coaching Certifications (e.g., NIS Diploma)</label>
                  <input
                    type="text"
                    value={formData.coachingQualification}
                    onChange={(e) => handleInputChange('coachingQualification', e.target.value)}
                    placeholder="NIS Diploma, FIFA-B License, BWF Coach-1 etc"
                    className="p-3 rounded-lg bg-slate-900 border border-white/10 text-white text-sm"
                  />
                </div>

                <div className="p-4 rounded-xl border border-dashed border-white/10 bg-slate-950 text-center space-y-2">
                  <p className="text-xs text-slate-400">PDF / Images Certifications Uplink</p>
                  <span className="text-[10px] font-mono text-emerald-400 block bg-emerald-500/10 py-1.5 rounded max-w-sm mx-auto">
                    ✔ Simulated certificates uploaded: {formData.certificates?.join(', ')}
                  </span>
                </div>
              </div>
            </div>
          )}

          {/* STEP 6: TRIUMPHS & MEDALS */}
          {currentStep === 6 && (
            <div className="space-y-6">
              <h3 className="text-lg font-bold text-white border-b border-white/5 pb-2">Step 6: Career Milestones & Student Triumphs</h3>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs text-slate-400 font-medium">National Playing / Coaching Participation</label>
                  <input
                    type="text"
                    value={formData.nationalParticipation}
                    onChange={(e) => handleInputChange('nationalParticipation', e.target.value)}
                    placeholder="Represented states or won medals in National Games"
                    className="p-3 rounded-lg bg-slate-900 border border-white/10 text-white text-sm"
                  />
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-xs text-slate-400 font-medium">International Representation</label>
                  <input
                    type="text"
                    value={formData.internationalParticipation}
                    onChange={(e) => handleInputChange('internationalParticipation', e.target.value)}
                    className="p-3 rounded-lg bg-slate-900 border border-white/10 text-white text-sm"
                  />
                </div>

                <div className="sm:col-span-2 flex flex-col gap-1.5">
                  <label className="text-xs text-slate-400 font-medium">Biography & Training Mission Statement *</label>
                  <textarea
                    value={formData.biography}
                    onChange={(e) => handleInputChange('biography', e.target.value)}
                    rows={4}
                    placeholder="Introduce yourself to athletes. Share your coaching philosophies and special mechanical drills."
                    className="p-3 rounded-lg bg-slate-900 border border-white/10 text-white text-sm focus:outline-none"
                    required
                  />
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-xs text-slate-400 font-medium">Awards & Citations</label>
                  <input
                    type="text"
                    value={formData.awards}
                    onChange={(e) => handleInputChange('awards', e.target.value)}
                    placeholder="e.g. State Coach of Year"
                    className="p-3 rounded-lg bg-slate-900 border border-white/10 text-white text-sm"
                  />
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-xs text-slate-400 font-medium">Student Performance Milestones</label>
                  <input
                    type="text"
                    value={formData.studentAchievements}
                    onChange={(e) => handleInputChange('studentAchievements', e.target.value)}
                    placeholder="Podiums secured by your trained students"
                    className="p-3 rounded-lg bg-slate-900 border border-white/10 text-white text-sm"
                  />
                </div>
              </div>
            </div>
          )}

          {/* STEP 7: DECLARATION & PAYMENT LOCK */}
          {currentStep === 7 && (
            <div className="space-y-6">
              <h3 className="text-lg font-bold text-white border-b border-white/5 pb-2">Step 7: Legal Consent & Payment Lock</h3>
              
              <div className="p-5 bg-slate-950 rounded-2xl border border-white/5 space-y-4">
                <h4 className="text-sm font-semibold text-white">Declaration & Terms of Integrity</h4>
                <p className="text-xs text-slate-400 leading-relaxed">
                  I hereby solemnly state that all coaching certificates, academic diplomas, and identity cards provided herein are 100% authentic. 
                  Any discrepancy found during administrative review will result in profile rejection without refunds.
                </p>

                <div className="flex items-start gap-3 pt-2">
                  <input
                    type="checkbox"
                    id="declareCheck"
                    className="rounded border-white/10 text-blue-600 focus:ring-blue-500 h-5 w-5 bg-slate-900 mt-0.5"
                    required
                  />
                  <label htmlFor="declareCheck" className="text-xs text-slate-300 font-medium cursor-pointer">
                    I agree to the Terms & Conditions, Privacy Policy, and Refund Rules of CoachVerify.in National Portal. *
                  </label>
                </div>
              </div>

              {/* Payment Summary Box */}
              <div className="p-6 bg-gradient-to-br from-slate-900 to-slate-950 rounded-3xl border border-amber-500/20 flex flex-col sm:flex-row justify-between items-center gap-4">
                <div className="text-left space-y-1">
                  <span className="text-[10px] font-mono tracking-widest text-amber-400 uppercase">AUDITED CHARGES</span>
                  <p className="text-lg font-extrabold text-white">Verification & Digital ID Card Fee</p>
                  <p className="text-xs text-slate-400">One-time registration. Permanent profile presence.</p>
                </div>

                <div className="text-center sm:text-right">
                  <span className="text-3xl font-display font-black text-amber-400">₹{registrationFee}</span>
                  <span className="text-slate-500 text-[10px] block font-mono">GST INCLUDED</span>
                </div>
              </div>
            </div>
          )}

          {/* CONTROL NAVIGATION BUTTONS */}
          <div className="mt-8 pt-6 border-t border-white/5 flex justify-between items-center">
            {currentStep > 1 ? (
              <button
                onClick={handleStepBack}
                className="px-6 py-2.5 rounded-xl border border-white/10 hover:bg-white/5 text-xs font-semibold text-slate-300 transition-all cursor-pointer"
              >
                Back Step
              </button>
            ) : (
              <div />
            )}

            {currentStep < 7 ? (
              <button
                onClick={handleStepNext}
                className="px-7 py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-xs font-bold text-white shadow-lg transition-all cursor-pointer"
              >
                Continue Next
              </button>
            ) : (
              <button
                onClick={triggerRazorpayCheckout}
                className="flex items-center gap-2 px-8 py-3.5 rounded-xl bg-gradient-to-r from-blue-500 via-amber-400 to-amber-500 text-xs font-bold text-slate-950 shadow-xl transition-all cursor-pointer"
              >
                <ShieldCheck className="h-4.5 w-4.5" />
                Pay & Submit Application
              </button>
            )}
          </div>

        </div>

      </div>

      {/* RAZORPAY MULTI-CHANNEL INTERACTIVE GATEWAY POPUP FALLBACK */}
      <AnimatePresence>
        {showPaymentGateway && (
          <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/85 backdrop-blur-md flex items-center justify-center p-4">
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="relative w-full max-w-md bg-slate-900 border border-amber-500/30 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6 text-left"
            >
              {/* Header */}
              <div className="flex justify-between items-start">
                <div className="flex items-center gap-2">
                  <div className="h-8 w-8 bg-blue-600 rounded-lg flex items-center justify-center text-white font-black text-sm">
                    R
                  </div>
                  <div className="text-left">
                    <span className="text-[9px] font-mono text-slate-500 tracking-wider block">RAZORPAY CHECKOUT</span>
                    <h4 className="text-sm font-black text-white">CoachVerify.in Payments</h4>
                  </div>
                </div>
                
                <button 
                  onClick={() => setShowPaymentGateway(false)}
                  className="p-1 text-slate-400 hover:text-white rounded"
                >
                  ✕
                </button>
              </div>

              {/* Amount Display */}
              <div className="bg-slate-950 p-4 rounded-xl border border-white/5 flex justify-between items-center">
                <span className="text-xs text-slate-400">Total Amount:</span>
                <span className="text-xl font-display font-black text-amber-400">₹{registrationFee}.00</span>
              </div>

              {/* Payment Method Selector */}
              <div className="space-y-2">
                <span className="text-[10px] font-mono uppercase text-slate-500">SELECT PAYMENT MODE</span>
                <div className="grid grid-cols-3 gap-2">
                  <button
                    onClick={() => setPaymentMethod('upi')}
                    className={`p-3 rounded-xl border text-center transition-all ${
                      paymentMethod === 'upi' ? 'bg-blue-600/10 border-blue-500 text-blue-400' : 'bg-slate-950 border-white/5 text-slate-400'
                    }`}
                  >
                    <span className="text-xs font-bold block">UPI / GPay</span>
                  </button>
                  <button
                    onClick={() => setPaymentMethod('card')}
                    className={`p-3 rounded-xl border text-center transition-all ${
                      paymentMethod === 'card' ? 'bg-blue-600/10 border-blue-500 text-blue-400' : 'bg-slate-950 border-white/5 text-slate-400'
                    }`}
                  >
                    <span className="text-xs font-bold block">Cards</span>
                  </button>
                  <button
                    onClick={() => setPaymentMethod('netbanking')}
                    className={`p-3 rounded-xl border text-center transition-all ${
                      paymentMethod === 'netbanking' ? 'bg-blue-600/10 border-blue-500 text-blue-400' : 'bg-slate-950 border-white/5 text-slate-400'
                    }`}
                  >
                    <span className="text-xs font-bold block">Net Banking</span>
                  </button>
                </div>
              </div>

              {/* Dynamic Sub-fields */}
              <div className="bg-slate-950 p-4 rounded-xl border border-white/5">
                {paymentMethod === 'upi' && (
                  <div className="flex flex-col gap-1.5 text-left">
                    <label className="text-[10px] text-slate-400 uppercase font-mono">Enter UPI ID</label>
                    <input
                      type="text"
                      value={upiId}
                      onChange={(e) => setUpiId(e.target.value)}
                      className="p-2.5 rounded bg-slate-900 border border-white/10 text-white font-mono text-xs focus:outline-none"
                    />
                  </div>
                )}

                {paymentMethod === 'card' && (
                  <div className="space-y-3">
                    <div className="flex flex-col gap-1.5 text-left">
                      <label className="text-[10px] text-slate-400 uppercase font-mono">Card Number</label>
                      <input
                        type="text"
                        value={cardNumber}
                        onChange={(e) => setCardNumber(e.target.value)}
                        className="p-2.5 rounded bg-slate-900 border border-white/10 text-white font-mono text-xs focus:outline-none"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      <input type="text" placeholder="MM/YY" className="p-2.5 rounded bg-slate-900 border border-white/10 text-white text-xs text-center" />
                      <input type="password" placeholder="CVV" className="p-2.5 rounded bg-slate-900 border border-white/10 text-white text-xs text-center" />
                    </div>
                  </div>
                )}

                {paymentMethod === 'netbanking' && (
                  <div className="flex flex-col gap-1.5 text-left">
                    <label className="text-[10px] text-slate-400 uppercase font-mono">Select Bank</label>
                    <select className="p-2.5 rounded bg-slate-900 border border-white/10 text-slate-300 text-xs">
                      <option>State Bank of India (SBI)</option>
                      <option>HDFC Bank</option>
                      <option>ICICI Bank</option>
                      <option>Axis Bank</option>
                    </select>
                  </div>
                )}
              </div>

              {/* Secure note */}
              <p className="text-[10px] text-slate-500 font-mono text-center flex items-center justify-center gap-1">
                <CreditCard className="h-3 w-3" /> Secured by Razorpay Standard 256-Bit SSL Encryption.
              </p>

              {/* Action */}
              <button
                onClick={handlePaymentSuccess}
                disabled={paymentLoading}
                className="w-full flex items-center justify-center gap-2 py-3.5 bg-gradient-to-r from-blue-500 to-amber-500 hover:from-blue-600 hover:to-amber-600 text-slate-950 text-xs font-black rounded-xl transition-all shadow-lg cursor-pointer disabled:opacity-50"
              >
                {paymentLoading ? (
                  <>
                    <Loader2 className="h-4.5 w-4.5 animate-spin" />
                    Recording Enrollment...
                  </>
                ) : (
                  <>
                    ✔ Pay ₹{registrationFee} & Complete Submission
                  </>
                )}
              </button>

            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
