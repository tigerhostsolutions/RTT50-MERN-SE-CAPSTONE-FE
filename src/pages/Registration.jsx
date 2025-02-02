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

  const handleSubmit = async (e) => {
    e.preventDefault(); //prevents reload

    try{
      //Prepare the request body
      const userData = {
        name, age, gender, email, password,
      };
      console.log(userData); //debugging

      //Send API request using Axios
      // const registration = import.meta.env.VITE_REGISTRATION_URL;
      // const response = await axios.post(`${registration}`,userData);
      const response = await axios.post(`http://localhost:3000/register`,userData);

      //Handle Success
      setMessage(response.data.message || 'Registration successful!')

      //Clear form fields
      setName('');
      setAge('');
      setGender('');
      setEmail('');
      setPassword('');
    } catch (err) {
      //Handle Errors
      if (err.response && err.response.data) {
        setError(err.response.data.message || 'An error occurred during' +
            ' registration.');
      } else {
        //General or network error
        setError('Unable to connect to the server. Please try again later.');
      }
    }
  };

  return (<div >
    <h1 >Register</h1 >
    {message && <p style = {{color: 'green'}} >{message}</p >}
    {error && <p style={{ color: 'red' }}>{error}</p>}

    <form onSubmit = {handleSubmit} >
      <label >Name:
        <input
            type = "text"
            name = "name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
        />
      </label >
      <br />

      <label >Age:
        <input
            type = "number"
            name = "age"
            value={age}
            onChange={(e) => setAge(e.target.value)}
            required
        />
      </label >
      <br />

      <label >Gender:
        <select
            name = "gender"
            value={gender}
            onChange={(e) => setGender(e.target.value)}
            required
        >
          <option value="">Select</option> {/* Empty value to enforce selection */}
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
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
        />
      </label >
      <br />

      <label >Password:
        <input
            type = "password"
            name = "password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
        />
      </label >
      <br />

      <button type = "submit" >Register</button >
    </form >
  </div >);
};

export default Registration;