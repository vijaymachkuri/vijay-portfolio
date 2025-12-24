import React from 'react';
import { Skill } from '../../types';

interface SkillCardProps {
  skill: Skill;
}

/**
 * SkillCard Component
 * Displays a single skill with its category.
 * Hover effect includes a subtle background glitch and opacity changes.
 */
const SkillCard: React.FC<SkillCardProps> = ({ skill }) => {
  return (
    <div
      className="skill-card group relative p-4 md:p-6 border border-nth-border hover:border-nth-red transition-all duration-300 bg-nth-white/5 hover:bg-nth-white/10 overflow-hidden"
    >
      {/* Active Dot Indicator on Hover */}
      <div className="absolute top-0 right-0 p-2 opacity-0 group-hover:opacity-100 transition-opacity">
        <div className="w-2 h-2 bg-nth-red rounded-full"></div>
      </div>

      {skill.icon_url && (
        <div className="mb-2 w-8 h-8 md:w-10 md:h-10">
          <img src={skill.icon_url} alt={skill.name} className="w-full h-full object-contain grayscale group-hover:grayscale-0 transition-all duration-300" />
        </div>
      )}

      <h3 className="text-base md:text-lg font-mono text-nth-white font-bold mt-2 z-10 relative">{skill.name}</h3>
      <p className="text-[10px] md:text-xs text-gray-500 mt-1 font-mono uppercase tracking-wider z-10 relative">{skill.category}</p>

      {/* Hover Glitch Background */}
      <div className="absolute inset-0 bg-nth-red/10 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out z-0"></div>
    </div>
  );
};

export default SkillCard;