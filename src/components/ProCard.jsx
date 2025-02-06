import React, { useState } from "react";
import axios from "axios";

const ProfileCards = ({ profiles }) => {
  // State to track selected profiles
  const [selectedProfiles, setSelectedProfiles] = useState([]);

  // Function to toggle selection
  const handleCheckboxToggle = (id) => {
    setSelectedProfiles((prevSelectedProfiles) =>
        prevSelectedProfiles.includes(id)
        ? prevSelectedProfiles.filter((profileId) => profileId !== id) // Remove if already selected
        : [...prevSelectedProfiles, id] // Add if not selected
    );
  };

  // Function to delete selected profiles
  const handleDelete = async () => {
    if (window.confirm("Are you sure you want to delete selected profiles?")) {
      try {
        // Send DELETE request to backend
        const response = await axios.delete("/api/members/:id", {
          data: { profileIds: selectedProfiles },
        });

        console.log(response.data.message); // Log success message from backend

        // Filter out deleted profiles from UI
        const remainingProfiles = profiles.filter(
            (profile) => !selectedProfiles.includes(profile.id)
        );

        setSelectedProfiles([]); // Clear selections after deletion
      } catch (error) {
        console.error("Error deleting profiles:", error.message || error);
        alert("An error occurred while deleting profiles.");
      }
    }
  };

  return (
      <div>
        <div>
          {profiles.map((profile) => (
              <div key={profile.id} style={{ display: "flex", alignItems: "center", marginBottom: "10px" }}>
                <input
                    type="checkbox"
                    checked={selectedProfiles.includes(profile.id)}
                    onChange={() => handleCheckboxToggle(profile.id)}
                    style={{ marginRight: "10px" }}
                />
                <div style={{ display: "flex", alignItems: "center" }}>
                  <div>
                    <strong>{profile.name}</strong>
                    <p>{profile.description}</p>
                  </div>
                </div>
              </div>
          ))}
        </div>
        <button
            onClick={handleDelete}
            disabled={selectedProfiles.length === 0}
            style={{
              marginTop: "10px",
              padding: "10px",
              backgroundColor: selectedProfiles.length > 0 ? "red" : "grey",
              color: "white",
              border: "none",
              cursor: selectedProfiles.length > 0 ? "pointer" : "not-allowed",
            }}
        >
          Delete Selected
        </button>
      </div>
  );
};

// Example data
const profilesData = [
  { id: 1, name: "John Doe", description: "Web Developer" },
  { id: 2, name: "Jane Doe", description: "Graphic Designer" },
  { id: 3, name: "Alice Bob", description: "UI/UX Designer" },
];

export default function App() {
  return <ProfileCards profiles={profilesData} />;
}