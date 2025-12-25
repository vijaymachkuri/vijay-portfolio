import React, { useEffect, useRef, useState } from 'react';
import { supabase } from '../../lib/supabaseClient';
import { Skill } from '../../types';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import TerminalBox from './TerminalBox';
import SkillCard from './SkillCard';

gsap.registerPlugin(ScrollTrigger);

/**
 * Skills Component
 * Displays the technical arsenal in a grid format along with a decorative terminal.
 */
const TechnicalArsenal: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [skills, setSkills] = useState<Skill[]>([]);

  useEffect(() => {
    const fetchSkills = async () => {
      const { data } = await supabase.from('skills').select('*');
      if (data) setSkills(data);
    };
    fetchSkills();
  }, []);

  // Group skills by category
  const categories = Array.from(new Set(skills.map(s => s.category)));

  useEffect(() => {
    if (categories.length === 0) return;

    // Slight delay to allow DOM to render before animating
    const timer = setTimeout(() => {
      ScrollTrigger.refresh();
      const ctx = gsap.context(() => {
        // Animate skill categories
        categories.forEach((category) => {
          gsap.from(`.skill-category-${category}`, {
            scrollTrigger: {
              trigger: (`.category-header-${category}`),
              start: "top 95%",
              toggleActions: "play none none reverse"
            },
            y: 5, // Minimalistic movement
            autoAlpha: 0,
            duration: 0.8, // Smoother, slower fade
            stagger: 0.05,
            ease: "power1.out" // Softer ease
          });
        });

        // Animate the terminal lines (inside TerminalBox, but triggered here)
        gsap.from(".terminal-line", {
          scrollTrigger: {
            trigger: ".terminal-box",
            start: "top 90%"
          },
          x: -20,
          opacity: 0,
          stagger: 0.1, // Faster terminal typing
          duration: 0.3
        });

      }, containerRef);
      return () => ctx.revert();
    }, 300);
    return () => clearTimeout(timer);
  }, [categories]);

  return (
    <section id="technical-arsenal" ref={containerRef} className="py-24 px-6 md:px-20 relative border-t border-nth-border bg-nth-black/80 backdrop-blur-sm transition-colors duration-300">
      <div className="flex flex-col xl:flex-row gap-16 mb-20">
        <div className="xl:w-1/2">
          <h2 className="text-4xl md:text-5xl font-bold text-nth-white mb-6 tracking-tighter">
            TECHNICAL<br /><span className="text-nth-red">ARSENAL</span>
          </h2>
          <p className="text-gray-500 max-w-lg text-lg leading-relaxed">
            A comprehensive suite of tools and technologies I utilize to bring digital concepts to life.
            From neural networks to responsive frontends.
          </p>
        </div>

        {/* Decorative Terminal */}
        <div className="xl:w-1/2 w-full">
          <TerminalBox />
        </div>
      </div>

      <div className="space-y-16">
        {categories.map((category) => (
          <div key={category} className={`category-section-${category}`}>
            <h3 className={`category-header-${category} text-xl font-mono text-nth-red mb-6 border-b border-nth-border pb-2 inline-block uppercase tracking-widest`}>
                    // {category}
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
              {skills.filter(s => s.category === category).map((skill, idx) => (
                <div key={idx} className={`skill-category-${category}`}>
                  <SkillCard skill={skill} />
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default TechnicalArsenal;