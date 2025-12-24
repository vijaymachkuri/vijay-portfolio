import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import Logo from './Logo';
import MobileMenuTrigger from './MobileMenuTrigger';
import MobileMenu from './MobileMenu';

// Individual Components
import HomeLink from './HomeLink';
import AboutLink from './AboutLink';
import SkillsLink from './SkillsLink';
import ProjectsLink from './ProjectsLink';
import ContactLink from './ContactLink';
import ResumeLink from './ResumeLink';
import ThemeToggle from './ThemeToggle';

interface NavbarProps {
  theme: 'dark' | 'light';
  toggleTheme: () => void;
}

/**
 * Navbar Component
 * Reorganized to granularly include HOME, ABOUT, SKILLS, PROJECTS, CONTACT, RESUME, THEME.
 */
const Navbar: React.FC<NavbarProps> = ({ theme, toggleTheme }) => {
  const navRef = useRef<HTMLDivElement>(null);
  const linksRef = useRef<(HTMLAnchorElement | null)[]>([]);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(navRef.current, {
        y: -100,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
        delay: 0.5
      });

      // Animate links
      gsap.from(linksRef.current, {
        y: -20,
        opacity: 0,
        duration: 0.5,
        stagger: 0.1,
        delay: 0.8,
        ease: "power2.out"
      });
    }, navRef);

    return () => ctx.revert();
  }, []);

  const addToRefs = (el: HTMLAnchorElement | null) => {
    if (el && !linksRef.current.includes(el)) {
      linksRef.current.push(el);
    }
  };

  return (
    <nav
      ref={navRef}
      className="fixed top-0 left-0 w-full z-50 flex justify-between items-center px-6 py-6 md:px-12 backdrop-blur-md border-b border-nth-border bg-nth-black/30 transition-colors duration-300"
    >
      {/* Logo Section */}
      <Logo />

      {/* Desktop Links Section */}
      <div className="hidden md:flex gap-8 items-center">
        <HomeLink addToRefs={addToRefs} />
        <AboutLink addToRefs={addToRefs} />
        <SkillsLink addToRefs={addToRefs} />
        <ProjectsLink addToRefs={addToRefs} />
        <ContactLink addToRefs={addToRefs} />

        <div className="h-4 w-[1px] bg-gray-700"></div>

        <ResumeLink />

        {/* Theme Toggle Button */}
        <ThemeToggle theme={theme} toggleTheme={toggleTheme} className="ml-2" />
      </div>

      {/* Mobile Menu Trigger */}
      <div className="md:hidden flex items-center gap-4">
        <ThemeToggle theme={theme} toggleTheme={toggleTheme} />
        <MobileMenuTrigger isOpen={mobileMenuOpen} setIsOpen={setMobileMenuOpen} />
      </div>

      {/* Mobile Menu Overlay */}
      <MobileMenu isOpen={mobileMenuOpen} onClose={() => setMobileMenuOpen(false)} />
    </nav>
  );
};

export default Navbar;