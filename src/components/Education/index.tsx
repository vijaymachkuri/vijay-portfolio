import React, { useEffect, useRef, useState } from 'react';
import { supabase } from '../../lib/supabaseClient';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import EducationCard from './EducationCard';
import AchievementsList from './AchievementsList';

gsap.registerPlugin(ScrollTrigger);

/**
 * Education Component
 * Displays education history and achievements.
 */
const Education: React.FC = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const [education, setEducation] = useState<any[]>([]);

    useEffect(() => {
        const fetchEducation = async () => {
            const { data } = await supabase.from('education').select('*').order('id', { ascending: false });
            if (data) setEducation(data);
        };
        fetchEducation();
    }, []);

    useEffect(() => {
        if (education.length === 0) return;
        const ctx = gsap.context(() => {
            gsap.from(".edu-item", {
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: "top 80%",
                },
                y: 20,
                opacity: 0,
                duration: 0.8,
                stagger: 0.2,
                ease: "power2.out"
            });
        }, containerRef);
        return () => ctx.revert();
    }, [education]);

    return (
        <section id="education" ref={containerRef} className="py-24 px-6 md:px-20 bg-nth-black border-t border-nth-border relative overflow-hidden transition-colors duration-300">
            <div className="absolute left-0 top-1/4 w-2 h-32 bg-nth-red"></div>

            <div className="max-w-4xl mx-auto">
                <h2 className="text-3xl md:text-4xl font-bold text-nth-white mb-12 tracking-tighter flex items-center gap-4">
                    <span className="text-nth-red">03.</span> EDUCATION
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
                    {education.map((edu, idx) => (
                        <EducationCard
                            key={edu.id || idx}
                            degree={edu.degree}
                            school={edu.institution}
                            period={edu.year}
                            grade={edu.description}
                        />
                    ))}
                </div>

                <AchievementsList />
            </div>
        </section>
    );
};

export default Education;
