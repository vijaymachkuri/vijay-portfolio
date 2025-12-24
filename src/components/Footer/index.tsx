import React from 'react';
import { CONTACT_INFO } from '../../constants';
import SocialLinks from './SocialLinks';
import Copyright from './Copyright';

/**
 * Footer Component
 * The page footer containing contact details, social links, and copyright info.
 */
const Footer: React.FC = () => {
  return (
    <footer className="py-10 px-6 md:px-20 border-t border-nth-border bg-nth-black text-nth-white transition-colors duration-300">
      <div className="flex flex-col md:flex-row justify-between items-center gap-8">

        {/* Left: Contact Details */}
        <div className="flex flex-col items-center md:items-start gap-3">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-nth-red rounded-full animate-pulse"></div>
            <span className="font-mono text-sm text-gray-500">VIJAY MACHKURI</span>
          </div>
          <div className="flex flex-col gap-1 text-center md:text-left">
            <a href={`mailto:${CONTACT_INFO.email}`} className="text-xs text-gray-500 font-mono hover:text-nth-white transition-colors">
              {CONTACT_INFO.email}
            </a>
            <div className="text-xs text-gray-500 font-mono flex items-center gap-2 justify-center md:justify-start">
              <span>{CONTACT_INFO.phone}</span>
            </div>
          </div>
        </div>

        {/* Center: Social Links */}
        <SocialLinks />

        {/* Right: Copyright */}
        <Copyright />
      </div>
    </footer>
  );
};

export default Footer;