import React from 'react';

/**
 * AchievementsList Component
 * Displays a list of notable achievements.
 */
const AchievementsList: React.FC = () => {
  return (
    <div className="mt-12 edu-item">
        <h3 className="text-xl font-bold text-nth-white mb-4">ACHIEVEMENTS</h3>
        <ul className="list-disc list-inside text-nth-white/70 space-y-2 text-sm">
            <li><span className="text-nth-white font-semibold">SIH (Smart India Hackathon)</span> - Participation Award</li>
            <li>Completed comprehensive <span className="text-nth-white font-semibold">Cybersecurity workshop</span></li>
        </ul>
    </div>
  );
};

export default AchievementsList;