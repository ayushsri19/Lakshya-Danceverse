
import React from 'react';
import { Analytics, User } from '../types';

interface Inquiry {
  id: number;
  name: string;
  phone: string;
  email: string;
  experience: string;
  program: string;
  batch: string;
  date: string;
}

interface AdminDashboardProps {
  analytics: Analytics;
  inquiries?: Inquiry[];
  onApprove?: (id: number) => void;
}

const AdminDashboard: React.FC<AdminDashboardProps> = ({ analytics, inquiries = [] }) => {
  return (
    <div className="space-y-10 animate-fade-in">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b border-white/5 pb-8">
        <div>
          <h1 className="text-5xl font-display gold-text uppercase">Master Terminal</h1>
          <p className="text-slate-500 font-bold uppercase tracking-[0.3em] text-[10px] mt-1">Lakshya Danceverse Operations</p>
        </div>
        <div className="flex gap-4">
           <div className="px-6 py-3 bg-[#bf953f]/10 border border-[#bf953f]/30 rounded-xl">
              <span className="text-xs font-bold text-[#bf953f] uppercase tracking-widest">System Status: Online</span>
           </div>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-[#0a0a0a] p-8 rounded-[2rem] border border-white/5">
          <p className="text-[10px] uppercase font-bold text-slate-500 tracking-widest mb-2">Total Admissions</p>
          <p className="text-4xl font-display gold-text">{analytics.activeUsers}</p>
        </div>
        <div className="bg-[#0a0a0a] p-8 rounded-[2rem] border border-white/5">
          <p className="text-[10px] uppercase font-bold text-slate-500 tracking-widest mb-2">New Leads</p>
          <p className="text-4xl font-display gold-text">{inquiries.length}</p>
        </div>
        <div className="bg-[#0a0a0a] p-8 rounded-[2rem] border border-white/5">
          <p className="text-[10px] uppercase font-bold text-slate-500 tracking-widest mb-2">Avg. Completion</p>
          <p className="text-4xl font-display gold-text">{analytics.completionRate}%</p>
        </div>
        <div className="bg-[#0a0a0a] p-8 rounded-[2rem] border border-white/5">
          <p className="text-[10px] uppercase font-bold text-slate-500 tracking-widest mb-2">Revenue</p>
          <p className="text-4xl font-display gold-text">₹0.00</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Inquiry List */}
        <div className="lg:col-span-2 bg-[#0a0a0a] rounded-[2.5rem] border border-white/5 overflow-hidden shadow-2xl">
          <div className="p-8 border-b border-white/5 flex justify-between items-center bg-white/[0.02]">
            <h3 className="text-xl font-bold gold-text uppercase tracking-widest">Admission Inquiries</h3>
            <span className="px-3 py-1 bg-white/5 rounded-full text-[10px] font-bold text-slate-400">{inquiries.length} Pending</span>
          </div>
          <div className="divide-y divide-white/5">
            {inquiries.length > 0 ? inquiries.map(item => (
              <div key={item.id} className="p-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-6 hover:bg-white/[0.02] transition-colors">
                <div className="space-y-1">
                  <p className="text-lg font-bold text-white uppercase tracking-tight">{item.name}</p>
                  <p className="text-xs text-slate-500 font-mono tracking-tighter">{item.phone} • {item.experience} Level</p>
                </div>
                <div className="text-left md:text-right">
                   <p className="text-xs font-bold text-[#bf953f] uppercase tracking-widest">{item.program}</p>
                   <p className="text-[10px] text-slate-600 mt-1">{item.batch}</p>
                </div>
                <div className="flex gap-3">
                   <a 
                    href={`https://wa.me/${item.phone.replace(/\D/g, '')}`} 
                    target="_blank"
                    className="px-5 py-2 bg-emerald-600/10 border border-emerald-600/30 text-emerald-500 text-[10px] font-bold rounded-lg uppercase tracking-widest hover:bg-emerald-600 hover:text-white transition-all"
                   >
                     WhatsApp
                   </a>
                   <button className="px-5 py-2 bg-white/5 text-slate-400 text-[10px] font-bold rounded-lg uppercase tracking-widest hover:text-white transition-all">Archive</button>
                </div>
              </div>
            )) : (
              <div className="p-24 text-center">
                <svg className="w-12 h-12 text-slate-800 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0a2 2 0 01-2 2H6a2 2 0 01-2-2m16 0l-8 4-8-4" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                <p className="text-slate-600 italic text-sm">Waiting for new performance aspirants...</p>
              </div>
            )}
          </div>
        </div>

        {/* System & Logs */}
        <div className="space-y-8">
           <div className="bg-[#0a0a0a] rounded-[2.5rem] p-8 border border-white/5 shadow-2xl">
              <h3 className="text-lg font-bold mb-6 gold-text uppercase tracking-widest">Global Health</h3>
              <div className="space-y-6">
                 <div className="flex justify-between items-center">
                    <span className="text-[11px] uppercase font-bold text-slate-500 tracking-widest">Video Server</span>
                    <span className="text-[10px] font-bold text-emerald-500 flex items-center gap-2">
                       <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full"></span>
                       Active
                    </span>
                 </div>
                 <div className="flex justify-between items-center">
                    <span className="text-[11px] uppercase font-bold text-slate-500 tracking-widest">Auth Gateway</span>
                    <span className="text-[10px] font-bold text-emerald-500 flex items-center gap-2">
                       <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full"></span>
                       Active
                    </span>
                 </div>
                 <div className="flex justify-between items-center">
                    <span className="text-[11px] uppercase font-bold text-slate-500 tracking-widest">Database</span>
                    <span className="text-[10px] font-bold text-emerald-500 flex items-center gap-2">
                       <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full"></span>
                       Synchronized
                    </span>
                 </div>
              </div>
           </div>

           <div className="bg-gradient-to-br from-[#111] to-black rounded-[2.5rem] p-8 border border-white/5 shadow-2xl">
              <h3 className="text-lg font-bold mb-4 gold-text uppercase tracking-widest">Founder Access</h3>
              <p className="text-xs text-slate-500 leading-relaxed mb-6">Master Ayush, you have full control over academy units and student enrollment cycles.</p>
              <button className="w-full py-4 bg-white/5 hover:bg-white/10 text-white text-[10px] font-bold rounded-xl uppercase tracking-widest transition-all">Security Logs</button>
           </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
