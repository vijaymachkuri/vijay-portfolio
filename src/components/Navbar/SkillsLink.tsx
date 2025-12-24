import React from 'react';

interface NavLinkProps {
    addToRefs?: (el: HTMLAnchorElement | null) => void;
    className?: string;
}

const SkillsLink: React.FC<NavLinkProps> = ({ addToRefs, className = "" }) => {
    return (
        <a
            href="#technical-arsenal"
            ref={addToRefs}
            className={`text-sm font-mono text-gray-400 hover:text-nth-white transition-colors uppercase tracking-wider ${className}`}
        >
            Skills
        </a>
    );
};

export default SkillsLink;
