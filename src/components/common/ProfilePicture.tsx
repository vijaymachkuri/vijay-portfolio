
import React from 'react';
import { PROFILE_IMAGE_URL } from '../../constants';

interface ProfilePictureProps {
  className?: string;
  alt?: string;
  imageRef?: React.Ref<HTMLImageElement>;
}

/**
 * ProfilePicture Component
 * Renders the user's profile image using the constant URL.
 */
const ProfilePicture: React.FC<ProfilePictureProps> = ({ 
  className = "", 
  alt = "Vijay Profile",
  imageRef
}) => {
  return (
    <img 
      ref={imageRef}
      src={PROFILE_IMAGE_URL} 
      onError={(e) => {
        // Fallback to a generated avatar if the link fails
        e.currentTarget.src = "https://ui-avatars.com/api/?name=Vijay+Machkuri&background=D71920&color=fff&size=500";
      }}
      alt={alt} 
      className={`object-cover object-top ${className}`}
    />
  );
};

export default ProfilePicture;
