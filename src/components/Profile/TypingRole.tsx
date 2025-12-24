import React, { useState, useEffect } from 'react';

const ROLES = ["AI ENGINEER", "WEB DEVELOPER", "GRAPHICS DESIGNER"];

/**
 * TypingRole Component
 * Handles the typewriter animation logic cycling through different roles.
 */
const TypingRole: React.FC = () => {
  const [text, setText] = useState('');
  const [roleIndex, setRoleIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentRole = ROLES[roleIndex];
    const typeSpeed = isDeleting ? 50 : 150;

    const timeout = setTimeout(() => {
      if (!isDeleting && text === currentRole) {
        // Finished typing, pause then delete
        setTimeout(() => setIsDeleting(true), 2000);
      } else if (isDeleting && text === '') {
        // Finished deleting, move to next role
        setIsDeleting(false);
        setRoleIndex((prev) => (prev + 1) % ROLES.length);
      } else {
        // Typing or deleting
        const nextText = isDeleting 
          ? currentRole.substring(0, text.length - 1) 
          : currentRole.substring(0, text.length + 1);
        setText(nextText);
      }
    }, typeSpeed);

    return () => clearTimeout(timeout);
  }, [text, isDeleting, roleIndex]);

  return (
    <div className="hero-text-element h-12">
        <span className="font-mono text-2xl md:text-3xl text-nth-red bg-nth-white/5 px-2 py-1 border-l-4 border-nth-red">
            {text}<span className="animate-pulse">_</span>
        </span>
    </div>
  );
};

export default TypingRole;