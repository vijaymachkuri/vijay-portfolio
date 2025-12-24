import React from 'react';

/**
 * Logo Component
 * Displays the "VJ" square logo and the text "VIJAY.DEV".
 * Includes hover animation on the square logo (rotation) and text color change.
 */
const Logo: React.FC = () => {
  return (
    <div 
      className="flex items-center gap-2 group cursor-pointer" 
      onClick={() => window.scrollTo(0,0)}
    >
      {/* Animated Square Container */}
      <div className="w-8 h-8 bg-nth-red flex items-center justify-center rounded-sm transition-transform group-hover:rotate-180 duration-500">
         <span className="font-mono text-white text-xs font-bold">VJ</span>
      </div>
      
      {/* Text Logo */}
      <div className="font-mono text-xl tracking-tighter font-bold text-nth-white group-hover:text-nth-red transition-colors duration-300">
        VIJAY<span className="text-nth-red">.</span>DEV
      </div>
    </div>
  );
};

export default Logo;