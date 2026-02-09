
import React from 'react';
import { Analytics, User, Course } from '../types';

interface AdminDashboardProps {
  analytics: Analytics;
  pendingApprovals: User[];
  onApprove: (userId: string) => void;
}

const AdminDashboard: React.FC<AdminDashboardProps> = ({ analytics, pendingApprovals, onApprove }) => {
  return (
    <div className="space-y-8 animate-fade-in">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
          <p className="text-sm font-medium text-slate-500 mb-1">Total Revenue</p>
          <p className="text-3xl font-display text-indigo-600">${analytics.revenue.toLocaleString()}</p>
        </div>
        <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
          <p className="text-sm font-medium text-slate-500 mb-1">Active Students</p>
          <p className="text-3xl font-display text-slate-900">{analytics.activeUsers.toLocaleString()}</p>
        </div>
        <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
          <p className="text-sm font-medium text-slate-500 mb-1">Avg. Completion</p>
          <p className="text-3xl font-display text-slate-900">{analytics.completionRate}%</p>
        </div>
        <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
          <p className="text-sm font-medium text-slate-500 mb-1">Top Course</p>
          <p className="text-lg font-bold text-slate-900 truncate">{analytics.topPerformingCourse}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Pending Instructor Approvals */}
        <div className="bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden">
          <div className="p-6 border-b border-slate-50">
            <h3 className="text-xl font-bold">Instructor Onboarding</h3>
          </div>
          <div className="divide-y divide-slate-50">
            {pendingApprovals.length > 0 ? pendingApprovals.map(user => (
              <div key={user.id} className="p-6 flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-slate-100 rounded-full flex items-center justify-center font-bold text-slate-400">
                    {user.name.charAt(0)}
                  </div>
                  <div>
                    <p className="font-bold">{user.name}</p>
                    <p className="text-sm text-slate-500">{user.email}</p>
                  </div>
                </div>
                <button 
                  onClick={() => onApprove(user.id)}
                  className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-bold rounded-lg transition-colors"
                >
                  Approve
                </button>
              </div>
            )) : (
              <div className="p-12 text-center text-slate-400">
                All instructor applications are processed.
              </div>
            )}
          </div>
        </div>

        {/* System Health */}
        <div className="bg-slate-900 rounded-3xl p-8 text-white">
          <h3 className="text-xl font-bold mb-6">System Status</h3>
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <span className="text-slate-400">API Gateway</span>
              <span className="flex items-center gap-2 text-emerald-400">
                <span className="w-2 h-2 bg-emerald-400 rounded-full"></span>
                Healthy
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-slate-400">Live Streaming Ingest</span>
              <span className="flex items-center gap-2 text-emerald-400">
                <span className="w-2 h-2 bg-emerald-400 rounded-full"></span>
                Operational
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-slate-400">Database Load</span>
              <span className="text-slate-300 font-mono">14%</span>
            </div>
            <div className="mt-8 pt-6 border-t border-white/10">
              <button className="w-full py-3 bg-white/10 hover:bg-white/20 rounded-xl text-sm font-bold transition-all">
                View Detailed Logs
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
