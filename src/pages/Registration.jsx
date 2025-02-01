import React, {useState} from 'react';

const Registration = () => {
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [gender, setGender] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault(); //prevents reload

    //Simulate User Data saved, output to the console
    const userData = {
      name, age, gender, email,
    };
    console.log('User Registered:', userData);

    //Simulate Thank You message
    setMessage(`Thank you for registering, ${name}`);

    //Clear form fields
    setName('');
    setAge('');
    setGender('');
    setEmail('');
  };

  return (<div >
    <h1 >Register</h1 >
    {message && <p style = {{color: 'green'}} >{message}</p >}

    <form onSubmit = {handleSubmit} >
      <label >Name:
        <input
            type = "text"
            name = "name"
            value={name}
            onChange={(e) => setName(e.target.value)}
        />
      </label >
      <br />

      <label >Age:
        <input
            type = "number"
            name = "age"
            value={age}
            onChange={(e) => setAge(e.target.value)}
        />
      </label >
      <br />

      <label >Gender:
        <select
            name = "gender"
            value={gender}
            onChange={(e) => setGender(e.target.value)}
        >
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
        />
      </label >
      <br />

      <button type = "submit" >Register</button >
    </form >
  </div >);
};

export default Registration;