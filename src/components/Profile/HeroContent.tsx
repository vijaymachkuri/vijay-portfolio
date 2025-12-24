import React, { useEffect, useState } from 'react';
import TypingRole from './TypingRole';
import CallToActionButtons from './CallToActionButtons';
import { supabase } from '../../lib/supabaseClient';

/**
 * HeroContent Component
 * Aggregates the text-based content for the Hero section.
 * Includes Name, Introduction, Typing Role animation, and CTAs.
 */
const HeroContent: React.FC = () => {
  const [profile, setProfile] = useState({
    full_name: 'VIJAY MACHKURI',
    first_name: 'VIJAY',
    bio: 'AI & ML Engineer with a passion for building intelligent systems. Ex-Google Intern. Creating seamless digital experiences.'
  });

  useEffect(() => {
    const fetchProfile = async () => {
      const { data } = await supabase.from('profiles').select('*').single();
      if (data) {
        setProfile({
          full_name: (data.full_name || 'VIJAY_MACHKURI').toUpperCase().replace(' ', '_'),
          first_name: (data.full_name || 'VIJAY').split(' ')[0],
          bio: data.bio || 'AI & ML Engineer.'
        });
      }
    };
    fetchProfile();
  }, []);

  return (
    <div className="w-full md:w-1/2 flex flex-col justify-center space-y-6 z-10 order-2 md:order-1 mt-10 md:mt-0">
      {/* Decorative Line & Username */}
      <div className="hero-text-element flex items-center gap-2">
        <span className="h-[1px] w-10 bg-nth-red"></span>
        <span className="font-mono text-nth-red text-sm tracking-widest">{profile.full_name}</span>
      </div>

      {/* Main Heading */}
      <h1 className="hero-text-element text-5xl md:text-7xl font-bold tracking-tight text-nth-white">
        I AM <br />
        <span className="text-transparent bg-clip-text bg-gradient-to-r from-nth-white to-gray-500">
          {profile.first_name}
        </span>
      </h1>

      {/* Typing Effect */}
      <TypingRole />

      {/* Bio Paragraph */}
      <p className="hero-text-element text-gray-500 max-w-md text-sm md:text-base font-light leading-relaxed">
        {profile.bio}
      </p>

      {/* Buttons */}
      <CallToActionButtons />
    </div>
  );
};

export default HeroContent;