
export enum UserRole {
  STUDENT = 'STUDENT',
  TRAINER = 'TRAINER',
  ADMIN = 'ADMIN'
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar?: string;
  bio?: string;
  isApproved: boolean;
  joinedAt: string;
}

export interface Course {
  id: string;
  title: string;
  description: string;
  instructorId: string;
  instructorName: string;
  thumbnail: string;
  category: string;
  price: number;
  rating: number;
  studentsCount: number;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  modules: Module[];
  isPublished: boolean;
}

export interface Module {
  id: string;
  title: string;
  lessons: Lesson[];
}

export interface Lesson {
  id: string;
  title: string;
  videoUrl: string; // Should be a .m3u8 HLS manifest
  duration: number; // In seconds
  lastPosition?: number;
  isCompleted?: boolean;
}

export interface LiveSession {
  id: string;
  title: string;
  instructorId: string;
  instructorName: string;
  streamUrl?: string;
  startTime: string;
  durationMinutes: number;
  category: string;
  status: 'upcoming' | 'live' | 'ended';
  playbackUrl?: string; // Recording URL
}

export interface Analytics {
  revenue: number;
  activeUsers: number;
  completionRate: number;
  topPerformingCourse: string;
}
