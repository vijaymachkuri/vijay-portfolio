import React from 'react';
import { Github, Linkedin, Mail, Phone } from 'lucide-react';
import { CONTACT_INFO } from '../../constants';

/**
 * SocialLinks Component
 * Displays social media icons with hover effects.
 * Uses CONTACT_INFO for URLs.
 */
const SocialLinks: React.FC = () => {
  return (
    <div className="flex gap-6">
        <a href={CONTACT_INFO.github} target="_blank" rel="noopener noreferrer" className="hover:text-nth-red transition-colors transform hover:-translate-y-1 duration-300">
            <Github size={20} />
        </a>
        <a href={CONTACT_INFO.linkedin} target="_blank" rel="noopener noreferrer" className="hover:text-nth-red transition-colors transform hover:-translate-y-1 duration-300">
            <Linkedin size={20} />
        </a>
        <a href={`mailto:${CONTACT_INFO.email}`} className="hover:text-nth-red transition-colors transform hover:-translate-y-1 duration-300">
            <Mail size={20} />
        </a>
        <a href={`tel:${CONTACT_INFO.phone.replace(/\D/g,'')}`} className="hover:text-nth-red transition-colors transform hover:-translate-y-1 duration-300">
            <Phone size={20} />
        </a>
    </div>
  );
};

export default SocialLinks;