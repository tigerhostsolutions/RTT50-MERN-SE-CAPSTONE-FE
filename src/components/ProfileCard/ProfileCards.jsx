import React from "react";

const ProfileCards = ({ profiles }) => {
  // Ensure profiles.get passed to render correctly
  return (
      <div className="profile-cards">
        {profiles.map((profile) => (
            <div key={profile.id} className="profile-card">
              <h3>{profile.name}</h3>
              <p>{profile.role}</p>
            </div>
        ))}
      </div>
  );
};

export default ProfileCards;