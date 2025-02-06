import React, { useState, useEffect } from 'react';
import axios from 'axios';

const UserProfile = ({ userId }) => {
  const [user, setUser] = useState({});
  const [editing, setEditing] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Fetch the logged-in user's data
    const fetchUserData = async () => {
      try {
        const res = await axios.get(`/api/registration/${userId}`);
        setUser(res.data);
      } catch (error) {
        console.error('Error loading user data', error);
      }
    };
    fetchUserData();
  }, [userId]);

  const handleInputChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSave = async () => {
    setLoading(true);
    try {
      const res = await axios.put(`/api/registration/${userId}`, user);
      setUser(res.data); // Update local state with saved data
      setEditing(false);
    } catch (error) {
      console.error('Error saving user data', error);
    }
    setLoading(false);
  };

  return (
    <div>
      <h2>My Profile</h2>
      <div>
        <label>Name: </label>
        {editing ? (
          <input name="name" value={user.name || ''} onChange={handleInputChange} />
        ) : (
          <span>{user.name}</span>
        )}
      </div>
      <div>
        <label>Email: </label>
        <span>{user.email}</span> {/* Assume email is non-editable */}
      </div>
      <div>
        <label>Age: </label>
        {editing ? (
          <input name="age" value={user.age || ''} onChange={handleInputChange} />
        ) : (
          <span>{user.age}</span>
        )}
      </div>
      <div>
        <label>Gender: </label>
        <span>{user.gender}</span> {/* Assume gender is non-editable */}
      </div>
      <div>
        <label>Profile Photo: </label>
        <img src={user.profileImage} alt="Profile" width="100" height="100" />
      </div>
      {editing ? (
        <>
          <button onClick={handleSave} disabled={loading}>
            {loading ? 'Saving...' : 'Save'}
          </button>
          <button onClick={() => setEditing(false)}>Cancel</button>
        </>
      ) : (
        <button onClick={() => setEditing(true)}>Edit Profile</button>
      )}
    </div>
  );
};

export default UserProfile;