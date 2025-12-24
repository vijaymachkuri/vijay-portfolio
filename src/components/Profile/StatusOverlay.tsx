import React from 'react';

/**
 * StatusOverlay Component
 * A small decorative box overlaid on the profile image.
 * Shows system ID and Online status.
 */
const StatusOverlay: React.FC = () => {
  return (
    <div className="absolute bottom-6 right-6 bg-nth-black/80 backdrop-blur-md border border-nth-border p-3 z-30">
        <div className="font-mono text-xs text-nth-red font-bold tracking-wider">SYS.ID: 8688-117-488</div>
        <div className="font-mono text-[10px] text-nth-white mt-1">STATUS: ONLINE</div>
    </div>
  );
};

export default StatusOverlay;