
import React, { useState } from 'react';
import { UserRole } from '../types';

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
    { id: 'dashboard', label: 'Dashboard', roles: [UserRole.STUDENT, UserRole.TRAINER, UserRole.ADMIN] },
    { id: 'live', label: 'Live Studio', roles: [UserRole.STUDENT, UserRole.TRAINER] },
  ];

  const visibleItems = navItems.filter(item => item.roles.includes(userRole));

  return (
    <div className="min-h-screen flex flex-col bg-black">
      <header className="sticky top-0 z-50 bg-black/90 backdrop-blur-md border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <div className="flex items-center gap-3 cursor-pointer group" onClick={() => setActiveTab('home')}>
              <div className="relative w-12 h-12 flex items-center justify-center">
                <div className="absolute inset-0 border-2 border-[#bf953f] rounded-full animate-pulse"></div>
                <div className="w-8 h-8 bg-[#bf953f] rounded-full flex items-center justify-center overflow-hidden">
                    <span className="text-black font-bold text-xs">LDV</span>
                </div>
              </div>
              <div className="flex flex-col">
                <span className="font-logo text-xl tracking-widest gold-gradient font-bold">LAKSHYA DANCEVERSE</span>
                <span className="text-[8px] uppercase tracking-[0.3em] text-slate-400">Aim. Move. Become.</span>
              </div>
            </div>

            <nav className="hidden md:flex space-x-8">
              {visibleItems.map(item => (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`text-xs uppercase tracking-widest font-bold transition-all ${
                    activeTab === item.id ? 'text-[#bf953f] border-b-2 border-[#bf953f] pb-1' : 'text-slate-400 hover:text-white'
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </nav>

            <div className="hidden md:flex items-center gap-4">
              {userRole ? (
                <button 
                  onClick={onLogout}
                  className="px-4 py-2 text-xs font-bold text-slate-400 hover:text-white uppercase tracking-tighter"
                >
                  Sign Out
                </button>
              ) : (
                <button 
                  onClick={() => setActiveTab('login')}
                  className="px-8 py-2 text-xs font-bold text-black bg-[#bf953f] hover:bg-[#fcf6ba] rounded-full transition-all uppercase tracking-widest"
                >
                  Join Academy
                </button>
              )}
            </div>

            <div className="md:hidden">
              <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="p-2 text-[#bf953f]">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={isMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16m-7 6h7"} />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </header>

      <main className="flex-grow">
        {children}
      </main>

      <footer className="bg-black border-t border-white/5 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="font-logo text-2xl gold-gradient mb-2 tracking-widest">LAKSHYA DANCEVERSE</div>
          <p className="text-slate-500 text-sm mb-8 tracking-wide">A New Era of Performance | Lucknow, India</p>
          <div className="flex justify-center gap-8 mb-8 text-[10px] uppercase tracking-[0.2em] font-bold text-slate-400">
            <a href="#" className="hover:text-[#bf953f]">Instagram</a>
            <a href="#" className="hover:text-[#bf953f]">YouTube</a>
            <a href="#" className="hover:text-[#bf953f]">Privacy</a>
          </div>
          <div className="text-[10px] text-slate-600 uppercase tracking-widest">© 2025 Lakshya Danceverse. Built for the Elite.</div>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
