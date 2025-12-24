import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import HeroContent from './HeroContent';
import ProfileImage from './ProfileImage';

/**
 * Hero Component
 * The landing section of the portfolio.
 * Responsibilities:
 * - Layout of text content and profile image.
 * - Entrance animations for elements.
 */
const Profile: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);

  // GSAP Entrance Animations
  useEffect(() => {
    const ctx = gsap.context(() => {
      // Image reveal
      gsap.from(imageRef.current, {
        scale: 0.8,
        opacity: 0,
        duration: 1.5,
        ease: "expo.out",
        delay: 0.5
      });

      // Text stagger
      gsap.from(".hero-text-element", {
        y: 50,
        opacity: 0,
        duration: 1,
        stagger: 0.2,
        ease: "power3.out",
        delay: 0.2
      });

    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      id="home"
      ref={containerRef}
      className="min-h-screen flex flex-col md:flex-row items-center justify-center px-6 md:px-20 pt-20 relative overflow-hidden transition-colors duration-300"
    >
      {/* Left Content: Text */}
      <HeroContent />

      {/* Right Content: Image */}
      <div className="w-full md:w-1/2 flex justify-center items-center z-10 order-1 md:order-2">
        <ProfileImage imageRef={imageRef} />
      </div>
    </section>
  );
};

export default Profile;