import React from 'react';

const Registration = () => {
  return (
      <div>
        <h1>Register</h1>
        <form>
          <label>Name:</label>
          <input type="text" name="name" />
          <br />
          <label>Age:</label>
          <input type="number" name="age" />
          <br />
          <label>Gender:</label>
          <select name="gender">
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>
          <br />
          <label>Email:</label>
          <input type="email" name="email" />
          <br />
          <button type="submit">Register</button>
        </form>
      </div>
  );
};

export default Registration;