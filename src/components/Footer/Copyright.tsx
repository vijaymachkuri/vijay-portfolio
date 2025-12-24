import React from 'react';

/**
 * Copyright Component
 * Displays the copyright notice and location.
 */
const Copyright: React.FC = () => {
  return (
    <div className="font-mono text-xs text-gray-500 text-center md:text-right">
        © 2024 AI.ENGINEER // SYSTEM.ALL_SYSTEMS_GO <br/>
        <span className="text-[10px] opacity-50">LOCATION: HYD, INDIA</span>
    </div>
  );
};

export default Copyright;