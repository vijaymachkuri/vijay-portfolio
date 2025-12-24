import React from 'react';

interface NavLinkProps {
    addToRefs?: (el: HTMLAnchorElement | null) => void;
    className?: string;
}

const ContactLink: React.FC<NavLinkProps> = ({ addToRefs, className = "" }) => {
    return (
        <a
            href="#contact"
            ref={addToRefs}
            className={`text-sm font-mono text-gray-400 hover:text-nth-white transition-colors uppercase tracking-wider ${className}`}
        >
            Contact
        </a>
    );
};

export default ContactLink;
