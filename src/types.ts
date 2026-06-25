/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface Review {
  id: string;
  coachId: string;
  studentName: string;
  rating: number;
  reviewText: string;
  createdAt: string;
  isApproved: boolean;
}

export interface AthletePerformance {
  id: string;
  athleteName: string;
  sport: string;
  metrics: {
    speed: number;      // out of 100
    stamina: number;    // out of 100
    strength: number;   // out of 100
    skill: number;      // out of 100
    discipline: number; // out of 100
  };
  progressHistory: {
    date: string;
    overallScore: number;
    notes: string;
  }[];
  notes: string;
  createdAt: string;
}

export interface Coach {
  id: string;
  registrationNumber: string;
  coachId: string;
  photo: string;
  fullName: string;
  fatherName: string;
  motherName: string;
  gender: string;
  dob: string;
  bloodGroup: string;
  nationality: string;
  aadhaarNumber: string;
  panNumber: string;
  address: string;
  village?: string;
  city: string;
  district: string;
  state: string;
  pincode: string;
  sport: string;
  specialization: string;
  playingExperience: number;
  coachingExperience: number;
  highestQualification: string;
  sportsQualification: string;
  coachingQualification: string; // NIS, SAI, University, etc.
  currentAcademy: string;
  previousAcademy?: string;
  designation: string;
  biography: string;
  achievements: string;
  awards: string;
  nationalParticipation: string;
  internationalParticipation: string;
  certificates: string[];
  gallery: string[];
  videos: string[];
  studentAchievements: string;
  languages: string[];
  ageGroups: string[];
  phone: string;
  whatsapp: string;
  email: string;
  website?: string;
  instagram?: string;
  facebook?: string;
  linkedin?: string;
  youtube?: string;
  googleMap?: string;
  qrCode: string;
  isVerified: boolean;
  status: 'pending' | 'approved' | 'rejected' | 'correction';
  correctionNotes?: string;
  averageRating: number;
  totalReviews: number;
  featured: boolean;
  athleteMetrics?: AthletePerformance[];
  createdAt: string;
}

export interface Academy {
  id: string;
  name: string;
  logo: string;
  photos: string[];
  address: string;
  district: string;
  state: string;
  ownerName: string;
  headCoach: string;
  sportsAvailable: string[];
  googleMap?: string;
  gallery: string[];
  studentAchievements: string;
  website?: string;
  instagram?: string;
  facebook?: string;
  whatsapp: string;
  contactNumber: string;
  isVerified: boolean;
  createdAt: string;
}

export interface Tournament {
  id: string;
  title: string;
  level: 'National' | 'State' | 'District' | 'School Games' | 'CBSE' | 'Khelo India' | 'SGFI';
  venue: string;
  date: string;
  organizer: string;
  registrationLink: string;
  brochureUrl: string;
  sport: string;
  description: string;
  isUpcoming: boolean;
  createdAt: string;
}

export interface JobVacancy {
  id: string;
  title: string;
  organizationName: string; // School, College, Academy, etc.
  organizationType: 'School' | 'College' | 'University' | 'Academy' | 'Sports Club';
  sport: string;
  location: string;
  salaryRange: string;
  experienceRequired: number;
  description: string;
  requirements: string[];
  contactEmail: string;
  isVerifiedOrganization: boolean;
  createdAt: string;
}

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  category: 'Coaching Tips' | 'Fitness' | 'Sports News' | 'Career Guidance' | 'Nutrition' | 'Rules Updates';
  summary: string;
  content: string;
  coverImage: string;
  author: string;
  authorRole: string;
  tags: string[];
  createdAt: string;
}

export interface ContactMessage {
  id: string;
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
  createdAt: string;
}

export interface PaymentDetails {
  id: string;
  coachId: string;
  coachName: string;
  paymentId: string;
  orderId: string;
  transactionId: string;
  amount: number;
  status: 'success' | 'failed' | 'pending';
  method: string;
  paymentDate: string;
}

export interface SystemStats {
  registeredCoaches: number;
  verifiedCoaches: number;
  sportsCount: number;
  statesCount: number;
  districtsCount: number;
  academiesCount: number;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  rating: number;
  comment: string;
}

