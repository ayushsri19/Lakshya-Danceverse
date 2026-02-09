
import { Course, LiveSession } from './types';

export const COLORS = {
  primary: '#bf953f', // Gold
  secondary: '#000000',
  accent: '#fcf6ba',
};

export const CONTACT_INFO = {
  phone1: '+91 7007901592',
  phone2: '+91 9236596740',
  location: 'Lucknow',
  founder: 'Ayush Srivastava',
  trainer: 'Alex K'
};

export const MOCK_COURSES: Course[] = [
  {
    id: 'c1',
    title: 'Hip Hop Fundamentals',
    description: 'Master the basic grooves, isolations, and historical context of Hip Hop culture with Alex K.',
    instructorId: 't1',
    instructorName: 'Alex K',
    thumbnail: 'https://images.unsplash.com/photo-1535525153412-5a42439a210d?auto=format&fit=crop&w=800&q=80',
    category: 'Hip Hop',
    price: 0, // Free/Startup phase
    rating: 4.8,
    studentsCount: 1245,
    difficulty: 'Beginner',
    isPublished: true,
    modules: [
      {
        id: 'm1',
        title: 'The Foundation',
        lessons: [
          { id: 'l1', title: 'History of the Bounce', videoUrl: 'https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8', duration: 760 },
          { id: 'l2', title: 'The Two-Step Variation', videoUrl: 'https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8', duration: 920 }
        ]
      }
    ]
  },
  {
    id: 'c2',
    title: 'Contemporary Expression',
    description: 'Explore fluidity and floor work with a focus on emotional dynamics.',
    instructorId: 't2',
    instructorName: 'S. Verma',
    thumbnail: 'https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?auto=format&fit=crop&w=800&q=80',
    category: 'Contemporary',
    price: 0,
    rating: 4.9,
    studentsCount: 820,
    difficulty: 'Intermediate',
    isPublished: true,
    modules: []
  },
  {
    id: 'c3',
    title: 'Fitness & Flow',
    description: 'Dance-based fitness routines designed for all levels and all ages.',
    instructorId: 't3',
    instructorName: 'Ayush Srivastava',
    thumbnail: 'https://images.unsplash.com/photo-1547153760-18fc86324498?auto=format&fit=crop&w=800&q=80',
    category: 'Fitness',
    price: 0,
    rating: 4.7,
    studentsCount: 540,
    difficulty: 'Beginner',
    isPublished: true,
    modules: []
  }
];

export const MOCK_LIVE_SESSIONS: LiveSession[] = [
  {
    id: 's1',
    title: 'Live Workshop: Power Moves',
    instructorId: 't3',
    instructorName: 'Alex K',
    startTime: new Date().toISOString(),
    durationMinutes: 90,
    category: 'Performance',
    status: 'live'
  }
];
