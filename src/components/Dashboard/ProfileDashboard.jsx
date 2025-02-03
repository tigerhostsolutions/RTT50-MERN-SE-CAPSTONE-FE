// File: ProfileDashboard.jsx
import React from "react";
import ProfileImage from "./ProfileImage";
import UserInfo from "./UserInfo";
import Bio from "./Bio";

const ProfileDashboard = () => {
  return (
      <div className="profile-dashboard">
        <h1>Profile Dashboard</h1>
        <ProfileImage />
        <UserInfo />
        <Bio />
      </div>
  );
};

export default ProfileDashboard;