import React from 'react';

/**
 * TerminalBox Component
 * A decorative component mimicking a command line interface.
 * Displays "scanning" steps for skills.
 */
const TerminalBox: React.FC = () => {
  return (
    <div className="md:w-1/2 terminal-box bg-nth-black border border-nth-border p-4 font-mono text-xs md:text-sm text-gray-500 shadow-2xl">
        {/* Terminal Window Controls */}
        <div className="flex gap-2 mb-4 border-b border-nth-border pb-2">
            <div className="w-3 h-3 rounded-full bg-red-500"></div>
            <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
            <div className="w-3 h-3 rounded-full bg-green-500"></div>
        </div>
        
        {/* Terminal Content */}
        <div className="space-y-1">
            <div className="terminal-line"><span className="text-green-500">➜</span> <span className="text-blue-400">~</span> scan --skills --verbose</div>
            <div className="terminal-line text-gray-500">Scanning dependencies...</div>
            <div className="terminal-line">Loaded: <span className="text-nth-white">TensorFlow, PyTorch</span> [v2.4]</div>
            <div className="terminal-line">Loaded: <span className="text-nth-white">React, Next.js</span> [Stable]</div>
            <div className="terminal-line">Cloud Status: <span className="text-nth-red">AWS, GCP Connected</span></div>
            <div className="terminal-line animate-pulse">_</div>
        </div>
    </div>
  );
};

export default TerminalBox;