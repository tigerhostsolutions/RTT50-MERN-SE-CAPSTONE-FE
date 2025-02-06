import React from "react";

const ProfileCards = ({ profiles }) => {
  // Ensure profiles.get passed to render correctly
  return (
      <div className="profile-cards">
        {profiles.map((profile) => (
            <div key={profile.id} className="profile-card">
              <div>{profile.photo}</div>
              <h3>{profile.name}</h3>
              <p>Gender: {profile.gender}</p>
              <p>Age: {profile.age}</p>
              <p>About Me: {profile.bio}</p>
            </div>
        ))}
      </div>
  );
};

export default ProfileCards;