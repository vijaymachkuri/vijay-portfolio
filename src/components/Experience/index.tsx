import React, { useEffect, useRef, useState } from 'react';
import { supabase } from '../../lib/supabaseClient';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import ExperienceItem from './ExperienceItem';

gsap.registerPlugin(ScrollTrigger);

/**
 * Experience Component
 * Displays professional experience in a timeline format.
 */
const Experience: React.FC = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const [experience, setExperience] = useState<any[]>([]);

    useEffect(() => {
        const fetchExperience = async () => {
            const { data } = await supabase.from('experience').select('*').order('id', { ascending: false });
            if (data) setExperience(data);
        };
        fetchExperience();
    }, []);

    useEffect(() => {
        if (experience.length === 0) return;
        const ctx = gsap.context(() => {
            gsap.from(".timeline-item", {
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: "top 70%",
                },
                x: -30,
                opacity: 0,
                duration: 0.8,
                stagger: 0.2,
                ease: "power2.out"
            });
        }, containerRef);
        return () => ctx.revert();
    }, [experience]);

    return (
        <section id="experience" ref={containerRef} className="py-24 px-6 md:px-20 bg-nth-black border-t border-nth-border relative overflow-hidden transition-colors duration-300">
            <div className="absolute right-0 bottom-1/4 w-full h-[1px] bg-nth-white/10"></div>

            <div className="max-w-4xl mx-auto">
                <h2 className="text-3xl md:text-4xl font-bold text-nth-white mb-12 tracking-tighter flex items-center gap-4">
                    <span className="text-nth-red">02.</span> EXPERIENCE
                </h2>

                <div className="space-y-12 border-l border-nth-border ml-2 pl-8 md:pl-12">
                    {experience.map((exp, idx) => (
                        <ExperienceItem
                            key={exp.id || idx}
                            role={exp.role}
                            company={exp.company}
                            period={exp.duration}
                            description={exp.description}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Experience;
