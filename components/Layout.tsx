
import React, { useState } from 'react';
import { UserRole } from '../types';
import { LakshyaLogo } from '../App';

interface LayoutProps {
  children: React.ReactNode;
  activeTab: string;
  setActiveTab: (tab: string) => void;
  userRole: UserRole | null;
  onLogout: () => void;
}

const Layout: React.FC<LayoutProps> = ({ children, activeTab, setActiveTab, userRole, onLogout }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navItems = [
    { id: 'home', label: 'Home', roles: [null, UserRole.STUDENT, UserRole.TRAINER, UserRole.ADMIN] },
    { id: 'courses', label: 'Academy', roles: [null, UserRole.STUDENT, UserRole.TRAINER, UserRole.ADMIN] },
    { id: 'dashboard', label: 'Portal', roles: [UserRole.STUDENT, UserRole.TRAINER, UserRole.ADMIN] },
  ];

  const visibleItems = navItems.filter(item => item.roles.includes(userRole));

  return (
    <div className="min-h-screen flex flex-col bg-black">
      <header className="fixed top-0 left-0 right-0 z-50 bg-black/95 backdrop-blur-xl border-b border-white/5">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex justify-between items-center h-20">
            {/* Logo Group */}
            <div className="flex items-center gap-4 cursor-pointer group" onClick={() => setActiveTab('home')}>
              <LakshyaLogo size="sm" />
              <div className="flex flex-col">
                <span className="font-logo text-lg tracking-[0.2em] gold-text font-bold leading-none">LAKSHYA DANCEVERSE</span>
                <span className="text-[7px] uppercase tracking-[0.4em] text-slate-500 font-bold mt-1">Aim. Move. Become.</span>
              </div>
            </div>

            {/* Desktop Nav */}
            <nav className="hidden md:flex items-center space-x-12">
              {visibleItems.map(item => (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`text-[10px] uppercase tracking-[0.4em] font-bold transition-all ${
                    activeTab === item.id ? 'text-[#bf953f] border-b border-[#bf953f] pb-1' : 'text-slate-500 hover:text-white'
                  }`}
                >
                  {item.label}
                </button>
              ))}
              
              <div className="h-4 w-[1px] bg-white/10 mx-2"></div>

              {userRole ? (
                <button 
                  onClick={onLogout}
                  className="text-[9px] uppercase tracking-widest font-bold text-slate-600 hover:text-red-500 transition-colors"
                >
                  Sign Out
                </button>
              ) : (
                <button 
                  onClick={() => setActiveTab('login')}
                  className="px-8 py-2.5 text-[10px] font-bold text-black bg-gradient-to-r from-[#bf953f] to-[#b38728] hover:scale-105 rounded-full transition-all uppercase tracking-[0.2em] shadow-lg shadow-[#bf953f]/20"
                >
                  Join Academy
                </button>
              )}
            </nav>

            <div className="md:hidden">
              <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="p-2 text-[#bf953f]">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={isMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16m-7 6h7"} />
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Nav */}
        {isMenuOpen && (
          <div className="md:hidden bg-[#0a0a0a] border-b border-white/5 animate-fade-in">
            <div className="px-6 py-10 space-y-8">
              {visibleItems.map(item => (
                <button
                  key={item.id}
                  onClick={() => { setActiveTab(item.id); setIsMenuOpen(false); }}
                  className="block w-full text-left text-[11px] uppercase tracking-[0.4em] font-bold text-slate-400"
                >
                  {item.label}
                </button>
              ))}
              {!userRole && (
                <button 
                  onClick={() => { setActiveTab('login'); setIsMenuOpen(false); }}
                  className="w-full py-5 bg-[#bf953f] text-black font-bold rounded-2xl text-[11px] uppercase tracking-widest shadow-xl shadow-[#bf953f]/10"
                >
                  Join Academy
                </button>
              )}
            </div>
          </div>
        )}
      </header>

      <main className="flex-grow pt-20">
        {children}
      </main>

      <footer className="bg-black border-t border-white/5 py-24">
        <div className="max-w-7xl mx-auto px-6 text-center space-y-16">
          <div className="flex flex-col items-center gap-6">
             <div className="font-logo text-3xl gold-text font-bold tracking-[0.3em] uppercase">LAKSHYA DANCEVERSE</div>
             <p className="text-slate-500 text-[10px] uppercase font-bold tracking-[0.6em]">Aim. Move. Become.</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-12 max-w-4xl mx-auto pt-12 border-t border-white/5">
             <div className="space-y-3">
                <p className="text-[10px] text-slate-600 uppercase tracking-widest font-bold">Lucknow HQ</p>
                <p className="text-sm text-slate-400 font-medium">Uttar Pradesh, India</p>
             </div>
             <div className="space-y-3">
                <p className="text-[10px] text-slate-600 uppercase tracking-widest font-bold">Enquiries</p>
                <p className="text-sm text-slate-400 font-mono tracking-tighter">+91 7007901592</p>
                <p className="text-sm text-slate-400 font-mono tracking-tighter">+91 9236596740</p>
             </div>
             <div className="space-y-3">
                <p className="text-[10px] text-slate-600 uppercase tracking-widest font-bold">Social</p>
                <div className="flex justify-center gap-8 text-[11px] text-slate-400 font-bold uppercase tracking-widest">
                   <a href="#" className="hover:text-[#bf953f] transition-colors">Instagram</a>
                   <a href="#" className="hover:text-[#bf953f] transition-colors">YouTube</a>
                </div>
             </div>
          </div>

          <p className="text-[8px] text-slate-700 uppercase tracking-[0.4em] font-bold">© 2025 Lakshya Danceverse. Built for performance.</p>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
