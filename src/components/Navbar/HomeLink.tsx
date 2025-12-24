import React from 'react';

interface NavLinkProps {
    addToRefs?: (el: HTMLAnchorElement | null) => void;
    className?: string;
}

const HomeLink: React.FC<NavLinkProps> = ({ addToRefs, className = "" }) => {
    return (
        <a
            href="#home"
            ref={addToRefs}
            className={`text-sm font-mono text-gray-400 hover:text-nth-white transition-colors uppercase tracking-wider ${className}`}
        >
            Home
        </a>
    );
};

export default HomeLink;
