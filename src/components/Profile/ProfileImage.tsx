import React from 'react';
import StatusOverlay from './StatusOverlay';
import ProfilePicture from '../common/ProfilePicture';

interface ProfileImageProps {
  imageRef: React.RefObject<HTMLImageElement | null>;
}

/**
 * ProfileImage Component
 * Displays the user's profile picture with decorative borders and corner markers.
 * Uses the common ProfilePicture component for the actual image rendering.
 */
const ProfileImage: React.FC<ProfileImageProps> = ({ imageRef }) => {
  return (
    <div className="relative w-72 h-72 md:w-[450px] md:h-[450px] group">
        {/* Decorative Grid Behind */}
        <div className="absolute inset-0 border border-nth-border translate-x-4 translate-y-4 md:translate-x-8 md:translate-y-8 z-0"></div>
        
        {/* Corner Markers */}
        <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-nth-border transition-all group-hover:w-12 group-hover:h-12 border-nth-red"></div>
        <div className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-nth-border transition-all group-hover:w-12 group-hover:h-12 border-nth-red"></div>
        
        {/* Image Container */}
        <div className="relative w-full h-full overflow-hidden bg-nth-black border border-nth-border">
            <ProfilePicture 
              imageRef={imageRef}
              className="w-full h-full z-10 relative transition-transform duration-700 hover:scale-105 brightness-110"
            />
        </div>
        
        {/* Status Overlay Component */}
        <StatusOverlay />
    </div>
  );
};

export default ProfileImage;
