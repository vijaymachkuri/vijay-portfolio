import React from 'react';

interface ExperienceItemProps {
  role: string;
  company: string;
  period: string;
  description: string;
}

/**
 * ExperienceItem Component
 * Renders a single node in the experience vertical timeline.
 * Includes the connecting line dot and formatted text.
 */
const ExperienceItem: React.FC<ExperienceItemProps> = ({ role, company, period, description }) => {
  return (
    <div className="timeline-item relative">
        {/* Dot on line */}
        <div className="absolute -left-[39px] md:-left-[55px] top-1 w-3 h-3 bg-nth-black border border-nth-red rounded-full transition-colors duration-300"></div>
        
        <h3 className="text-xl md:text-2xl font-bold text-nth-white">{role}</h3>
        <div className="flex flex-wrap gap-3 my-2 text-sm font-mono">
            <span className="text-nth-red">{company}</span>
            <span className="text-gray-500">|</span>
            <span className="text-gray-500">{period}</span>
        </div>
        <p className="text-nth-white/70 leading-relaxed max-w-lg">
            {description}
        </p>
    </div>
  );
};

export default ExperienceItem;