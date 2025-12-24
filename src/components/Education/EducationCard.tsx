import React from 'react';

interface EducationCardProps {
  degree: string;
  school: string;
  period: string;
  grade: string;
}

/**
 * EducationCard Component
 * Displays education information in a styled box.
 * Hover effect highlights the border.
 */
const EducationCard: React.FC<EducationCardProps> = ({ degree, school, period, grade }) => {
  return (
    <div className="edu-item bg-nth-white/5 border border-nth-border p-6 hover:border-nth-red transition-colors duration-300">
         <div className="flex justify-between items-start mb-2">
            <h4 className="text-lg font-bold text-nth-white">{degree}</h4>
            <span className="text-xs font-mono text-nth-red border border-nth-red/30 px-2 py-1 rounded">{grade}</span>
         </div>
         <p className="text-sm text-nth-white/70 font-mono mb-1">{school}</p>
         <p className="text-xs text-gray-500">{period}</p>
    </div>
  );
};

export default EducationCard;