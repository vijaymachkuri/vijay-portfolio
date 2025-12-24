import React from 'react';

interface NavLinkProps {
    addToRefs?: (el: HTMLAnchorElement | null) => void;
    className?: string;
}

const AboutLink: React.FC<NavLinkProps> = ({ addToRefs, className = "" }) => {
    return (
        <a
            href="#experience"
            ref={addToRefs}
            className={`text-sm font-mono text-gray-400 hover:text-nth-white transition-colors uppercase tracking-wider ${className}`}
        >
            About
        </a>
    );
};

export default AboutLink;
