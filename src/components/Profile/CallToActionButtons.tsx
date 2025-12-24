import React from 'react';

/**
 * CallToActionButtons Component
 * Renders the "PROJECTS" and "CONTACT_ME" buttons with complex hover effects.
 */
const CallToActionButtons: React.FC = () => {
  return (
    <div className="hero-text-element pt-4 flex gap-4">
      {/* Projects Button with slanting slide effect */}
      <a href="#selected-works" className="group relative inline-flex items-center justify-start px-6 py-3 overflow-hidden font-mono font-bold transition-all bg-nth-white hover:bg-nth-white border border-nth-white">
        <span className="w-48 h-48 rounded rotate-[-40deg] bg-nth-red absolute bottom-0 left-0 -translate-x-full ease-out duration-500 transition-all translate-y-full mb-9 ml-9 group-hover:ml-0 group-hover:mb-32 group-hover:translate-x-0"></span>
        <span className="relative w-full text-left text-nth-black transition-colors duration-300 ease-in-out group-hover:text-white">PROJECTS</span>
      </a>

      {/* Contact Button with border effect */}
      <a href="#contact" className="group relative inline-flex items-center justify-start px-6 py-3 overflow-hidden font-mono font-bold transition-all bg-transparent border border-nth-border hover:border-nth-white text-nth-white">
        <span className="relative w-full text-left">CONTACT_ME</span>
      </a>
    </div>
  );
};

export default CallToActionButtons;