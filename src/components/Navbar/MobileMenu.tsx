import React from 'react';
import { NAV_LINKS } from '../../constants';

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

/**
 * MobileMenu Component
 * Full-width dropdown menu for mobile devices.
 * Animates in when isOpen is true.
 */
const MobileMenu: React.FC<MobileMenuProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="absolute top-full left-0 w-full bg-nth-black border-b border-nth-border p-6 flex flex-col gap-4 animate-in slide-in-from-top-4 duration-300 md:hidden z-40">
        {NAV_LINKS.map((link) => (
            <a 
                key={link.name}
                href={link.href}
                onClick={onClose}
                className="font-mono text-nth-white hover:text-nth-red text-lg"
            >
                {link.name}
            </a>
        ))}
    </div>
  );
};

export default MobileMenu;