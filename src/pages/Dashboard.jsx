import React, {useState, useEffect} from 'react';
import axios from 'axios';
import ProfileCards from '../components/ProfileCard/ProfileCards.jsx';

const Dashboard = () => {
  const [aboutMe, setAboutMe] = useState('');
  const [loading, setLoading] = useState(true);
  const [editMode, setEditMode] = useState(false);
  const token = localStorage.getItem('authToken');
  const apiUrl = import.meta.env.VITE_APP_BASE_URL;

  // Fetches the "About Me" data
  const fetchAboutMe = async () => {
    try {
      console.log('API URL:', apiUrl);
      console.log('Token:', token);

      if (!token) {
        console.error('Token is missing. User may not be authenticated.');
        alert('Please log in to access this feature.');
        return;
      }

      const response = await axios.get(`${apiUrl}/api/members/aboutMe`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      console.log('Server Response:', response.data);
      setAboutMe(response.data.bio || '');
    } catch (error) {
      if (error.response?.data?.error === 'jwt expired') {
        alert('Session expired. Please log in again.');
        localStorage.removeItem('authToken');
        window.location.href = '/login'; // Redirect to Login page
      } else {
        console.error('Error fetching About Me:', error);
        alert('Failed to fetch About Me. Please try again.');
      }
    } finally {
      setLoading(false); // Ensures "loading" is turned off
    }
  };

  // Updates the "About Me" data
  const updateAboutMe = async () => {
    try {
      await axios.patch(
          `${apiUrl}/api/members/aboutMe`,
          {bio: aboutMe},
          {headers: {Authorization: `Bearer ${token}`}},
      );

      alert('About Me updated successfully!');
      setEditMode(false);
    }
    catch (error) {
      console.error('Error updating About Me:', error);
    }
  };

  // Run fetchAboutMe on component mount
  useEffect(() => {
    fetchAboutMe();
  }, []);

  return (
      <div>
        <h1>Dashboard</h1>

        {/* Profile Cards Section */}
        <section>
          <h2>Profile Cards</h2>
          <ProfileCards />
        </section>

        {/* About Me Section */}
        <section>
          <h2>About Me</h2>
          {loading ? (
              <p>Loading...</p>
          ) : editMode ? (
              <div>
            <textarea
                value={aboutMe}
                onChange={(e) => setAboutMe(e.target.value)}
                rows={5}
                cols={50}
                placeholder="Write something about yourself..."
            />
                <br />
                <button onClick={updateAboutMe}>Save</button>
                <button onClick={() => setEditMode(false)}>Cancel</button>
              </div>
          ) : (
                  <div>
                    <p>{aboutMe || 'No About Me content added yet.'}</p>
                    <button onClick={() => setEditMode(true)}>Edit</button>
                  </div>
              )}
        </section>
      </div>
  );
};

export default Dashboard; // <- Moved to the top level