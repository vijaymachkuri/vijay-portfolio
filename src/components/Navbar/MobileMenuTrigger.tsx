import React from 'react';

interface MobileMenuTriggerProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

/**
 * MobileMenuTrigger Component
 * A toggle button that displays "MENU" or "CLOSE" based on state.
 * Only visible on mobile breakpoints.
 */
const MobileMenuTrigger: React.FC<MobileMenuTriggerProps> = ({ isOpen, setIsOpen }) => {
  return (
    <button 
      onClick={() => setIsOpen(!isOpen)}
      className="text-nth-white font-mono text-xs border border-nth-border px-3 py-2 hover:bg-nth-white hover:text-nth-black transition-colors"
    >
      {isOpen ? 'CLOSE' : 'MENU'}
    </button>
  );
};

export default MobileMenuTrigger;