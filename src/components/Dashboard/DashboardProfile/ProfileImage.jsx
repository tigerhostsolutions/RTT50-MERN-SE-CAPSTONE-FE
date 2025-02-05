// File: ProfileImage.jsx
import React from "react";

const ProfileImage = ({ profileImageUrl }) => {
  return (
      <div className="profile-image">
        <img
            src={profileImageUrl || "https://via.placeholder.com/150"}
            alt="Member Profile"
            width={150}
            height={150}
        />
        <button>Change Profile Picture</button>
      </div>
  );
};

export default ProfileImage;