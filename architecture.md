
# GrooveStream Production Architecture

## 1. System Overview
GrooveStream is built as a cloud-native, API-first platform designed for high-concurrency video workloads.

### Tech Stack
- **Frontend**: React (TS) + Tailwind CSS + HLS.js (Adaptive Streaming).
- **Backend (Proposed)**: Node.js/Go Microservices.
- **Database**: PostgreSQL (Relational Data) + Redis (Session/Caching).
- **Storage**: AWS S3 / Cloudflare R2 (Video Assets).
- **CDN**: Cloudflare / AWS CloudFront.
- **Streaming Engine**: AWS IVS (Interactive Video Service) or Mux for managed WebRTC/RTMP-to-HLS pipelines.

## 2. Streaming Architecture (The Live Pipeline)
1. **Ingest**: Teachers stream via RTMP (from OBS) or WebRTC (Browser-based).
2. **Transcoding**: A Media Server (e.g., AWS IVS) takes the high-bitrate ingest and transcodes it into multiple resolutions (1080p, 720p, 480p, 360p).
3. **Delivery**: The transcoded chunks are served via HLS (HTTP Live Streaming) through a global CDN.
4. **Recording**: Upon session end, the Media Server moves the master manifest to S3, triggering a Lambda to create a VOD record in the PostgreSQL database.

## 3. Database Schema (PostgreSQL)
```sql
CREATE TYPE user_role AS ENUM ('STUDENT', 'TRAINER', 'ADMIN');

CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT UNIQUE NOT NULL,
  password_hash TEXT NOT NULL,
  full_name TEXT NOT NULL,
  role user_role NOT NULL DEFAULT 'STUDENT',
  avatar_url TEXT,
  is_approved BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE courses (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  description TEXT,
  instructor_id UUID REFERENCES users(id),
  thumbnail_url TEXT,
  price DECIMAL(10,2),
  is_published BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE lessons (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  course_id UUID REFERENCES courses(id),
  title TEXT NOT NULL,
  video_url TEXT, -- HLS Manifest URL
  duration_seconds INT,
  order_index INT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE progress (
  user_id UUID REFERENCES users(id),
  lesson_id UUID REFERENCES lessons(id),
  last_position_seconds INT DEFAULT 0,
  is_completed BOOLEAN DEFAULT FALSE,
  PRIMARY KEY (user_id, lesson_id)
);
```

## 4. Scaling Strategy
- **Horizontal Scaling**: Backend services are containerized (Docker) and managed by K8s.
- **Database Scaling**: Read-replicas for course catalog browsing; Write-master for progress tracking and auth.
- **Edge Caching**: Video chunks are cached at the edge. VOD manifests use short TTLs to allow for seamless transition from "Live" to "Replay".

## 5. Deployment instructions
- Frontend: Deploy to Vercel/Netlify with global Edge Network.
- Backend: Deploy to AWS ECS/EKS.
- Database: Managed PostgreSQL (RDS/Supabase).
- Secret Management: Use AWS Secrets Manager for API Keys and JWT Secrets.
