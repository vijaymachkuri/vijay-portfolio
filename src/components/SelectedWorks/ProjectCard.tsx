import React from 'react';
import { ArrowUpRight } from 'lucide-react';
import { Project } from '../../types';

interface ProjectCardProps {
  project: Project;
  index: number;
}

/**
 * ProjectCard Component
 * Displays project details including a large image and description.
 * Alternates layout orientation based on index (left/right).
 * Supports lazy loading for images.
 */
const ProjectCard: React.FC<ProjectCardProps> = ({ project, index }) => {
  return (
    <div
      id={`project-${index}`}
      className={`flex flex-col ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'} gap-8 md:gap-16 items-center`}
    >
      {/* Image Side */}
      <a
        href={project.link}
        target="_blank"
        rel="noopener noreferrer"
        className="w-full md:w-3/5 group relative overflow-hidden cursor-pointer block"
      >
        <div className="absolute inset-0 bg-nth-red/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20 mix-blend-overlay"></div>
        <img
          src={project.image_url}
          alt={project.title}
          loading="lazy"
          className="w-full h-[300px] md:h-[400px] object-cover grayscale group-hover:grayscale-0 transition-all duration-500 scale-100 group-hover:scale-105"
        />
        <div className="absolute top-4 left-4 z-30 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div className="bg-nth-black text-nth-white text-xs font-mono px-2 py-1">
            VIEW_CASE_STUDY
          </div>
        </div>
      </a>

      {/* Content Side */}
      <div className="w-full md:w-2/5 space-y-4">
        <div className="font-mono text-nth-red text-sm">0{index + 1} // {project.tech[0]}</div>
        <a
          href={project.link}
          target="_blank"
          rel="noopener noreferrer"
          className="text-3xl font-bold text-nth-white group hover:text-nth-red transition-colors flex items-center gap-2 cursor-pointer inline-flex"
        >
          {project.title}
          <ArrowUpRight className="opacity-0 group-hover:opacity-100 transition-opacity text-nth-red" size={24} />
        </a>
        <p className="text-nth-white/70 leading-relaxed font-light">
          {project.description}
        </p>
        <div className="flex flex-wrap gap-2 pt-2">
          {project.tech.map(t => (
            <span key={t} className="text-xs font-mono text-gray-500 border border-nth-border px-2 py-1 rounded-sm">
              {t}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;