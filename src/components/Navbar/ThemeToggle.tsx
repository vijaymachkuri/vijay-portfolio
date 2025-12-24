import React from 'react';
import { Sun, Moon } from 'lucide-react';

interface ThemeToggleProps {
    theme: 'dark' | 'light';
    toggleTheme: () => void;
    className?: string;
}

const ThemeToggle: React.FC<ThemeToggleProps> = ({ theme, toggleTheme, className = "" }) => {
    return (
        <button
            onClick={toggleTheme}
            className={`p-2 rounded-full hover:bg-gray-800/50 transition-colors bg-opacity-20 ${className}`}
            aria-label="Toggle Theme"
        >
            {theme === 'dark' ? <Sun size={18} className="text-nth-white" /> : <Moon size={18} className="text-nth-black" />}
        </button>
    );
};

export default ThemeToggle;
