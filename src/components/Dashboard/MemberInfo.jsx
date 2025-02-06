// File: UserInfo.jsx
import React, { useEffect, useState } from "react";
import ProfileSummary from "../../partials/profileSummary.jsx"; // Reusable
// Component
import axios from "axios"; // For API calls

const MemberInfo = ({ memberId }) => {
  const [userInfo, setUserInfo] = useState(null); // Initialize state for user data
  const [loading, setLoading] = useState(true); // State for loading status
  const [error, setError] = useState(null); // State for handling errors

  // Fetch user information from the database
  useEffect(() => {
    const fetchMemberInfo = async () => {
      try {
        const response = await axios.get(`/api/members/${memberId}`); // Replace
        // with your API route
        setUserInfo(response.data);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching the member info:", err);
        setError("Failed to fetch member details.");
        setLoading(false);
      }
    };

    fetchMemberInfo(); // Call the fetch function
  }, [memberId]);

  if (loading) return <p>Loading...</p>; // Show loading state

  if (error) return <p>{error}</p>; // Show error state

  if (!userInfo) return <p>No member information found.</p>; // Handle case
  // if no data is retrieved

  return (
      <div className="user-info-container">
        {/* Use ProfileSummary to display user information */}
        <ProfileSummary member={memberInfo} expandDetails={true} />

        {/* Additional Info */}
        <div className="additional-info">
          <p>
            <label>Hobbies:</label> {memberInfo.hobbies ? memberInfo.hobbies.join(", ") : "Not" +
              " Provided"}
          </p>
          <p>
            <label>Occupation:</label> {memberInfo.occupation || "Not Provided"}
          </p>
        </div>

        {/* Action Buttons */}
        <button className="message-button">Send Message</button>
        <button className="edit-button">Edit</button>
      </div>
  );
};

export default MemberInfo;