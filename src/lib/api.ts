/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Coach, Academy, Tournament, JobVacancy, BlogPost, ContactMessage, PaymentDetails, Review, SystemStats } from '../types';

const API_BASE = '/api';

export async function fetchSearchMeta() {
  const res = await fetch(`${API_BASE}/search-meta`);
  if (!res.ok) throw new Error('Failed to fetch search metadata');
  return res.json() as Promise<{
    sports: string[];
    statesDistricts: { [key: string]: string[] };
    adminSettings: { registrationFee: number; paymentGatewayEnabled: boolean };
  }>;
}

export async function fetchCoaches() {
  const res = await fetch(`${API_BASE}/coaches`);
  if (!res.ok) throw new Error('Failed to fetch coaches');
  return res.json() as Promise<Coach[]>;
}

export async function fetchCoachById(id: string) {
  const res = await fetch(`${API_BASE}/coaches/${id}`);
  if (!res.ok) throw new Error('Failed to fetch coach profile');
  return res.json() as Promise<Coach>;
}

export async function submitCoachRegistration(coachData: Partial<Coach>) {
  const res = await fetch(`${API_BASE}/coaches`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(coachData)
  });
  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.error || 'Failed to register coach');
  }
  return res.json() as Promise<Coach>;
}

export async function updateCoachProfile(id: string, updates: Partial<Coach>) {
  const res = await fetch(`${API_BASE}/coaches/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(updates)
  });
  if (!res.ok) throw new Error('Failed to update coach profile');
  return res.json() as Promise<Coach>;
}

export async function deleteCoachProfile(id: string) {
  const res = await fetch(`${API_BASE}/coaches/${id}`, {
    method: 'DELETE'
  });
  if (!res.ok) throw new Error('Failed to delete coach');
  return res.json() as Promise<{ message: string }>;
}

export async function addAthleteToCoach(coachId: string, athleteData: { athleteName: string; notes?: string; metrics?: any }) {
  const res = await fetch(`${API_BASE}/coaches/${coachId}/athletes`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(athleteData)
  });
  if (!res.ok) throw new Error('Failed to add athlete');
  return res.json() as Promise<Coach>;
}

export async function updateAthleteMetrics(coachId: string, athleteId: string, payload: { metrics: any; notes?: string; historyNotes?: string }) {
  const res = await fetch(`${API_BASE}/coaches/${coachId}/athletes/${athleteId}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload)
  });
  if (!res.ok) throw new Error('Failed to update athlete metrics');
  return res.json() as Promise<Coach>;
}

export async function fetchAcademies() {
  const res = await fetch(`${API_BASE}/academies`);
  if (!res.ok) throw new Error('Failed to fetch academies');
  return res.json() as Promise<Academy[]>;
}

export async function createAcademy(academyData: Partial<Academy>) {
  const res = await fetch(`${API_BASE}/academies`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(academyData)
  });
  if (!res.ok) throw new Error('Failed to create academy');
  return res.json() as Promise<Academy>;
}

export async function fetchTournaments() {
  const res = await fetch(`${API_BASE}/tournaments`);
  if (!res.ok) throw new Error('Failed to fetch tournaments');
  return res.json() as Promise<Tournament[]>;
}

export async function createTournament(tournData: Partial<Tournament>) {
  const res = await fetch(`${API_BASE}/tournaments`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(tournData)
  });
  if (!res.ok) throw new Error('Failed to create tournament');
  return res.json() as Promise<Tournament>;
}

export async function fetchJobs() {
  const res = await fetch(`${API_BASE}/jobs`);
  if (!res.ok) throw new Error('Failed to fetch jobs');
  return res.json() as Promise<JobVacancy[]>;
}

export async function createJobVacancy(jobData: Partial<JobVacancy>) {
  const res = await fetch(`${API_BASE}/jobs`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(jobData)
  });
  if (!res.ok) throw new Error('Failed to create job vacancy');
  return res.json() as Promise<JobVacancy>;
}

export async function fetchBlogs() {
  const res = await fetch(`${API_BASE}/blogs`);
  if (!res.ok) throw new Error('Failed to fetch blogs');
  return res.json() as Promise<BlogPost[]>;
}

export async function fetchTestimonials() {
  const res = await fetch(`${API_BASE}/testimonials`);
  if (!res.ok) throw new Error('Failed to fetch testimonials');
  return res.json() as Promise<any[]>;
}

export async function fetchAdminSettings() {
  const res = await fetch(`${API_BASE}/admin/settings`);
  if (!res.ok) throw new Error('Failed to fetch admin settings');
  return res.json() as Promise<{ registrationFee: number; paymentGatewayEnabled: boolean }>;
}

export async function updateAdminSettings(settings: { registrationFee: number; paymentGatewayEnabled: boolean }) {
  const res = await fetch(`${API_BASE}/admin/settings`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(settings)
  });
  if (!res.ok) throw new Error('Failed to update admin settings');
  return res.json() as Promise<{ registrationFee: number; paymentGatewayEnabled: boolean }>;
}

export async function recordPayment(paymentData: Partial<PaymentDetails>) {
  const res = await fetch(`${API_BASE}/payments`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(paymentData)
  });
  if (!res.ok) throw new Error('Failed to record payment');
  return res.json() as Promise<PaymentDetails>;
}

export async function fetchAllPayments() {
  const res = await fetch(`${API_BASE}/payments`);
  if (!res.ok) throw new Error('Failed to fetch payments');
  return res.json() as Promise<PaymentDetails[]>;
}

export async function submitContactMessage(msg: Partial<ContactMessage>) {
  const res = await fetch(`${API_BASE}/contact`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(msg)
  });
  if (!res.ok) throw new Error('Failed to submit contact message');
  return res.json() as Promise<ContactMessage>;
}

export async function fetchContactMessages() {
  const res = await fetch(`${API_BASE}/contact`);
  if (!res.ok) throw new Error('Failed to fetch contact messages');
  return res.json() as Promise<ContactMessage[]>;
}

export async function fetchAllReviews() {
  const res = await fetch(`${API_BASE}/reviews`);
  if (!res.ok) throw new Error('Failed to fetch reviews');
  return res.json() as Promise<Review[]>;
}

export async function fetchApprovedReviews(coachId: string) {
  const res = await fetch(`${API_BASE}/reviews/${coachId}`);
  if (!res.ok) throw new Error('Failed to fetch reviews for coach');
  return res.json() as Promise<Review[]>;
}

export async function submitReview(reviewData: { coachId: string; studentName: string; rating: number; reviewText: string }) {
  const res = await fetch(`${API_BASE}/reviews`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(reviewData)
  });
  if (!res.ok) throw new Error('Failed to submit review');
  return res.json() as Promise<Review>;
}

export async function approveReview(id: string) {
  const res = await fetch(`${API_BASE}/reviews/${id}/approve`, {
    method: 'PUT'
  });
  if (!res.ok) throw new Error('Failed to approve review');
  return res.json() as Promise<Review>;
}

export async function deleteReview(id: string) {
  const res = await fetch(`${API_BASE}/reviews/${id}`, {
    method: 'DELETE'
  });
  if (!res.ok) throw new Error('Failed to delete review');
  return res.json() as Promise<{ message: string }>;
}
