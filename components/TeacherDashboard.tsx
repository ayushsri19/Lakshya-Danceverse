
import React from 'react';
import { Course, LiveSession } from '../types';

interface TeacherDashboardProps {
  courses: Course[];
  liveSessions: LiveSession[];
  onStartLive: () => void;
  onUploadVideo: () => void;
}

const TeacherDashboard: React.FC<TeacherDashboardProps> = ({ courses, liveSessions, onStartLive, onUploadVideo }) => {
  return (
    <div className="space-y-8 animate-fade-in">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold">Instructor Studio</h1>
          <p className="text-slate-500">Manage your content and reach your students.</p>
        </div>
        <div className="flex gap-4">
          <button 
            onClick={onUploadVideo}
            className="px-6 py-3 border border-slate-200 hover:bg-slate-50 rounded-xl font-bold transition-all flex items-center gap-2"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
            </svg>
            Upload VOD
          </button>
          <button 
            onClick={onStartLive}
            className="px-6 py-3 bg-red-600 hover:bg-red-700 text-white rounded-xl font-bold transition-all flex items-center gap-2 shadow-lg shadow-red-200"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
            </svg>
            Go Live Now
          </button>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Course Management */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden">
            <div className="p-6 border-b border-slate-50 flex justify-between items-center">
              <h3 className="text-xl font-bold">Your Courses</h3>
              <span className="text-sm font-medium text-indigo-600">{courses.length} Active</span>
            </div>
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {courses.map(course => (
                  <div key={course.id} className="group relative border border-slate-100 rounded-2xl p-4 hover:bg-slate-50 transition-all">
                    <div className="flex gap-4">
                      <img src={course.thumbnail} className="w-20 h-20 object-cover rounded-lg" alt={course.title} />
                      <div className="flex-grow min-w-0">
                        <h4 className="font-bold truncate">{course.title}</h4>
                        <p className="text-xs text-slate-500 mb-2">{course.studentsCount} Students enrolled</p>
                        <div className="flex gap-2">
                          <button className="text-[10px] uppercase font-bold text-indigo-600 tracking-wider hover:underline">Edit</button>
                          <button className="text-[10px] uppercase font-bold text-slate-400 tracking-wider hover:underline">Analytics</button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Schedule & Live Records */}
        <div className="space-y-8">
          <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm">
            <h3 className="text-xl font-bold mb-6">Upcoming Schedule</h3>
            <div className="space-y-6">
              {liveSessions.filter(s => s.status === 'upcoming').map(session => (
                <div key={session.id} className="flex gap-4">
                  <div className="w-12 h-12 bg-indigo-50 rounded-xl flex flex-col items-center justify-center text-indigo-600 flex-shrink-0">
                    <span className="text-[10px] font-bold uppercase">Oct</span>
                    <span className="text-lg font-display leading-none">24</span>
                  </div>
                  <div>
                    <p className="text-sm font-bold text-slate-900 line-clamp-1">{session.title}</p>
                    <p className="text-xs text-slate-500">{new Date(session.startTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</p>
                  </div>
                </div>
              ))}
              <button className="w-full py-3 bg-slate-50 text-slate-600 font-bold rounded-xl text-sm hover:bg-slate-100 transition-colors">
                View Full Calendar
              </button>
            </div>
          </div>
          
          <div className="bg-slate-900 rounded-3xl p-8 text-white">
            <h3 className="text-lg font-bold mb-4">Storage Usage</h3>
            <div className="space-y-4">
              <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
                <div className="h-full bg-indigo-500" style={{ width: '42%' }}></div>
              </div>
              <div className="flex justify-between text-xs text-slate-400">
                <span>420 GB used</span>
                <span>1 TB limit</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeacherDashboard;
