
import React, { useEffect, useState } from 'react';
import { supabase } from '../../lib/supabaseClient';
import { PROFILE_IMAGE_URL } from '../../constants';

interface ProfilePictureProps {
  className?: string;
  alt?: string;
  imageRef?: React.Ref<HTMLImageElement>;
}

/**
 * ProfilePicture Component
 * Renders the user's profile image.
 * Tries to fetch dynamic URL from Supabase first, falls back to constant.
 */
const ProfilePicture: React.FC<ProfilePictureProps> = ({
  className = "",
  alt = "Vijay Profile",
  imageRef
}) => {
  const [imgUrl, setImgUrl] = useState(PROFILE_IMAGE_URL);

  useEffect(() => {
    const fetchAvatar = async () => {
      const { data } = await supabase.from('profiles').select('avatar_url').single();
      if (data && data.avatar_url) {
        setImgUrl(data.avatar_url);
      }
    };
    fetchAvatar();
  }, []);

  return (
    <img
      ref={imageRef}
      src={imgUrl}
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
