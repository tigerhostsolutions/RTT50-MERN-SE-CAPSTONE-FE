import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Dashboard = () => {
  const [data, setData] = useState(null);
  const token = localStorage.getItem('authToken');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:3000/dashboard', {
          headers: { Authorization: `Bearer ${token}` },
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