// File: UserInfo.jsx
import React, { useState } from "react";

const UserInfo = () => {
  const [userInfo, setUserInfo] = useState({
    name: "John Doe",
    email: "john.doe@example.com",
    phone: "+1234567890",
  });

  return (
      <div className="user-info">
        <h2>User Information</h2>
        <p><strong>Name:</strong> {userInfo.name}</p>
        <p><strong>Email:</strong> {userInfo.email}</p>
        <p><strong>Phone:</strong> {userInfo.phone}</p>
        <button>Edit</button>
      </div>
  );
};

export default UserInfo;