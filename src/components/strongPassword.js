import React, { useState } from 'react';
import axios from 'axios';
import { strongPasswordChecker } from './StrongPasswordChecker';
import '../index.css';

export function StrongPasswordCheckers() {
  const [password, setPassword] = useState('');
  const [result, setResult] = useState(null);

  const handleCheckPassword = () => {
    const steps = strongPasswordChecker(password);
    setResult(steps);

    axios
      .post('http://localhost:5000/api/results', {
        password,
        steps,
      })
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const fetchResults = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/results');
      console.log(response.data);
      // Update state or perform further actions with the retrieved results
    } catch (error) {
      console.error(error);
    }
  };

  fetchResults();

  return (
    <div className='form-container'>
      <h1 className='label'>Strong Password Checker</h1>
      <div>
        <label className='label' htmlFor='password'>
          Enter Password:
        </label>
        <input
          type='password'
          id='password'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <button className='button' onClick={handleCheckPassword}>
        Check Password
      </button>
      {result !== null && (
        <div>
          <p className='label'>Minimum steps required: {result}</p>
        </div>
      )}
    </div>
  );
}
