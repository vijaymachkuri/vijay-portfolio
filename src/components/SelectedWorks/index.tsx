import React, { useEffect, useRef, useState } from 'react';
import { supabase } from '../../lib/supabaseClient';
import { Project } from '../../types';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import ProjectCard from './ProjectCard';

gsap.registerPlugin(ScrollTrigger);

/**
 * Projects Component
 * Lists the selected works using ProjectCards.
 * Uses GSAP to slide projects in from sides.
 */
const SelectedWorks: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [projects, setProjects] = useState<Project[]>([]);

  useEffect(() => {
    const fetchProjects = async () => {
      const { data } = await supabase.from('projects').select('*').order('id', { ascending: true });
      if (data) setProjects(data);
    };
    fetchProjects();
  }, []);

  useEffect(() => {
    if (projects.length === 0) return;

    // Slight delay to allow DOM to render before animating
    const timer = setTimeout(() => {
      ScrollTrigger.refresh(); // Force recalculation of positions
      const ctx = gsap.context(() => {
        projects.forEach((_, i) => {
          gsap.from(`#project-${i}`, {
            scrollTrigger: {
              trigger: `#project-${i}`,
              start: "top bottom", // Trigger when top of element hits bottom of viewport
              toggleActions: "play none none reverse"
            },
            x: i % 2 === 0 ? -30 : 30,
            autoAlpha: 0,
            duration: 0.6,
            ease: "power2.out"
          });
        });
      }, containerRef);
      return () => ctx.revert();
    }, 300); // Increased timeout to 300ms
    return () => clearTimeout(timer);
  }, [projects]);

  return (
    <section id="selected-works" ref={containerRef} className="pt-4 pb-24 px-6 md:px-20 border-t border-nth-border relative overflow-hidden transition-colors duration-300">
      <div className="flex justify-between items-end mb-16">
        <div>
          <h2 className="text-4xl md:text-6xl font-bold text-nth-white tracking-tighter">
            SELECTED <br /> WORK<span className="text-nth-red animate-pulse">_</span>
          </h2>
        </div>
        <div className="hidden md:block font-mono text-xs text-gray-500 text-right">
          SCROLL TO EXPLORE<br />
          v2.0.24
        </div>
      </div>

      <div className="space-y-16">
        {projects.map((project, index) => (
          <ProjectCard key={project.id} project={project} index={index} />
        ))}
      </div>
    </section>
  );
};

export default SelectedWorks;