
import React, { useState, useEffect } from 'react';
import Layout from './components/Layout';
import CourseCard from './components/CourseCard';
import LiveStream from './components/LiveStream';
import AdminDashboard from './components/AdminDashboard';
import TeacherDashboard from './components/TeacherDashboard';
import VideoPlayer from './components/VideoPlayer';
import { MOCK_COURSES, MOCK_LIVE_SESSIONS, CONTACT_INFO } from './constants';
import { User, UserRole, Course, LiveSession, Analytics } from './types';
import { generateLearningPlan } from './services/geminiService';

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState('home');
  const [user, setUser] = useState<User | null>(null);
  const [learningPlan, setLearningPlan] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
  const [loginStep, setLoginStep] = useState<'main' | 'management'>('main');

  const MOCK_ANALYTICS: Analytics = {
    revenue: 0,
    activeUsers: 540,
    completionRate: 72,
    topPerformingCourse: 'Fitness & Flow'
  };

  const handleLogin = (role: UserRole) => {
    setUser({
      id: 'u_session_' + Math.random().toString(36).substr(2, 9),
      name: role === UserRole.STUDENT ? 'Student User' : (role === UserRole.TRAINER ? 'Alex K' : 'Admin Terminal'),
      email: 'user@lakshyadanceverse.com',
      role: role,
      isApproved: true,
      joinedAt: new Date().toISOString()
    });
    setActiveTab('dashboard');
  };

  const handleLogout = () => {
    setUser(null);
    setActiveTab('home');
    setSelectedCourse(null);
    setLoginStep('main');
  };

  const renderLogin = () => (
    <div className="min-h-[90vh] flex items-center justify-center p-4 bg-black relative overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#bf953f]/5 rounded-full blur-[120px] pointer-events-none"></div>
      
      <div className="w-full max-w-xl bg-[#0a0a0a] p-12 rounded-[3rem] shadow-2xl border border-white/5 text-center relative z-10">
        <div className="w-24 h-24 bg-[#bf953f] rounded-full flex items-center justify-center mx-auto mb-10 shadow-2xl shadow-[#bf953f]/20">
          <span className="text-black font-bold text-3xl font-logo">LDV</span>
        </div>

        {loginStep === 'main' ? (
          <>
            <h2 className="text-4xl font-bold mb-4 gold-gradient font-logo uppercase tracking-widest">Entry Portal</h2>
            <p className="text-slate-500 mb-12 tracking-wide">Welcome to the future of dance performance.</p>
            
            <div className="space-y-4">
              <button 
                onClick={() => handleLogin(UserRole.STUDENT)}
                className="w-full py-5 bg-[#bf953f] hover:bg-[#fcf6ba] text-black font-bold rounded-2xl transition-all uppercase tracking-widest flex items-center justify-center gap-3"
              >
                Join as Student
              </button>
              
              <div className="flex gap-4">
                <button 
                  className="flex-1 py-4 border border-white/10 hover:bg-white/5 text-white font-bold rounded-2xl transition-all flex items-center justify-center gap-3 text-xs uppercase tracking-widest"
                >
                  <svg className="w-5 h-5" viewBox="0 0 24 24">
                    <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                    <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                    <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                    <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                  </svg>
                  Google Login
                </button>
              </div>

              <button 
                onClick={() => setLoginStep('management')}
                className="w-full mt-6 py-4 text-xs font-bold text-slate-500 hover:text-[#bf953f] transition-all uppercase tracking-[0.3em]"
              >
                Administrative Terminal
              </button>
            </div>
          </>
        ) : (
          <>
            <button 
              onClick={() => setLoginStep('main')}
              className="absolute top-8 left-8 text-slate-500 hover:text-white transition-all"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
            </button>
            <h2 className="text-3xl font-bold mb-4 text-white font-logo uppercase tracking-widest">Management</h2>
            <p className="text-slate-500 mb-12">Authorized Personnel Only</p>
            <div className="space-y-4">
              <button 
                onClick={() => handleLogin(UserRole.TRAINER)}
                className="w-full py-5 bg-[#111] border border-[#bf953f]/30 hover:border-[#bf953f] text-[#bf953f] font-bold rounded-2xl transition-all uppercase tracking-widest"
              >
                Instructor Entry
              </button>
              <button 
                onClick={() => handleLogin(UserRole.ADMIN)}
                className="w-full py-5 bg-[#111] border border-red-900/30 hover:border-red-600 text-red-600 font-bold rounded-2xl transition-all uppercase tracking-widest"
              >
                System Admin
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );

  const renderHome = () => (
    <div className="bg-black text-white selection:bg-[#bf953f] selection:text-black">
      {/* Hero Section - Based on the Poster */}
      <section className="relative min-h-screen flex flex-col items-center justify-center px-4 overflow-hidden pt-20">
        <div className="absolute inset-0 z-0 opacity-40">
           <img src="https://images.unsplash.com/photo-1547153760-18fc86324498?auto=format&fit=crop&w=1920&q=80" className="w-full h-full object-cover grayscale" />
           <div className="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-transparent"></div>
        </div>

        <div className="max-w-7xl mx-auto w-full relative z-10 text-center md:text-left flex flex-col md:flex-row items-center gap-16">
          <div className="flex-1 space-y-10 animate-fade-in">
             <div className="space-y-2">
                <span className="text-[#bf953f] font-bold tracking-[0.5em] text-xs uppercase block">Est. 2025</span>
                <h2 className="text-4xl md:text-6xl font-display uppercase tracking-tight leading-none text-slate-300">A NEW ERA OF</h2>
                <h1 className="text-7xl md:text-[10rem] font-display uppercase tracking-tighter leading-none gold-gradient">PERFORMANCE</h1>
             </div>
             
             <div className="grid grid-cols-2 md:grid-cols-3 gap-8 py-8 border-y border-white/10">
                <div>
                   <p className="text-[10px] uppercase tracking-widest text-slate-500 mb-1">Scope</p>
                   <p className="text-lg font-bold">All Levels • All Ages</p>
                </div>
                <div>
                   <p className="text-[10px] uppercase tracking-widest text-slate-500 mb-1">Focus</p>
                   <p className="text-lg font-bold">Dance • Fitness</p>
                </div>
                <div>
                   <p className="text-[10px] uppercase tracking-widest text-slate-500 mb-1">Location</p>
                   <p className="text-lg font-bold flex items-center gap-1">
                      <svg className="w-4 h-4 text-red-600" fill="currentColor" viewBox="0 0 20 20"><path d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" /></svg>
                      Lucknow
                   </p>
                </div>
             </div>

             <div className="flex flex-col sm:flex-row gap-6">
                <button 
                  onClick={() => setActiveTab('login')}
                  className="px-12 py-5 bg-[#bf953f] text-black font-bold rounded-full hover:scale-105 transition-transform shadow-2xl shadow-[#bf953f]/20 uppercase tracking-widest text-sm"
                >
                  Admissions Open
                </button>
                <div className="flex flex-col justify-center text-left border-l border-[#bf953f]/30 pl-6">
                   <p className="text-[10px] uppercase tracking-widest text-slate-400">Founder</p>
                   <p className="font-bold text-white">{CONTACT_INFO.founder}</p>
                   <p className="text-[10px] uppercase tracking-widest text-slate-400 mt-2">Training by</p>
                   <p className="font-bold text-white">{CONTACT_INFO.trainer}</p>
                </div>
             </div>
          </div>

          <div className="flex-1 flex justify-center relative animate-fade-in delay-200">
             <div className="relative w-80 h-80 md:w-[500px] md:h-[500px]">
                {/* Logo Re-creation */}
                <div className="absolute inset-0 border-2 border-[#bf953f]/20 rounded-full animate-spin-slow"></div>
                <div className="absolute inset-4 border border-[#bf953f]/40 rounded-full"></div>
                <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center">
                       <div className="w-32 h-32 md:w-64 md:h-64 mx-auto mb-6 relative">
                          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-4 h-4 bg-[#bf953f] rounded-full blur-sm animate-pulse shadow-[0_0_20px_#bf953f]"></div>
                          {/* Silhouette Placeholder */}
                          <svg className="w-full h-full text-[#bf953f]" fill="currentColor" viewBox="0 0 100 100">
                             <path d="M50 20c-2.2 0-4 1.8-4 4s1.8 4 4 4 4-1.8 4-4-1.8-4-4-4zm15 15c-5 0-9 4-9 9 0 3.3 1.8 6.1 4.5 7.6L45 75h10l8-15 12-5-5-15c-1-3-3.3-5-5-5z" />
                          </svg>
                       </div>
                       <h3 className="font-logo text-4xl md:text-6xl gold-gradient font-bold tracking-widest uppercase">LAKSHYA</h3>
                       <p className="font-logo text-xl md:text-2xl text-slate-400 tracking-[0.2em] font-bold">DANCEVERSE</p>
                       <p className="text-[10px] uppercase tracking-[0.5em] text-[#bf953f] mt-4 font-bold italic">Aim. Move. Become.</p>
                    </div>
                </div>
             </div>
          </div>
        </div>
        
        {/* Footer Contact bar from poster */}
        <div className="max-w-7xl mx-auto w-full mt-24 flex flex-wrap justify-center md:justify-between gap-8 py-8 border-t border-white/5 relative z-10">
           <div className="flex items-center gap-4 group cursor-pointer">
              <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-[#bf953f] transition-all">
                 <svg className="w-5 h-5 group-hover:text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
              </div>
              <div>
                 <p className="text-[10px] uppercase tracking-widest text-slate-500 font-bold">Enquiries</p>
                 <p className="text-sm font-mono text-slate-300">{CONTACT_INFO.phone1}</p>
                 <p className="text-sm font-mono text-slate-300">{CONTACT_INFO.phone2}</p>
              </div>
           </div>
        </div>
      </section>

      {/* Featured Courses - Academy Section */}
      <section className="max-w-7xl mx-auto px-4 py-32">
        <div className="text-center mb-20">
          <h2 className="text-5xl font-display gold-gradient uppercase mb-4">Elite Training Paths</h2>
          <p className="text-slate-500 max-w-xl mx-auto uppercase tracking-widest text-xs font-bold">Standardized curriculum for the next generation of performers.</p>
        </div>
        <div className="grid md:grid-cols-3 gap-10">
          {MOCK_COURSES.map(course => (
            <CourseCard key={course.id} course={course} onClick={(id) => { setSelectedCourse(MOCK_COURSES.find(c => c.id === id)!); setActiveTab('course-view'); }} />
          ))}
        </div>
      </section>
    </div>
  );

  const renderDashboard = () => {
    if (!user) return renderHome();
    switch (user.role) {
      case UserRole.ADMIN:
        return <div className="max-w-7xl mx-auto px-4 py-12"><AdminDashboard analytics={MOCK_ANALYTICS} pendingApprovals={[]} onApprove={() => {}} /></div>;
      case UserRole.TRAINER:
        return <div className="max-w-7xl mx-auto px-4 py-12"><TeacherDashboard courses={MOCK_COURSES} liveSessions={MOCK_LIVE_SESSIONS} onStartLive={() => setActiveTab('live')} onUploadVideo={() => {}} /></div>;
      default:
        return (
          <div className="max-w-7xl mx-auto px-4 py-12">
            <h1 className="text-4xl font-logo gold-gradient mb-8 uppercase tracking-widest">Student Portal</h1>
            <div className="grid lg:grid-cols-3 gap-8">
               <div className="lg:col-span-2 space-y-8">
                  <div className="bg-[#111] p-10 rounded-3xl border border-white/5 shadow-2xl">
                     <h3 className="text-2xl font-bold mb-6 flex items-center gap-3">
                        <span className="w-2 h-8 bg-[#bf953f]"></span>
                        My Training Roadmap
                     </h3>
                     <div className="space-y-6">
                        {MOCK_COURSES.slice(0, 1).map(c => (
                          <div key={c.id} className="p-6 bg-black rounded-2xl border border-white/10 flex gap-6 items-center">
                             <img src={c.thumbnail} className="w-32 h-20 object-cover rounded-lg opacity-60" />
                             <div className="flex-grow">
                                <h4 className="font-bold text-white mb-2">{c.title}</h4>
                                <div className="w-full h-1 bg-white/5 rounded-full overflow-hidden">
                                   <div className="h-full bg-[#bf953f]" style={{ width: '15%' }}></div>
                                </div>
                                <p className="text-[10px] uppercase text-slate-500 mt-2 font-bold tracking-widest">15% Progress</p>
                             </div>
                             <button onClick={() => {setSelectedCourse(c); setActiveTab('course-view');}} className="px-6 py-2 bg-white/5 hover:bg-[#bf953f] hover:text-black rounded-lg text-xs font-bold transition-all uppercase tracking-widest">Resume</button>
                          </div>
                        ))}
                     </div>
                  </div>
               </div>
               <div className="bg-[#111] p-8 rounded-3xl border border-white/5 shadow-2xl">
                   <h3 className="text-xl font-bold mb-6 gold-gradient uppercase tracking-widest">Live Now</h3>
                   {MOCK_LIVE_SESSIONS.map(s => (
                     <div key={s.id} onClick={() => setActiveTab('live')} className="p-4 bg-red-600/10 border border-red-600/30 rounded-2xl cursor-pointer hover:bg-red-600/20 transition-all">
                        <div className="flex items-center gap-2 mb-2">
                           <span className="w-2 h-2 bg-red-600 rounded-full animate-ping"></span>
                           <span className="text-[10px] font-bold text-red-600 uppercase tracking-widest">Streaming</span>
                        </div>
                        <p className="font-bold text-white">{s.title}</p>
                        <p className="text-xs text-slate-500 mt-1">{s.instructorName}</p>
                     </div>
                   ))}
               </div>
            </div>
          </div>
        );
    }
  };

  const renderCourses = () => (
    <div className="max-w-7xl mx-auto px-4 py-24">
      <div className="text-center mb-24">
         <h1 className="text-6xl font-display gold-gradient uppercase mb-4">The Syllabus</h1>
         <p className="text-slate-500 uppercase tracking-[0.3em] text-xs font-bold">Standardized Training Units | Lucknow Headquarters</p>
      </div>
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
        {MOCK_COURSES.concat(MOCK_COURSES).map((c, i) => (
          <CourseCard key={i} course={c} onClick={(id) => { setSelectedCourse(MOCK_COURSES.find(course => course.id === id)!); setActiveTab('course-view'); }} />
        ))}
      </div>
    </div>
  );

  const renderContent = () => {
    switch (activeTab) {
      case 'home': return renderHome();
      case 'dashboard': return renderDashboard();
      case 'courses': return renderCourses();
      case 'live': return <div className="max-w-7xl mx-auto px-4 py-12"><LiveStream sessionTitle="Live Studio: Performance Mastery" instructorName="Alex K" /></div>;
      case 'course-view': return (
        <div className="max-w-7xl mx-auto px-4 py-12">
          <button onClick={() => setActiveTab('courses')} className="flex items-center gap-2 text-slate-500 hover:text-[#bf953f] font-bold uppercase tracking-widest text-[10px] mb-12 transition-all">
             <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>
             Back to Syllabus
          </button>
          <div className="grid lg:grid-cols-3 gap-12">
             <div className="lg:col-span-2 space-y-8">
                <VideoPlayer src="https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8" poster={selectedCourse?.thumbnail} />
                <h1 className="text-5xl font-display text-white uppercase tracking-tight">{selectedCourse?.title}</h1>
                <p className="text-lg text-slate-400 leading-relaxed font-light">{selectedCourse?.description}</p>
             </div>
             <div className="bg-[#111] p-8 rounded-3xl border border-white/5 h-fit sticky top-24 shadow-2xl">
                <h3 className="text-xl font-bold mb-6 gold-gradient uppercase tracking-widest border-b border-[#bf953f]/20 pb-4">Content Breakdown</h3>
                <div className="space-y-4">
                   {selectedCourse?.modules.map(m => (
                     <div key={m.id} className="space-y-2">
                        <p className="text-[10px] uppercase font-bold text-slate-500 tracking-widest">{m.title}</p>
                        {m.lessons.map(l => (
                          <div key={l.id} className="p-3 bg-black/40 border border-white/5 rounded-xl text-xs font-bold text-slate-300 flex justify-between items-center group cursor-pointer hover:border-[#bf953f]/50 transition-all">
                             <span className="group-hover:text-white transition-colors">{l.title}</span>
                             <span className="text-[10px] text-slate-600">{Math.floor(l.duration / 60)}m</span>
                          </div>
                        ))}
                     </div>
                   ))}
                   {(!selectedCourse?.modules || selectedCourse.modules.length === 0) && <p className="text-slate-600 text-sm italic">Lessons coming soon...</p>}
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
    <Layout 
      activeTab={activeTab} 
      setActiveTab={setActiveTab} 
      userRole={user?.role || null}
      onLogout={handleLogout}
    >
      {renderContent()}
    </Layout>
  );
};

export default App;
