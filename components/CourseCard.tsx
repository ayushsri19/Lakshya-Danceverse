
import React from 'react';
import { Course } from '../types';

interface CourseCardProps {
  course: Course;
  onClick: (id: string) => void;
}

const CourseCard: React.FC<CourseCardProps> = ({ course, onClick }) => {
  return (
    <div 
      onClick={() => onClick(course.id)}
      className="group bg-[#111] rounded-2xl overflow-hidden shadow-sm hover:shadow-2xl hover:shadow-[#bf953f]/10 transition-all duration-500 border border-white/5 cursor-pointer"
    >
      <div className="relative aspect-video overflow-hidden">
        <img 
          src={course.thumbnail} 
          alt={course.title}
          className="object-cover w-full h-full group-hover:scale-110 transition-transform duration-700 opacity-80 group-hover:opacity-100"
        />
        <div className="absolute top-3 right-3 px-3 py-1 bg-black/60 backdrop-blur rounded text-[10px] font-bold uppercase tracking-widest text-[#bf953f] border border-[#bf953f]/30">
          {course.category}
        </div>
      </div>
      <div className="p-6">
        <div className="flex items-center gap-2 mb-3 text-[10px] text-slate-500 font-bold uppercase tracking-widest">
          <span>{course.difficulty}</span>
          <span>•</span>
          <span className="text-slate-300">{course.instructorName}</span>
        </div>
        <h3 className="text-lg font-bold text-white group-hover:text-[#bf953f] transition-colors mb-4 line-clamp-1 uppercase tracking-tight">
          {course.title}
        </h3>
        <div className="flex items-center justify-between border-t border-white/5 pt-4">
          <div className="flex items-center gap-2">
            <span className="text-[#bf953f]">★</span>
            <span className="text-sm font-bold text-white">{course.rating}</span>
            <span className="text-[10px] text-slate-500 font-medium">({course.studentsCount} Students)</span>
          </div>
          <div className="text-[10px] font-bold text-[#bf953f] uppercase tracking-widest">
            Admissions Open
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseCard;
