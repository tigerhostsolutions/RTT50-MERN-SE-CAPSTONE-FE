import React from 'react';

const Login = () => {
  return (
      <div>
        <h1>Login</h1>
        <form>
          <label>Email:</label>
          <input type="email" name="email" />
          <br />
          <label>Password:</label>
          <input type="password" name="password" />
          <br />
          <button type="submit">Login</button>
        </form>
      </div>
  );
};

export default Login;