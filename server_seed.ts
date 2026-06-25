/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Coach, Academy, Tournament, JobVacancy, BlogPost, PaymentDetails, Review, ContactMessage } from './src/types';

export const SPORTS_LIST = [
  "Cricket", "Football", "Badminton", "Volleyball", "Taekwondo", "Kabaddi", 
  "Athletics", "Swimming", "Wrestling", "Boxing", "Tennis", "Basketball", 
  "Hockey", "Shooting", "Archery", "Table Tennis", "Squash", "Gymnastics", 
  "Judo", "Karate", "Weightlifting", "Chess", "Yoga", "Kho-Kho", 
  "Handball", "Cycling", "Billiards", "Golf", "Powerlifting", "Rowing", 
  "Wushu", "Fencing", "Mallakhamb", "Softball", "Netball"
];

export const STATES_DISTRICTS: { [key: string]: string[] } = {
  "Andhra Pradesh": ["Visakhapatnam", "Vijayawada", "Guntur", "Nellore"],
  "Arunachal Pradesh": ["Itanagar", "Tawang", "Ziro", "Pasighat"],
  "Assam": ["Guwahati", "Dibrugarh", "Jorhat", "Silchar"],
  "Bihar": ["Patna", "Gaya", "Muzaffarpur", "Bhagalpur"],
  "Chhattisgarh": ["Raipur", "Bhilai", "Bilaspur", "Korba"],
  "Goa": ["Panaji", "Margao", "Vasco da Gama", "Mapusa"],
  "Gujarat": ["Ahmedabad", "Surat", "Vadodara", "Rajkot"],
  "Haryana": ["Rohtak", "Sonipat", "Gurugram", "Faridabad", "Panipat", "Hisar"],
  "Himachal Pradesh": ["Shimla", "Dharamshala", "Solan", "Mandi"],
  "Jharkhand": ["Ranchi", "Jamshedpur", "Dhanbad", "Bokaro"],
  "Karnataka": ["Bengaluru", "Mysuru", "Hubballi", "Mangaluru"],
  "Kerala": ["Thiruvananthapuram", "Kochi", "Kozhikode", "Thrissur", "Alappuzha"],
  "Madhya Pradesh": ["Bhopal", "Indore", "Gwalior", "Jabalpur"],
  "Maharashtra": ["Mumbai", "Pune", "Nagpur", "Thane", "Nashik", "Kolhapur"],
  "Manipur": ["Imphal", "Churachandpur", "Thoubal"],
  "Meghalaya": ["Shillong", "Tura", "Jowai"],
  "Mizoram": ["Aizawl", "Lunglei", "Champhai"],
  "Nagaland": ["Kohima", "Dimapur", "Mokokchung"],
  "Odisha": ["Bhubaneswar", "Cuttack", "Rourkela", "Sambalpur"],
  "Punjab": ["Ludhiana", "Amritsar", "Jalandhar", "Patiala", "Mohali"],
  "Rajasthan": ["Jaipur", "Jodhpur", "Udaipur", "Kota", "Ajmer", "Bikaner"],
  "Sikkim": ["Gangtok", "Namchi", "Gyalshing"],
  "Tamil Nadu": ["Chennai", "Coimbatore", "Madurai", "Trichy", "Salem"],
  "Telangana": ["Hyderabad", "Warangal", "Nizamabad", "Khammam"],
  "Tripura": ["Agartala", "Udaipur", "Dharmanagar"],
  "Uttar Pradesh": ["Lucknow", "Noida", "Kanpur", "Varanasi", "Meerut", "Agra"],
  "Uttarakhand": ["Dehradun", "Haridwar", "Haldwani", "Roorkee"],
  "West Bengal": ["Kolkata", "Howrah", "Darjeeling", "Asansol", "Durgapur"],
  "Delhi": ["New Delhi", "North Delhi", "South Delhi", "West Delhi"],
  "Jammu & Kashmir": ["Srinagar", "Jammu", "Anantnag", "Baramulla"],
  "Ladakh": ["Leh", "Kargil"],
  "Chandigarh": ["Chandigarh"],
  "Puducherry": ["Puducherry", "Karaikal"]
};

// Realistic pool of Indian names
const FIRST_NAMES = [
  "Amit", "Priya", "Gurpreet", "Rajesh", "Sneha", "Aniket", "Meera", "Vijay", "Kavita", "Sandeep",
  "Manpreet", "Rahul", "Aarav", "Neha", "Vikram", "Sunita", "Deepak", "Anjali", "Arjun", "Ritu",
  "Rohan", "Divya", "Sanjay", "Pooja", "Harpreet", "Shreya", "Karan", "Komal", "Abhishek", "Jyoti",
  "Dev", "Renu", "Jaspreet", "Tanvi", "Siddharth", "Aisha", "Pranav", "Nisha", "Manoj", "Sakshi",
  "Vivek", "Aditi", "Alok", "Swati", "Ashok", "Kirti", "Yash", "Payal", "Ramesh", "Heena"
];

const LAST_NAMES = [
  "Singh", "Sharma", "Kumar", "Patel", "Bose", "Nair", "Rathore", "Joshi", "Tomar", "Kaur",
  "Verma", "Mehta", "Reddy", "Iyer", "Choudhary", "Gupta", "Das", "Yadav", "Mishra", "Pandey",
  "Gill", "Menon", "Prasad", "Sinha", "Deshmukh", "Pillai", "Sen", "Roy", "Rao", "Sethi",
  "Chawla", "Bansal", "Goel", "Dubey", "Trivedi", "Shukla", "Grover", "Kapoor", "Malhotra", "Kadam"
];

// Unsplash sports photos for realistic avatar representation
const COACH_PHOTOS = [
  "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&q=80&w=400", // Training coach
  "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?auto=format&fit=crop&q=80&w=400", // Fitness trainer
  "https://images.unsplash.com/photo-1541534741688-6078c6bfb5c5?auto=format&fit=crop&q=80&w=400", // Active running coach
  "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&q=80&w=400", // Gym instructor
  "https://images.unsplash.com/photo-1594381898411-846e7d193883?auto=format&fit=crop&q=80&w=400", // Female coach
  "https://images.unsplash.com/photo-1507398941214-572c25f4b1dc?auto=format&fit=crop&q=80&w=400", // Male trainer
  "https://images.unsplash.com/photo-1526506118085-60ce8714f8c5?auto=format&fit=crop&q=80&w=400"  // Lifting coach
];

const ACADEMY_PHOTOS = [
  "https://images.unsplash.com/photo-1541252260730-0412e8e2108e?auto=format&fit=crop&q=80&w=600", // Sports field
  "https://images.unsplash.com/photo-1576013551627-0cc20b96c2a7?auto=format&fit=crop&q=80&w=600", // Swimming pool
  "https://images.unsplash.com/photo-1517649763962-0c623066013b?auto=format&fit=crop&q=80&w=600", // Indoor stadium
  "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?auto=format&fit=crop&q=80&w=600", // Running track
  "https://images.unsplash.com/photo-1595079676339-1534801ad6cf?auto=format&fit=crop&q=80&w=600"  // Basketball court
];

export function generateSeedData() {
  const coaches: Coach[] = [];
  const academies: Academy[] = [];
  const states = Object.keys(STATES_DISTRICTS);

  // 1. Generate 25 Academies
  const academyNames = [
    "Netaji Subhas National Academy", "Imperial Sports Club", "Rising Stars Badminton Academy", 
    "Vanguard Football Center", "Apex Cricket Institute", "Champion Wrestling Akhada", 
    "Golden Gloves Boxing Club", "Zen Taekwondo Academy", "Olympus Athletics Hub",
    "Pinnacle Swimming Club", "Pioneer Kabaddi Academy", "Royal Tennis Club", 
    "Indian Youth Volleyball Academy", "Gold Medal Archery Center", "Aim High Shooting Range",
    "Elite Table Tennis Academy", "Sardar Hockey Academy", "Grandmasters Chess Lounge",
    "Sudarshan Yoga Center", "Mahasamar Mallakhamb Shala", "Veer Shivaji Kho-Kho Academy",
    "Noida Sports Development Club", "Gurugram Athletic Center", "Bengaluru Badminton Academy",
    "Jaipur Shooting and Archery Hub"
  ];

  for (let i = 0; i < 25; i++) {
    const state = states[i % states.length];
    const districts = STATES_DISTRICTS[state];
    const district = districts[i % districts.length];
    const name = academyNames[i];
    const sport1 = SPORTS_LIST[i % SPORTS_LIST.length];
    const sport2 = SPORTS_LIST[(i + 3) % SPORTS_LIST.length];

    academies.push({
      id: `acad-${1000 + i}`,
      name,
      logo: `https://images.unsplash.com/photo-1517649763962-0c623066013b?auto=format&fit=crop&q=80&w=100`,
      photos: [
        ACADEMY_PHOTOS[i % ACADEMY_PHOTOS.length],
        ACADEMY_PHOTOS[(i + 1) % ACADEMY_PHOTOS.length]
      ],
      address: `Sector ${i + 4}, Near Rajiv Stadium, ${district}`,
      district,
      state,
      ownerName: `${FIRST_NAMES[i]} ${LAST_NAMES[i]}`,
      headCoach: `${FIRST_NAMES[(i + 10) % FIRST_NAMES.length]} ${LAST_NAMES[(i + 10) % LAST_NAMES.length]}`,
      sportsAvailable: [sport1, sport2],
      googleMap: `https://maps.google.com/?q=${encodeURIComponent(name + ", " + district)}`,
      gallery: [
        ACADEMY_PHOTOS[i % ACADEMY_PHOTOS.length],
        ACADEMY_PHOTOS[(i + 2) % ACADEMY_PHOTOS.length]
      ],
      studentAchievements: "Produced 3 State Gold Medalists and 1 National level qualifier in the recent calendar year.",
      website: `www.${name.toLowerCase().replace(/\s+/g, '')}.in`,
      instagram: `instagram.com/${name.toLowerCase().replace(/\s+/g, '_')}`,
      facebook: `facebook.com/${name.toLowerCase().replace(/\s+/g, '')}`,
      whatsapp: `+9198765${String(10000 + i).substring(1)}`,
      contactNumber: `+9198765${String(10000 + i).substring(1)}`,
      isVerified: i % 5 !== 0, // 80% verified
      createdAt: new Date(Date.now() - i * 5 * 24 * 60 * 60 * 1000).toISOString()
    });
  }

  // 2. Generate 50 Coaches
  for (let i = 0; i < 50; i++) {
    const firstName = FIRST_NAMES[i % FIRST_NAMES.length];
    const lastName = LAST_NAMES[i % LAST_NAMES.length];
    const fullName = `${firstName} ${lastName}`;
    const state = states[i % states.length];
    const districts = STATES_DISTRICTS[state];
    const district = districts[i % districts.length];
    
    const sport = SPORTS_LIST[i % SPORTS_LIST.length];
    const expPlay = 5 + (i % 8);
    const expCoach = 3 + (i % 12);
    
    const isVerified = i % 8 !== 0; // 87.5% verified
    const status = isVerified ? 'approved' : (i % 3 === 0 ? 'pending' : (i % 3 === 1 ? 'rejected' : 'correction'));
    
    const regNum = `CV-2026-R${1000 + i}`;
    const coachId = `CV-IND-${sport.substring(0, 3).toUpperCase()}-${2000 + i}`;

    const qualificationOptions = [
      { hq: "Post Graduation in Physical Education (M.P.Ed)", sq: "NIS Diploma in Sports Coaching", cq: "NIS Certified Coach" },
      { hq: "Doctorate in Sports Science (Ph.D)", sq: "SAI Elite Coach Certificate", cq: "SAI A-Grade Coach" },
      { hq: "Bachelor of Physical Education (B.P.Ed)", sq: "AFI Level 2 Certified", cq: "National Federation Certificate" },
      { hq: "MBA in Sports Management", sq: "BWF Coach Level 1", cq: "International Federation Certified" }
    ];
    const qual = qualificationOptions[i % qualificationOptions.length];

    // Seed student athlete tracking
    const athletesSeed = [
      {
        id: `ath-${i}-1`,
        athleteName: `${FIRST_NAMES[(i + 5) % FIRST_NAMES.length]} Kumar`,
        sport,
        metrics: {
          speed: 75 + (i % 21),
          stamina: 80 + (i % 16),
          strength: 70 + (i % 26),
          skill: 85 + (i % 11),
          discipline: 90 + (i % 9)
        },
        progressHistory: [
          { date: "2026-04-10", overallScore: 72, notes: "Needs more cardiorespiratory endurance." },
          { date: "2026-05-15", overallScore: 78, notes: "Improved power output and footwork speed." },
          { date: "2026-06-20", overallScore: 82, notes: "Exceptional form shown during state tryouts." }
        ],
        notes: "Excellent discipline. Shows huge potential for National tournaments.",
        createdAt: "2026-04-01T12:00:00Z"
      },
      {
        id: `ath-${i}-2`,
        athleteName: `${FIRST_NAMES[(i + 15) % FIRST_NAMES.length]} Sharma`,
        sport,
        metrics: {
          speed: 65 + (i % 31),
          stamina: 75 + (i % 21),
          strength: 82 + (i % 14),
          skill: 72 + (i % 24),
          discipline: 88 + (i % 11)
        },
        progressHistory: [
          { date: "2026-05-01", overallScore: 68, notes: "Initial assessment. Strong foundation." },
          { date: "2026-06-15", overallScore: 76, notes: "Enhanced speed agility drill timings by 1.2s." }
        ],
        notes: "Good strength parameters. Refining mechanical skills and target accuracy.",
        createdAt: "2026-05-01T14:30:00Z"
      }
    ];

    coaches.push({
      id: `coach-${1000 + i}`,
      registrationNumber: regNum,
      coachId,
      photo: COACH_PHOTOS[i % COACH_PHOTOS.length],
      fullName,
      fatherName: `${LAST_NAMES[(i + 5) % LAST_NAMES.length]} Lal ${LAST_NAMES[i % LAST_NAMES.length]}`,
      motherName: `${FIRST_NAMES[(i + 18) % FIRST_NAMES.length]} Devi`,
      gender: i % 5 === 4 ? "Female" : "Male",
      dob: `19${80 + (i % 16)}-0${1 + (i % 9)}-${10 + (i % 19)}`,
      bloodGroup: ["A+", "B+", "O+", "AB+", "O-"][i % 5],
      nationality: "Indian",
      aadhaarNumber: `XXXX-XXXX-${4321 + i}`,
      panNumber: `ABCDE${4000 + i}F`,
      address: `Flat No ${10 + i}, Sports Colony Phase II, ${district}`,
      village: i % 2 === 0 ? "Kalyanpur" : undefined,
      city: district,
      district,
      state,
      pincode: `3020${10 + (i % 90)}`,
      sport,
      specialization: `${sport} Tactical Play & Performance Enhancement`,
      playingExperience: expPlay,
      coachingExperience: expCoach,
      highestQualification: qual.hq,
      sportsQualification: qual.sq,
      coachingQualification: qual.cq,
      currentAcademy: academyNames[i % academyNames.length],
      previousAcademy: academyNames[(i + 1) % academyNames.length],
      designation: "Head Sports Coach & Director",
      biography: `With over ${expCoach} years of active training experience across top state levels, Coach ${fullName} specializes in maximizing high-intensity functional training, refining mechanical postures, and mental conditioning for professional athletes.`,
      achievements: `Winner of State Excellence Award 2024. Maintained a 90% athlete success record in North Indian tournaments.`,
      awards: `Dronacharya District Nominee, SAI Merit Commendation, State Outstanding Coach Medal.`,
      nationalParticipation: `Represented state team in National Games 3 times (won 1 Silver and 2 Bronze medals).`,
      internationalParticipation: i % 7 === 0 ? `Coached Indian Junior Team at Asian Athletic Meet 2023.` : "N/A",
      certificates: ["nis_diploma.jpg", "sai_license.jpg", "first_aid.jpg"],
      gallery: [
        COACH_PHOTOS[i % COACH_PHOTOS.length],
        "https://images.unsplash.com/photo-1517649763962-0c623066013b?auto=format&fit=crop&q=80&w=400"
      ],
      videos: ["https://www.youtube.com/watch?v=dQw4w9WgXcQ"],
      studentAchievements: "Coached 15 junior athletes who secured state podium finishes, 2 drafted into SAI elite camps.",
      languages: ["English", "Hindi", i % 3 === 0 ? "Punjabi" : "Regional Language"],
      ageGroups: ["Under-14", "Under-19", "Senior Professionals"],
      phone: `+9198700${String(10000 + i).substring(1)}`,
      whatsapp: `+9198700${String(10000 + i).substring(1)}`,
      email: `${firstName.toLowerCase()}.${lastName.toLowerCase()}@coachverify.in`,
      website: `www.coach${firstName.toLowerCase()}.com`,
      instagram: `instagram.com/coach_${firstName.toLowerCase()}`,
      facebook: `facebook.com/coach${firstName.toLowerCase()}`,
      linkedin: `linkedin.com/in/coach-${firstName.toLowerCase()}-${lastName.toLowerCase()}`,
      youtube: `youtube.com/c/Coach${firstName}`,
      googleMap: `https://maps.google.com/?q=${encodeURIComponent(fullName + " Academy")}`,
      qrCode: `https://api.qrserver.com/v1/create-qr-code/?size=250x250&data=${encodeURIComponent("https://coachverify.in/verify/" + regNum)}`,
      isVerified,
      status,
      correctionNotes: status === 'correction' ? "Please upload a clearer scan of your NIS Diploma certificate." : undefined,
      averageRating: 4.0 + (i % 11) * 0.1 > 5 ? 5.0 : parseFloat((4.0 + (i % 11) * 0.1).toFixed(1)),
      totalReviews: 5 + (i * 3) % 25,
      featured: i % 9 === 0, // Featured coaches
      athleteMetrics: athletesSeed,
      createdAt: new Date(Date.now() - i * 3 * 24 * 60 * 60 * 1000).toISOString()
    });
  }

  // 3. Generate Tournaments
  const levels: ('National' | 'State' | 'District' | 'School Games' | 'CBSE' | 'Khelo India' | 'SGFI')[] = [
    'National', 'State', 'District', 'School Games', 'CBSE', 'Khelo India', 'SGFI'
  ];
  const tournaments: Tournament[] = [];
  const tournamentNames = [
    "Khelo India Youth Games (West Region)", "CBSE National Athletics Meet", "All India Inter-University Wrestling",
    "Rajasthan State Taekwondo Championship", "Mumbai Junior Football League", "Kerala State Volleyball Cup",
    "Delhi NCR Open Badminton Championship", "Punjab State Kabaddi Mahasangram", "Senior National Boxing Trials",
    "South India Swimming League"
  ];

  for (let i = 0; i < 10; i++) {
    const state = states[i % states.length];
    const sport = SPORTS_LIST[i % SPORTS_LIST.length];
    tournaments.push({
      id: `tourn-${100 + i}`,
      title: tournamentNames[i],
      level: levels[i % levels.length],
      venue: `Chhatrasal Stadium, Delhi & State Sports Complex, ${state}`,
      date: `2026-08-${10 + i}`,
      organizer: "Sports Authority of India & CoachVerify Association",
      registrationLink: "https://coachverify.in/tournaments/register",
      brochureUrl: "brochure_pdf_placeholder.pdf",
      sport,
      description: `Official national-level open tournament platform for scouts to discover junior Indian talent. Grand cash rewards and merit certifications.`,
      isUpcoming: i % 2 === 0,
      createdAt: new Date().toISOString()
    });
  }

  // 4. Generate Job Vacancies
  const jobs: JobVacancy[] = [];
  const roles = [
    "Head Football Coach", "Assistant Badminton Trainer", "Senior Cricket Specialist", 
    "Physical Education Teacher & Taekwondo Coach", "Volleyball High-Performance Director",
    "Kabaddi Team Head Coach", "Athletics Coach (Sprints & Jumps)", "Swimming Academy Coordinator",
    "Wrestling Akhada Instructor", "Tennis Development Coach"
  ];
  const orgs = [
    { name: "Delhi Public School", type: "School" as const },
    { name: "Sardar Patel University", type: "University" as const },
    { name: "Reliance Youth Sports Academy", type: "Academy" as const },
    { name: "Sanskriti International School", type: "School" as const },
    { name: "Pune Gymkhana Club", type: "Sports Club" as const },
    { name: "LPU Sports Academy", type: "College" as const },
    { name: "Army Sports Institute", type: "Sports Club" as const },
    { name: "GoSports Foundation Center", type: "Academy" as const },
    { name: "DAV Public School", type: "School" as const },
    { name: "Calicut Sports Club", type: "Sports Club" as const }
  ];

  for (let i = 0; i < 10; i++) {
    const state = states[i % states.length];
    const sport = SPORTS_LIST[i % SPORTS_LIST.length];
    const org = orgs[i % orgs.length];

    jobs.push({
      id: `job-${100 + i}`,
      title: roles[i],
      organizationName: org.name,
      organizationType: org.type,
      sport,
      location: `${org.name}, ${STATES_DISTRICTS[state][0]}, ${state}`,
      salaryRange: `₹${40 + i * 5},000 - ₹${75 + i * 10},000 Per Month`,
      experienceRequired: 3 + (i % 4),
      description: `Looking for a highly skilled and certified ${sport} Coach who can manage team selections, daily drills, state-level tournament preparation, and student tracking.`,
      requirements: [
        "NIS Diploma or equivalent coaching license is highly preferred",
        "Must have represented state/national team during active playing career",
        "Exceptional communication skills in English and Hindi",
        "First Aid & Sports Injury Prevention certification"
      ],
      contactEmail: `recruitment@${org.name.toLowerCase().replace(/\s+/g, '')}.edu.in`,
      isVerifiedOrganization: i % 3 !== 0,
      createdAt: new Date().toISOString()
    });
  }

  // 5. Generate Blog Posts
  const blogs: BlogPost[] = [
    {
      id: "blog-1",
      title: "Nutrition Guide for Indian Sports Athletes: Maximizing Local Diets",
      slug: "indian-athlete-nutrition-guide",
      category: "Nutrition",
      summary: "Understand how traditional Indian food groups like Paneer, Dals, Sattu, and Ragi can be optimized for high-protein athletic diets without expensive foreign supplements.",
      content: `### Fueling the Indian Athlete

Traditional Indian diets are incredibly rich in micronutrients, but athletic regimes often demand high-density macro protein structures that are sometimes missed. Here is a practical blueprint to optimize standard Indian foods for champions:

1. **The Power of Sattu**: Chickpea flour (Sattu) is an excellent vegan protein shake, offering nearly 20g of clean protein per 100g along with cooling dietary fibers.
2. **Millets Revolution**: Replace polished white rice with Ragi (Finger Millet) and Bajra (Pearl Millet) to increase long-lasting complex carbs, iron, and calcium.
3. **Paneer vs Tofu**: Fresh home-made Paneer offers rich amino acids suitable for muscle recovery, but should be consumed in grilled/low-fat versions.
4. **Dal Combinations**: Mix wheat roti with lentils (Arhar/Moong) to form complete essential amino acid profiles for high performance muscle building.

*Consult your certified Sports Nutritionist to map these to individual athletic body indexes.*`,
      coverImage: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&q=80&w=600",
      author: "Dr. Kirti Verma",
      authorRole: "Sports Nutrition Specialist (SAI Consultant)",
      tags: ["Nutrition", "Indian Diet", "Recovery"],
      createdAt: new Date().toISOString()
    },
    {
      id: "blog-2",
      title: "Understanding NIS Certification: The Benchmark for Indian Sports Coaches",
      slug: "understanding-nis-certification-coaching",
      category: "Career Guidance",
      summary: "A comprehensive roadmap explaining how to apply for the Netaji Subhas National Institute of Sports (NIS) diploma, exam patterns, and future career heights.",
      content: `### How to Achieve India's Premier Coaching Standard

For any sports professional in India, an **NIS Diploma in Sports Coaching** is the gold standard. It opens doors to government jobs, national team panels, and top-tier academies.

#### Eligible Pathways:
- **Sports Achievement Pathway**: Representing India in international meets, or podium finishes in National Games.
- **Academic Pathway**: Degree in Physical Education (B.P.Ed / M.P.Ed) with university level participation.

#### Diploma Highlights:
- **Duration**: 1 Year intensive course at NIS Patiala, Bengaluru, Kolkata, or Thiruvananthapuram.
- **Subjects**: Kinesiology, Sports Psychology, Training Methods, Sports Medicine, Specialized Practical Drills.

Achieving this certification places you in the top 5% of elite registered professionals.`,
      coverImage: "https://images.unsplash.com/photo-1541534741688-6078c6bfb5c5?auto=format&fit=crop&q=80&w=600",
      author: "Coach Vijay Rathore",
      authorRole: "NIS Senior Volleyball Director",
      tags: ["NIS", "Certification", "Career"],
      createdAt: new Date().toISOString()
    },
    {
      id: "blog-3",
      title: "Mental Conditioning: Training Your Mind to Win Tight Match Finishes",
      slug: "mental-conditioning-winning-tight-matches",
      category: "Coaching Tips",
      summary: "Unlocking psychological drills to help young Indian athletes counter high-pressure scenarios, performance anxiety, and critical match-points.",
      content: `### Overcoming the Mental Block

Under pressure, the body responds with cortisol spikes, narrowing an athlete's focus and tightening their muscles. Here are three mental exercises coaches must teach:

1. **The 4-4-4 Box Breathing Technique**: Inhale for 4 seconds, hold for 4 seconds, exhale for 4 seconds. Instantly lowers heart rate and stabilizes motor nerves.
2. **Visualizing the Victory Loop**: Spend 10 minutes pre-match visualizing standard plays, perfect responses to errors, and final moments of composure.
3. **Anchor Phrases**: Establish a vocal cue (e.g., "Steady", "Next Play") to snap the focus back from a bad referee call or a lost point.`,
      coverImage: "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&q=80&w=600",
      author: "Sneha Nair",
      authorRole: "Sports Psychologist & Coach",
      tags: ["Mental Strength", "Coaching Skills", "Anxiety"],
      createdAt: new Date().toISOString()
    }
  ];

  // 6. Testimonials
  const testimonials = [
    {
      id: "t-1",
      name: "Saurav Ganguly",
      role: "Former Indian Cricket Captain",
      text: "CoachVerify.in is solving a monumental problem in Indian sports. Authenticating certifications like NIS & SAI ensures our children are trained only by true professionals.",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=150"
    },
    {
      id: "t-2",
      name: "Geeta Phogat",
      role: "Commonwealth Gold Medalist Wrestler",
      text: "Finding NIS coaches in smaller districts used to be extremely difficult. CoachVerify's state and district filters are making high-quality coaches accessible across rural India.",
      image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=150"
    }
  ];

  return {
    coaches,
    academies,
    tournaments,
    jobs,
    blogs,
    testimonials,
    sports: SPORTS_LIST,
    statesDistricts: STATES_DISTRICTS,
    adminSettings: {
      registrationFee: 100,
      paymentGatewayEnabled: true
    },
    payments: [] as PaymentDetails[],
    reviews: [] as Review[],
    contactMessages: [] as ContactMessage[]
  };
}
