import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Dashboard = () => {
  const [data, setData] = useState(null);
  const [profiles, setProfiles] = useState([]);
  const [loadingProfiles, setLoadingProfiles] = useState(true);
  const token = localStorage.getItem('authToken');

  useEffect(() => {
    if (!token) {
      console.error('No authentication token found! Redirecting to login...');
      // Redirect to login or handle unauthorized access
      return;
    }

    const fetchData = async () => {
      try {
        // Fetch general dashboard data
        const apiUrl = import.meta.env.VITE_APP_BASE_URL;
        if (!apiUrl) {
          throw new Error('API base URL is not configured in environment variables.');
        }

        const response = await axios.get(`${apiUrl}/api/dashboard`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setData(response.data);

        // Fetch profiles for dashboard
        const profilesResponse = await axios.get(`${apiUrl}/api/dashboard/profiles`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setProfiles(profilesResponse.data.profiles);

      } catch (err) {
        console.error('Error fetching dashboard data:', err);
      } finally {
        setLoadingProfiles(false);
      }
    };

    fetchData();
  }, [token]);

  return (
      <div>
        <h1>Dashboard</h1>
        <p>Welcome to your dashboard! Here you can manage your profile and explore matches.</p>
        {data ? (
            <pre>{JSON.stringify(data, null, 2)}</pre>
        ) : (
             <p>Loading general dashboard data...</p>
         )}

        <h2>Your Profiles</h2>
        {loadingProfiles ? (
            <p>Loading profiles...</p>
        ) : (
            <div className="profiles-grid">
              {profiles.map((profile) => (
                  <div key={profile.id} className="profile-card">
                    <h3>{profile.name}</h3>
                    <p>{profile.bio}</p>
                    <button
                        onClick={() => {
                          window.location.href = `api/dashboard/profile?id=${profile.id}`;
                        }}
                    >
                      View Profile
                    </button>
                  </div>
              ))}
            </div>
         )}
      </div>
  );
};

export default Dashboard;