// File: ProfileDashboard.jsx
import React, { useEffect, useState } from "react";
import ProfileImage from "./ProfileImage.jsx";
import MemberInfo from "./MemberInfo.jsx";
import AboutMe from './AboutMe.jsx';
import Note from './Note.jsx';
import axios from "axios";

const ProfileDashboard = () => {
  const [userData, setUserData] = useState(null);
  const token = localStorage.getItem("authToken");

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const apiUrl = import.meta.env.VITE_APP_BASE_URL;
        const response = await axios.get(`${apiUrl}/api/members/`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUserData(response.data);
      } catch (error) {
        console.error("Error fetching user profile:", error);
      }
    };

    fetchUserData();
  }, []);

 return (
      <div className="profile-dashboard">
        <h1>Profile Dashboard</h1>
        {userData ? (
            <>
              <ProfileImage profileImageUrl={userData.profileImageUrl} />
              <MemberInfo user={userData} />
              <AboutMe user={userData.aboutme} />
              <Note userId={userData._id} />
            </>
        ) : (
             <p>Loading...</p>
         )}
      </div>
  );
};

export default ProfileDashboard;