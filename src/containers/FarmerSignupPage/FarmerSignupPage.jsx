import axios from 'axios';
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { API_ENDPOINTS } from '../../components/Auth/apiConfig';
import './FarmerSignupPage.css';

function FarmerSignupPage() {
  const [data, setData] = useState({
    username: '',
    email: '',
    password1: '',
    password2: '',
    role: 'Farmer',
    isChecked: false  // Initialize the checkbox state
  });
  const [error, setError] = useState('');
  const [showPopup, setShowPopup] = useState(false);
  const navigate = useNavigate();

  const handleChange = ({ currentTarget: input }) => {
    const value = input.type === 'checkbox' ? input.checked : input.value;
    setData({ ...data, [input.name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (data.password1 !== data.password2) {
      setError("Passwords do not match.");
      return;
    }
    if (!data.isChecked) {
      setError('Please agree to the terms.');
      setShowPopup(true);  // Show popup if checkbox is not checked
      setTimeout(() => setShowPopup(false), 5000);
      return;
    }
    const userData = {
      username: data.username,
      email: data.email,
      password: data.password1,
      role: 'Farmer'
    };
    try {
      const url = `${API_ENDPOINTS.users}/register/`;
      await axios.post(url, userData);
      navigate('/login');
    } catch (error) {
      if (error.response) {
        setError(error.response.data.message || "An error occurred during registration.");
      }
    }
  };

  return (
    <div className='signup-login-page-container'>
      <div className='header-section'>
        <h2 style={{'font-size':'xx-large', 'paddingBottom':10, 'fontWeight':'semibold'}}>Sign Up</h2>
        <p style={{'font-size':'small', 'fontWeight':'200'}}>Please sign up to get started</p>
      </div>
      <div className='form-container'>
        <form onSubmit={handleSubmit} method="POST"> 
          <label className='labelstyles' style={{'marginTop':10}}>Name</label><br/>
          <input className='inputfield' type="text" name="username" value={data.username} onChange={handleChange} placeholder="Enter Your Name" required /><br/>
          <label className='labelstyles'>Email</label><br/>
          <input className='inputfield' type="email" name="email" value={data.email} onChange={handleChange} placeholder="Enter Your Email" required /><br/>
          <label className='labelstyles'>Password</label><br/>
          <input className='inputfield' type="password" name="password1" value={data.password1} onChange={handleChange} placeholder="Enter Your Password" required /><br/>
          <label className='labelstyles'>Re-Type Password</label><br/>
          <input className='inputfield' type="password" name="password2" value={data.password2} onChange={handleChange} placeholder="Re-Type Your Password" required /><br/>
          <input className="cbinputfield" type="checkbox" name="isChecked" checked={data.isChecked} onChange={handleChange}/>
          <label>Sign up myself as a farmer</label><br/>
          {error && <div className="error-message">{error}</div>} 
          <button className='submitbtn' type="submit">Sign Up</button>
        </form>
        <p style={{'font-size':'medium', 'fontWeight':'300', 'textAlign':'center'}}>Already have an account? <Link style={{color:"#8423FF"}} to='/login'>Login instead.</Link></p>
        <p style={{'fontSize':'small  ','width':'100%' ,'fontWeight':'300', 'textAlign':'center', 'position':'absolute','bottom':'10px'}}>Do you Wish only to purchase products, Not a farmer? <Link style={{color:"#8423FF"}} to='/signup'>Click Here!</Link></p>
      </div>
    </div>
  )
}

export default FarmerSignupPage;
