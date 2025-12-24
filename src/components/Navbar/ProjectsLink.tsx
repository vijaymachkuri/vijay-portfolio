import React from 'react';

interface NavLinkProps {
    addToRefs?: (el: HTMLAnchorElement | null) => void;
    className?: string;
}

const ProjectsLink: React.FC<NavLinkProps> = ({ addToRefs, className = "" }) => {
    return (
        <a
            href="#selected-works"
            ref={addToRefs}
            className={`text-sm font-mono text-gray-400 hover:text-nth-white transition-colors uppercase tracking-wider ${className}`}
        >
            Projects
        </a>
    );
};

export default ProjectsLink;
