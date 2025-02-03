import React, {useState} from 'react';
import axios from 'axios'; // Import Axios

const Registration = () => {
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [gender, setGender] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState(''); // For error messages
  const [previewImage, setPreviewImage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevents page reload

    try {
      // Prepare the request body using FormData
      const formData = new FormData();
      formData.append('name', name);
      formData.append('age', age);
      formData.append('gender', gender);
      formData.append('email', email);
      formData.append('password', password);

      // Add the profile image if the user uploaded it
      const fileInput = document.getElementById('profileImage'); // Access the file input
      if (fileInput.files[0]) {
        formData.append('photo', fileInput.files[0]); // Append the uploaded file
      }

      // Send API request using Axios
      const response = await axios.post('http://localhost:3000/register', formData, {
        headers: {
          'Content-Type': 'multipart/form-data', // Multipart request
        },
      });

      // Handle success
      setMessage(response.data.message || 'Registration successful!');

      // Clear form fields
      setName('');
      setAge('');
      setGender('');
      setEmail('');
      setPassword('');
      fileInput.value = ''; // Clear file input
    } catch (err) {
      // Handle errors
      if (err.response && err.response.data) {
        setError(err.response.data.message || 'An error occurred during registration.');
      } else {
        // General or network error
        setError('Unable to connect to the server. Please try again later.');
      }
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result);
      };
      reader.readAsDataURL(file);
    } else {
      setPreviewImage('');
    }
  };

  return (<div >
    <h1 >Register</h1 >
    {message && <p style = {{color: 'green'}} >{message}</p >}
    {error && <p style = {{color: 'red'}} >{error}</p >}

    <form onSubmit = {handleSubmit} >
      <label >Name:
        <input
            type = "text"
            name = "name"
            value = {name}
            onChange = {(e) => setName(e.target.value)}
            required
        />
      </label >
      <br />

      <label >Age:
        <input
            type = "number"
            name = "age"
            value = {age}
            onChange = {(e) => setAge(e.target.value)}
            required
        />
      </label >
      <br />

      <label >Gender:
        <select
            name = "gender"
            value = {gender}
            onChange = {(e) => setGender(e.target.value)}
            required
        >
          <option value = "" >Select</option >
          {/* Empty value to enforce selection */}
          <option value = "male" >Male</option >
          <option value = "female" >Female</option >
          <option value = "other" >Other</option >
        </select >
      </label >
      <br />

      <label >Email:
        <input
            type = "email"
            name = "email"
            value = {email}
            onChange = {(e) => setEmail(e.target.value)}
            required
        />
      </label >
      <br />

      <label >Password:
        <input
            type = "password"
            name = "password"
            value = {password}
            onChange = {(e) => setPassword(e.target.value)}
            required
        />
      </label >
      <br />

      <label>Profile Image:
        <input
            type="file"
            id="profileImage"
            name="profileImage"
            onChange={handleImageChange}
        />
      </label>
      {previewImage && (
          <div>
            <p>Preview:</p>
            <img src={previewImage} alt="Preview" style={{ maxWidth: '200px', maxHeight: '200px' }} />
          </div>
      )}
      <br />

      <button type = "submit" >Register</button >
    </form >
  </div >);
};

export default Registration;