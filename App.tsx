
import React, { useState, useEffect } from 'react';
import Layout from './components/Layout';
import CourseCard from './components/CourseCard';
import LiveStream from './components/LiveStream';
import AdminDashboard from './components/AdminDashboard';
import TeacherDashboard from './components/TeacherDashboard';
import VideoPlayer from './components/VideoPlayer';
import { MOCK_COURSES, MOCK_LIVE_SESSIONS, CONTACT_INFO, BATCHES } from './constants';
import { User, UserRole, Course, LiveSession, Analytics } from './types';

// Accurate Lakshya Logo Component based on the provided poster
export const LakshyaLogo = ({ size = "lg", className = "" }: { size?: "sm" | "md" | "lg", className?: string }) => {
  const dim = size === "lg" ? "w-64 h-64 md:w-80 md:h-80" : (size === "md" ? "w-32 h-32" : "w-12 h-12");
  return (
    <div className={`relative ${dim} flex items-center justify-center ${className}`}>
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-6 h-6 z-20">
        <div className="absolute inset-0 bg-white blur-[4px] rounded-full opacity-60"></div>
        <div className="absolute inset-0 bg-[#fcf6ba] shadow-[0_0_20px_#bf953f] rounded-full scale-50"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[2px] h-10 bg-[#fcf6ba] blur-[1px]"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[2px] w-10 bg-[#fcf6ba] blur-[1px]"></div>
      </div>
      
      <svg viewBox="0 0 200 200" className="absolute inset-0 w-full h-full">
        <defs>
          <linearGradient id="logoGold" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" style={{ stopColor: '#bf953f' }} />
            <stop offset="50%" style={{ stopColor: '#fcf6ba' }} />
            <stop offset="100%" style={{ stopColor: '#b38728' }} />
          </linearGradient>
        </defs>
        <path 
          d="M40,140 A80,80 0 1,1 160,140" 
          fill="none" 
          stroke="url(#logoGold)" 
          strokeWidth="2.5" 
          strokeLinecap="round" 
          className="drop-shadow-[0_0_8px_rgba(191,149,63,0.5)]"
        />
        <circle cx="100" cy="100" r="60" fill="none" stroke="#bf953f" strokeWidth="0.5" strokeDasharray="3,3" opacity="0.6" />
      </svg>

      <svg viewBox="0 0 100 100" className="w-[45%] h-[45%] z-10 fill-[#fcf6ba] drop-shadow-[0_0_12px_rgba(252,246,186,0.3)]">
        <path d="M52,25 C54,25 56,27 56,29 C56,31 54,33 52,33 C50,33 48,31 48,29 C48,27 50,25 52,25 Z" />
        <path d="M52,33 C52,33 48,40 40,42 C45,40 52,45 55,55 C58,65 52,80 45,85 C55,75 62,60 58,50 C54,40 75,30 85,20 C70,30 55,35 52,33 Z" />
      </svg>
    </div>
  );
};

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState('home');
  const [user, setUser] = useState<User | null>(null);
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
  const [selectedBatch, setSelectedBatch] = useState<string | null>(null);
  const [loginStep, setLoginStep] = useState<'main' | 'terminal'>('main');
  const [inquiries, setInquiries] = useState<any[]>([]);
  const [formData, setFormData] = useState({ name: '', phone: '', email: '', experience: 'Beginner', message: '' });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleLogin = (role: UserRole) => {
    setUser({
      id: 'LDV-' + Math.random().toString(36).substr(2, 5).toUpperCase(),
      name: role === UserRole.STUDENT ? 'Student Member' : (role === UserRole.TRAINER ? 'Alex K' : 'Ayush Srivastava'),
      email: 'member@lakshyadanceverse.com',
      role: role,
      isApproved: true,
      joinedAt: new Date().toISOString()
    });
    setActiveTab('dashboard');
  };

  const handleLogout = () => {
    setUser(null);
    setActiveTab('home');
    setLoginStep('main');
  };

  const handleAdmissionSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newInquiry = {
      id: Date.now(),
      ...formData,
      program: selectedCourse?.title,
      batch: selectedBatch,
      date: new Date().toLocaleString()
    };
    setInquiries([newInquiry, ...inquiries]);
    setActiveTab('confirmation');
  };

  const renderHome = () => (
    <div className="bg-black text-white selection:bg-[#bf953f] selection:text-black min-h-screen">
      <section className="relative min-h-screen flex flex-col md:flex-row items-center justify-center px-6 pt-16 overflow-hidden">
        <div className="hero-glow"></div>
        <div className="flex-1 max-w-3xl relative z-10 space-y-10 text-center md:text-left animate-fade-in">
          <div className="space-y-4">
            <h2 className="text-3xl md:text-5xl font-display text-slate-300 tracking-tight uppercase">A NEW ERA OF</h2>
            <h1 className="text-7xl md:text-[10rem] font-display leading-none gold-text uppercase tracking-tighter">PERFORMANCE</h1>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-8 py-8 border-y border-white/10">
            <div>
              <p className="text-[10px] uppercase tracking-widest text-slate-500 font-bold mb-1">Scope</p>
              <p className="text-lg font-bold">All Levels • All Ages</p>
            </div>
            <div>
              <p className="text-[10px] uppercase tracking-widest text-slate-500 font-bold mb-1">Core</p>
              <p className="text-lg font-bold">Dance • Fitness</p>
            </div>
            <div>
              <p className="text-[10px] uppercase tracking-widest text-slate-500 font-bold mb-1">Location</p>
              <p className="text-lg font-bold flex items-center justify-center md:justify-start gap-1">
                <svg className="w-4 h-4 text-red-600" fill="currentColor" viewBox="0 0 20 20"><path d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" /></svg>Lucknow
              </p>
            </div>
          </div>
          <div className="flex flex-col sm:flex-row gap-6 justify-center md:justify-start items-center">
            <button onClick={() => setActiveTab('courses')} className="px-14 py-5 bg-[#bf953f] text-black font-bold rounded-full hover:scale-105 transition-transform shadow-2xl shadow-[#bf953f]/30 uppercase tracking-[0.2em] text-sm animate-pulse-gold">Admissions Open</button>
            <div className="text-left border-l border-[#bf953f]/40 pl-6 space-y-1">
              <p className="text-[10px] text-slate-500 uppercase font-bold tracking-widest">Founded by</p>
              <p className="font-bold text-lg">{CONTACT_INFO.founder}</p>
              <p className="text-[10px] text-slate-500 uppercase font-bold tracking-widest mt-2">Training by</p>
              <p className="font-bold text-lg">{CONTACT_INFO.trainer}</p>
            </div>
          </div>
        </div>
        <div className="flex-1 flex justify-center items-center relative z-10 py-16 animate-fade-in" style={{ animationDelay: '0.2s' }}>
          <div className="text-center group">
            <LakshyaLogo size="lg" className="mx-auto" />
            <div className="mt-8 space-y-2">
              <h3 className="font-logo text-5xl md:text-7xl gold-text font-bold tracking-[0.2em] uppercase">LAKSHYA</h3>
              <p className="font-logo text-2xl md:text-3xl text-slate-400 tracking-[0.2em] uppercase">DANCEVERSE</p>
              <p className="text-sm italic gold-text font-bold tracking-[0.6em] mt-6 uppercase">Aim. Move. Become.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );

  const renderCourses = () => (
    <div className="max-w-7xl mx-auto px-6 py-24 animate-fade-in">
      <div className="text-center mb-24 space-y-4">
         <h1 className="text-6xl font-display gold-text uppercase tracking-tighter">Signature Programs</h1>
         <p className="text-slate-500 uppercase tracking-[0.4em] text-[10px] font-bold">Standardized Professional Training Units</p>
      </div>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-12">
        {MOCK_COURSES.map(course => (
          <CourseCard key={course.id} course={course} onClick={() => { setSelectedCourse(course); setActiveTab('batch-selection'); }} />
        ))}
      </div>
    </div>
  );

  const renderBatchSelection = () => (
    <div className="max-w-4xl mx-auto px-6 py-24 animate-fade-in">
      <button onClick={() => setActiveTab('courses')} className="text-slate-500 hover:text-white mb-10 text-xs font-bold uppercase tracking-widest flex items-center gap-2">
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M10 19l-7-7m0 0l7-7m-7 7h18" strokeWidth="2"/></svg> Back to Programs
      </button>
      <h2 className="text-5xl font-display gold-text uppercase mb-2">Select your Batch</h2>
      <p className="text-slate-500 mb-12 uppercase tracking-[0.3em] text-xs font-bold">Program: {selectedCourse?.title}</p>
      <div className="grid md:grid-cols-2 gap-6">
        {BATCHES.map(batch => (
          <button key={batch.id} onClick={() => { setSelectedBatch(`${batch.name} (${batch.time})`); setActiveTab('admission-form'); }} className="p-8 bg-[#0a0a0a] border border-white/5 rounded-3xl text-left hover:border-[#bf953f]/50 hover:bg-[#bf953f]/5 transition-all group relative overflow-hidden">
            <div className="relative z-10">
              <h3 className="text-xl font-bold text-white mb-2 group-hover:gold-text transition-all">{batch.name}</h3>
              <p className="text-sm text-slate-400 font-mono mb-4">{batch.time}</p>
              <p className="text-[10px] uppercase tracking-widest text-[#bf953f] font-bold">{batch.days}</p>
            </div>
            <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-100 transition-opacity">
               <svg className="w-8 h-8 text-[#bf953f]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M13 7l5 5m0 0l-5 5m5-5H6" strokeWidth="2"/></svg>
            </div>
          </button>
        ))}
      </div>
    </div>
  );

  const renderAdmissionForm = () => (
    <div className="max-w-xl mx-auto px-6 py-24 animate-fade-in">
      <div className="text-center mb-12">
        <h2 className="text-4xl font-display gold-text uppercase mb-2">Admission Inquiry</h2>
        <p className="text-slate-500 uppercase tracking-widest text-[10px] font-bold">{selectedCourse?.title} • {selectedBatch}</p>
      </div>
      <form onSubmit={handleAdmissionSubmit} className="space-y-6">
        <div className="space-y-2">
          <label className="text-[10px] uppercase font-bold text-slate-500 tracking-widest">Full Name</label>
          <input required name="name" onChange={handleInputChange} value={formData.name} type="text" className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-4 focus:ring-1 focus:ring-[#bf953f] focus:outline-none transition-all" placeholder="Enter your full name" />
        </div>
        <div className="space-y-2">
          <label className="text-[10px] uppercase font-bold text-slate-500 tracking-widest">Phone Number</label>
          <input required name="phone" onChange={handleInputChange} value={formData.phone} type="tel" className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-4 focus:ring-1 focus:ring-[#bf953f] focus:outline-none transition-all" placeholder="+91 XXXX XXX XXX" />
        </div>
        <div className="space-y-2">
          <label className="text-[10px] uppercase font-bold text-slate-500 tracking-widest">Experience Level</label>
          <select name="experience" onChange={handleInputChange} value={formData.experience} className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-4 focus:ring-1 focus:ring-[#bf953f] focus:outline-none transition-all appearance-none text-slate-300">
            <option className="bg-black">Beginner</option>
            <option className="bg-black">Intermediate</option>
            <option className="bg-black">Advanced</option>
          </select>
        </div>
        <div className="space-y-2">
          <label className="text-[10px] uppercase font-bold text-slate-500 tracking-widest">Message (Optional)</label>
          <textarea name="message" onChange={handleInputChange} value={formData.message} className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-4 focus:ring-1 focus:ring-[#bf953f] focus:outline-none transition-all h-32" placeholder="Tell us about your interest..."></textarea>
        </div>
        <button type="submit" className="w-full py-5 bg-[#bf953f] text-black font-bold rounded-xl uppercase tracking-widest hover:scale-[1.02] active:scale-95 transition-all shadow-xl shadow-[#bf953f]/10">Submit Enrollment Request</button>
      </form>
    </div>
  );

  const renderConfirmation = () => (
    <div className="max-w-xl mx-auto px-6 py-40 text-center animate-fade-in">
      <div className="w-24 h-24 bg-gradient-to-br from-[#bf953f] to-[#b38728] rounded-full flex items-center justify-center mx-auto mb-10 shadow-2xl shadow-[#bf953f]/20">
         <svg className="w-12 h-12 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M5 13l4 4L19 7" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"/></svg>
      </div>
      <h2 className="text-5xl font-display gold-text uppercase mb-4">Request Received</h2>
      <p className="text-slate-400 mb-12 text-lg">Thank you for choosing Lakshya Danceverse. Ayush Srivastava and the team will review your application. You will receive an official response via WhatsApp within 24 hours.</p>
      <div className="flex flex-col gap-4">
        <a href={`https://wa.me/${CONTACT_INFO.phone1.replace(/\D/g, '')}?text=${encodeURIComponent(CONTACT_INFO.whatsappMsg)}`} target="_blank" className="w-full py-5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-2xl uppercase tracking-[0.2em] transition-all flex items-center justify-center gap-3 shadow-xl">
          <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.025 3.312l-.548 2.037 2.082-.547c.916.51 1.946.78 3.209.78 3.182 0 5.767-2.586 5.768-5.766 0-3.18-2.586-5.766-5.768-5.766z"/></svg>Chat on WhatsApp
        </a>
        <button onClick={() => setActiveTab('home')} className="text-slate-500 hover:text-[#bf953f] text-xs font-bold uppercase tracking-widest mt-6">Return to Home</button>
      </div>
    </div>
  );

  const renderContent = () => {
    switch (activeTab) {
      case 'home': return renderHome();
      case 'dashboard': return <AdminDashboard analytics={{revenue:0, activeUsers:142, completionRate:85, topPerformingCourse:'Hip Hop Fundamentals'}} inquiries={inquiries} />;
      case 'courses': return renderCourses();
      case 'batch-selection': return renderBatchSelection();
      case 'admission-form': return renderAdmissionForm();
      case 'confirmation': return renderConfirmation();
      case 'live': return <div className="max-w-7xl mx-auto px-6 py-12"><LiveStream sessionTitle="Live Studio: Elite Performance" instructorName="Alex K" /></div>;
      case 'course-view': return (
        <div className="max-w-7xl mx-auto px-6 py-12 animate-fade-in">
          <button onClick={() => setActiveTab('courses')} className="text-slate-500 hover:text-[#bf953f] font-bold uppercase tracking-[0.3em] text-[10px] mb-12 flex items-center gap-2"><svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M10 19l-7-7m0 0l7-7m-7 7h18" strokeWidth="2" strokeLinecap="round"/></svg> Return to Academy</button>
          <div className="grid lg:grid-cols-3 gap-16">
             <div className="lg:col-span-2 space-y-10">
                <VideoPlayer src="https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8" poster={selectedCourse?.thumbnail} />
                <div className="space-y-6">
                  <h1 className="text-6xl font-display text-white uppercase tracking-tight leading-none">{selectedCourse?.title}</h1>
                  <p className="text-lg text-slate-400 leading-relaxed font-light max-w-2xl">{selectedCourse?.description}</p>
                </div>
             </div>
             <div className="bg-[#0a0a0a] border border-white/5 rounded-[2.5rem] p-10 h-fit sticky top-24 shadow-2xl">
                <h3 className="text-xl font-bold mb-10 gold-text uppercase tracking-widest border-b border-white/5 pb-4">Session Map</h3>
                <div className="space-y-6">
                   {selectedCourse?.modules.map((m, idx) => (
                     <div key={m.id} className="space-y-4">
                        <p className="text-[10px] uppercase font-bold text-slate-600 tracking-[0.2em]">Unit {idx + 1}: {m.title}</p>
                        <div className="space-y-3">
                           {m.lessons.map(l => (
                             <div key={l.id} className="p-4 bg-black border border-white/5 rounded-2xl text-xs font-bold text-slate-400 flex justify-between items-center group cursor-pointer hover:border-[#bf953f]/40 transition-all"><span className="group-hover:text-white transition-colors">{l.title}</span><span className="text-[10px] text-slate-700 font-mono">{Math.floor(l.duration / 60)}:{(l.duration % 60).toString().padStart(2, '0')}</span></div>
                           ))}
                        </div>
                     </div>
                   ))}
                </div>
             </div>
          </div>
        </div>
      );
      case 'login': return renderLogin();
      default: return renderHome();
    }
  };

  return (
    <Layout activeTab={activeTab} setActiveTab={setActiveTab} userRole={user?.role || null} onLogout={handleLogout}>
      {renderContent()}
    </Layout>
  );
};

export default App;
