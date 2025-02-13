import React, { useState } from "react";
import './AboutMe.css'


const AboutMe = () => {
  const [bio, setBio] = useState("Hello! This is my short bio.");

  const handleEdit = () => {
    const updatedBio = prompt("Edit your bio:", bio);
    if (updatedBio !== null) {
      setBio(updatedBio);
    }
  };

  return (
      <div className="user-bio">
        <h2>Bio</h2>
        <p>{bio}</p>
        <button onClick={handleEdit}>Edit Bio</button>
      </div>
  );
};

export default AboutMe;