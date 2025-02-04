import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Dashboard = () => {
  const [data, setData] = useState(null);
  const token = localStorage.getItem('authToken');
  if (!token) {
    console.error('No authentication token found!');
    // Redirect to login or show an error message
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/dashboard', {
          // headers: { Authorization: `Bearer ${token}` },
        });
        setData(response.data);
      } catch (err) {
        console.error('Error fetching dashboard data:', err);
      }
    };

    fetchData();
  }, []);

  return (
      <div>
        <h1>Dating Dashboard</h1>
        <p>Welcome to your dashboard! Here you can manage your profile and explore matches.</p>
        {data ? (
            <pre>{JSON.stringify(data, null, 2)}</pre>
        ) : (
             <p>Loading...</p>
         )}
      </div>
  );
};

export default Dashboard;