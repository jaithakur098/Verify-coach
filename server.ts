/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import express from 'express';
import path from 'path';
import fs from 'fs';
import { createServer as createViteServer } from 'vite';
import { generateSeedData } from './server_seed';
import { Coach, Academy, Tournament, JobVacancy, BlogPost, ContactMessage, PaymentDetails, Review, AthletePerformance } from './src/types';

const PORT = 3000;
const DB_FILE = path.join(process.cwd(), 'server_db.json');

// Interface for database structure
interface DbSchema {
  coaches: Coach[];
  academies: Academy[];
  tournaments: Tournament[];
  jobs: JobVacancy[];
  blogs: BlogPost[];
  testimonials: any[];
  sports: string[];
  statesDistricts: { [key: string]: string[] };
  adminSettings: {
    registrationFee: number;
    paymentGatewayEnabled: boolean;
  };
  payments: PaymentDetails[];
  reviews: Review[];
  contactMessages: ContactMessage[];
}

let db: DbSchema;

// Load or generate initial database
function loadDatabase() {
  try {
    if (fs.existsSync(DB_FILE)) {
      console.log('Loading database from file...');
      const data = fs.readFileSync(DB_FILE, 'utf-8');
      db = JSON.parse(data);
    } else {
      console.log('Database file not found. Generating fresh seed data...');
      db = generateSeedData();
      saveDatabase();
    }
  } catch (error) {
    console.error('Error loading database, regenerating fallback data:', error);
    db = generateSeedData();
    saveDatabase();
  }
}

function saveDatabase() {
  try {
    fs.writeFileSync(DB_FILE, JSON.stringify(db, null, 2), 'utf-8');
    console.log('Database saved successfully.');
  } catch (error) {
    console.error('Error saving database to file:', error);
  }
}

async function startServer() {
  loadDatabase();

  const app = express();
  app.use(express.json({ limit: '50mb' }));

  // API - SEARCH META
  app.get('/api/search-meta', (req, res) => {
    res.json({
      sports: db.sports,
      statesDistricts: db.statesDistricts,
      adminSettings: db.adminSettings
    });
  });

  // API - COACHES CRUD
  app.get('/api/coaches', (req, res) => {
    // Return all coaches
    res.json(db.coaches);
  });

  app.get('/api/coaches/:id', (req, res) => {
    const coach = db.coaches.find(c => c.id === req.params.id || c.registrationNumber === req.params.id);
    if (!coach) {
      return res.status(404).json({ error: 'Coach not found' });
    }
    res.json(coach);
  });

  // Register or apply as coach
  app.post('/api/coaches', (req, res) => {
    const coachData = req.body;
    
    // Check for duplicate aadhaar or phone
    const duplicate = db.coaches.find(c => c.aadhaarNumber === coachData.aadhaarNumber || c.phone === coachData.phone);
    if (duplicate && coachData.aadhaarNumber) {
      return res.status(400).json({ error: 'A coach with this Aadhaar or Mobile number is already registered.' });
    }

    const newIndex = db.coaches.length;
    const regNum = `CV-2026-R${1000 + newIndex}`;
    const cleanSport = coachData.sport || 'General';
    const coachId = `CV-IND-${cleanSport.substring(0, 3).toUpperCase()}-${2000 + newIndex}`;

    const newCoach: Coach = {
      ...coachData,
      id: `coach-${1000 + newIndex}`,
      registrationNumber: regNum,
      coachId,
      qrCode: `https://api.qrserver.com/v1/create-qr-code/?size=250x250&data=${encodeURIComponent("https://coachverify.in/verify/" + regNum)}`,
      isVerified: false,
      status: 'pending',
      averageRating: 0,
      totalReviews: 0,
      featured: false,
      athleteMetrics: [],
      createdAt: new Date().toISOString()
    };

    db.coaches.unshift(newCoach); // Put latest on top
    saveDatabase();
    res.status(201).json(newCoach);
  });

  // Update a coach profile or approval status
  app.put('/api/coaches/:id', (req, res) => {
    const coachIndex = db.coaches.findIndex(c => c.id === req.params.id || c.registrationNumber === req.params.id);
    if (coachIndex === -1) {
      return res.status(404).json({ error: 'Coach not found' });
    }

    const updatedCoach = {
      ...db.coaches[coachIndex],
      ...req.body
    };

    // If approved, verify the coach
    if (updatedCoach.status === 'approved') {
      updatedCoach.isVerified = true;
    } else {
      updatedCoach.isVerified = false;
    }

    db.coaches[coachIndex] = updatedCoach;
    saveDatabase();
    res.json(updatedCoach);
  });

  // POST /api/coaches/:id/athletes - Create or update performance metrics
  app.post('/api/coaches/:id/athletes', (req, res) => {
    const coachIndex = db.coaches.findIndex(c => c.id === req.params.id || c.registrationNumber === req.params.id);
    if (coachIndex === -1) {
      return res.status(404).json({ error: 'Coach not found' });
    }

    const coach = db.coaches[coachIndex];
    if (!coach.athleteMetrics) {
      coach.athleteMetrics = [];
    }

    const newAthlete: AthletePerformance = {
      id: `ath-${Date.now()}`,
      athleteName: req.body.athleteName,
      sport: coach.sport,
      metrics: req.body.metrics || { speed: 80, stamina: 80, strength: 80, skill: 80, discipline: 80 },
      progressHistory: [
        {
          date: new Date().toISOString().split('T')[0],
          overallScore: Math.round(
            ((req.body.metrics?.speed || 80) + 
             (req.body.metrics?.stamina || 80) + 
             (req.body.metrics?.strength || 80) + 
             (req.body.metrics?.skill || 80) + 
             (req.body.metrics?.discipline || 80)) / 5
          ),
          notes: 'Initial performance score logged.'
        }
      ],
      notes: req.body.notes || 'No notes added.',
      createdAt: new Date().toISOString()
    };

    coach.athleteMetrics.unshift(newAthlete);
    db.coaches[coachIndex] = coach;
    saveDatabase();
    res.json(coach);
  });

  // PUT /api/coaches/:id/athletes/:athleteId - Update athlete metrics
  app.put('/api/coaches/:id/athletes/:athleteId', (req, res) => {
    const coachIndex = db.coaches.findIndex(c => c.id === req.params.id || c.registrationNumber === req.params.id);
    if (coachIndex === -1) {
      return res.status(404).json({ error: 'Coach not found' });
    }

    const coach = db.coaches[coachIndex];
    if (!coach.athleteMetrics) {
      return res.status(404).json({ error: 'No athlete logs found' });
    }

    const athleteIndex = coach.athleteMetrics.findIndex(a => a.id === req.params.athleteId);
    if (athleteIndex === -1) {
      return res.status(404).json({ error: 'Athlete log not found' });
    }

    const currentAthlete = coach.athleteMetrics[athleteIndex];
    const newMetrics = req.body.metrics || currentAthlete.metrics;
    const overallScore = Math.round(
      (newMetrics.speed + newMetrics.stamina + newMetrics.strength + newMetrics.skill + newMetrics.discipline) / 5
    );

    currentAthlete.metrics = newMetrics;
    currentAthlete.notes = req.body.notes || currentAthlete.notes;
    
    // Add to progress history
    currentAthlete.progressHistory.push({
      date: new Date().toISOString().split('T')[0],
      overallScore,
      notes: req.body.historyNotes || 'Periodic progress tracking update.'
    });

    coach.athleteMetrics[athleteIndex] = currentAthlete;
    db.coaches[coachIndex] = coach;
    saveDatabase();
    res.json(coach);
  });

  app.delete('/api/coaches/:id', (req, res) => {
    const coachIndex = db.coaches.findIndex(c => c.id === req.params.id || c.registrationNumber === req.params.id);
    if (coachIndex === -1) {
      return res.status(404).json({ error: 'Coach not found' });
    }

    db.coaches.splice(coachIndex, 1);
    saveDatabase();
    res.json({ message: 'Coach deleted successfully' });
  });

  // API - ACADEMIES CRUD
  app.get('/api/academies', (req, res) => {
    res.json(db.academies);
  });

  app.post('/api/academies', (req, res) => {
    const newAcademy: Academy = {
      ...req.body,
      id: `acad-${Date.now()}`,
      isVerified: true, // Auto-verify seeded/registered academies for simplicity
      createdAt: new Date().toISOString()
    };
    db.academies.unshift(newAcademy);
    saveDatabase();
    res.status(201).json(newAcademy);
  });

  // API - TOURNAMENTS CRUD
  app.get('/api/tournaments', (req, res) => {
    res.json(db.tournaments);
  });

  app.post('/api/tournaments', (req, res) => {
    const newTourn: Tournament = {
      ...req.body,
      id: `tourn-${Date.now()}`,
      isUpcoming: true,
      createdAt: new Date().toISOString()
    };
    db.tournaments.unshift(newTourn);
    saveDatabase();
    res.status(201).json(newTourn);
  });

  // API - SPORTS JOBS CRUD
  app.get('/api/jobs', (req, res) => {
    res.json(db.jobs);
  });

  app.post('/api/jobs', (req, res) => {
    const newJob: JobVacancy = {
      ...req.body,
      id: `job-${Date.now()}`,
      isVerifiedOrganization: true,
      createdAt: new Date().toISOString()
    };
    db.jobs.unshift(newJob);
    saveDatabase();
    res.status(201).json(newJob);
  });

  // API - BLOGS CRUD
  app.get('/api/blogs', (req, res) => {
    res.json(db.blogs);
  });

  // API - TESTIMONIALS
  app.get('/api/testimonials', (req, res) => {
    res.json(db.testimonials);
  });

  // API - ADMIN SETTINGS
  app.get('/api/admin/settings', (req, res) => {
    res.json(db.adminSettings);
  });

  app.post('/api/admin/settings', (req, res) => {
    db.adminSettings = {
      ...db.adminSettings,
      ...req.body
    };
    saveDatabase();
    res.json(db.adminSettings);
  });

  // API - PAYMENTS CRUD
  app.post('/api/payments', (req, res) => {
    const payment: PaymentDetails = {
      id: `pay-${Date.now()}`,
      ...req.body,
      paymentDate: new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })
    };
    db.payments.unshift(payment);
    saveDatabase();
    res.status(201).json(payment);
  });

  app.get('/api/payments', (req, res) => {
    res.json(db.payments);
  });

  // API - REVIEWS CRUD
  app.get('/api/reviews', (req, res) => {
    res.json(db.reviews);
  });

  app.get('/api/reviews/:coachId', (req, res) => {
    const approvedReviews = db.reviews.filter(r => r.coachId === req.params.coachId && r.isApproved);
    res.json(approvedReviews);
  });

  app.post('/api/reviews', (req, res) => {
    const newReview: Review = {
      id: `rev-${Date.now()}`,
      coachId: req.body.coachId,
      studentName: req.body.studentName,
      rating: parseInt(req.body.rating) || 5,
      reviewText: req.body.reviewText,
      createdAt: new Date().toISOString(),
      isApproved: false // Requires admin moderation
    };
    db.reviews.unshift(newReview);
    saveDatabase();
    res.status(201).json(newReview);
  });

  app.put('/api/reviews/:id/approve', (req, res) => {
    const index = db.reviews.findIndex(r => r.id === req.params.id);
    if (index === -1) {
      return res.status(404).json({ error: 'Review not found' });
    }
    db.reviews[index].isApproved = true;

    // Recalculate average rating for the coach
    const coachId = db.reviews[index].coachId;
    const coachReviews = db.reviews.filter(r => r.coachId === coachId && r.isApproved);
    const sum = coachReviews.reduce((acc, curr) => acc + curr.rating, 0);
    const avg = coachReviews.length > 0 ? parseFloat((sum / coachReviews.length).toFixed(1)) : 5.0;

    const coachIndex = db.coaches.findIndex(c => c.id === coachId || c.registrationNumber === coachId);
    if (coachIndex !== -1) {
      db.coaches[coachIndex].averageRating = avg;
      db.coaches[coachIndex].totalReviews = coachReviews.length;
    }

    saveDatabase();
    res.json(db.reviews[index]);
  });

  app.delete('/api/reviews/:id', (req, res) => {
    const index = db.reviews.findIndex(r => r.id === req.params.id);
    if (index === -1) {
      return res.status(404).json({ error: 'Review not found' });
    }
    const coachId = db.reviews[index].coachId;
    db.reviews.splice(index, 1);

    // Recalculate coach ratings
    const coachReviews = db.reviews.filter(r => r.coachId === coachId && r.isApproved);
    const sum = coachReviews.reduce((acc, curr) => acc + curr.rating, 0);
    const avg = coachReviews.length > 0 ? parseFloat((sum / coachReviews.length).toFixed(1)) : 5.0;

    const coachIndex = db.coaches.findIndex(c => c.id === coachId || c.registrationNumber === coachId);
    if (coachIndex !== -1) {
      db.coaches[coachIndex].averageRating = avg;
      db.coaches[coachIndex].totalReviews = coachReviews.length;
    }

    saveDatabase();
    res.json({ message: 'Review deleted successfully' });
  });

  // API - CONTACT MESSAGES
  app.post('/api/contact', (req, res) => {
    const msg: ContactMessage = {
      id: `msg-${Date.now()}`,
      ...req.body,
      createdAt: new Date().toISOString()
    };
    db.contactMessages.unshift(msg);
    saveDatabase();
    res.status(201).json(msg);
  });

  app.get('/api/contact', (req, res) => {
    res.json(db.contactMessages);
  });

  // Vite development integration
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`[CoachVerify.in Server] Running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
