import React from "react";
import axios from "axios";

const ProfileImage = ({ profileImageUrl }) => {
  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("profileImage", file);

    try {
      const response = await axios.post(`/api/members/profile-image/${id}`, formData);
      console.log("Image uploaded successfully:", response.data);
    } catch (error) {
      console.error("Error uploading image:", error);
    }
  };

  return (
      <div className="profile-image">
        <img
            src={profileImageUrl || "https://api.dicebear.com/5.x/initials/svg?seed="}
            alt="Member Profile"
            width={150}
            height={150}
        />
        <button>
          <label htmlFor="image-upload">Change Profile Picture</label>
          <input
              id="image-upload"
              type="file"
              style={{ display: "none" }}
              onChange={handleImageUpload}
          />
        </button>
      </div>
  );
};

export default ProfileImage;