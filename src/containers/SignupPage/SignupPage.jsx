import axios from 'axios';
import React, { useState } from 'react'
import { Link, useNavigate} from 'react-router-dom';
import { NotificationPopup } from '../../components';
import { API_ENDPOINTS } from '../../components/Auth/apiConfig';  
import './SignupPage.css'


function SignupPage() {
  const [data, setData] = useState({
    username: '',
    email: '',
    password1: '',
    password2: '',
    role:'Consumer'
  });
  const [error, setError] = useState('');
  const navigate = useNavigate(); 

  const handleChange = ({ currentTarget: input }) => {
    setData({ ...data, [input.name]: input.value });
  };

  const [showNotification, setShowNotification] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (data.password1 !== data.password2) {
      setError("Passwords do not match.");
      return;
    }
    const userData = {
      username: data.username,
      email: data.email,
      password: data.password1,
      role:'Consumer'
    };
    try {
      const url = `${API_ENDPOINTS.users}/register/`;
      await axios.post(url, userData);
      setShowNotification(true);
      setTimeout(() => setShowNotification(false), 5000);
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
        <h2 style={{'fontSize':'xx-large', 'paddingBottom':10, 'fontWeight':'semibold'}}>Sign Up</h2>
        <p style={{'fontSize':'small', 'fontWeight':'200'}}>Please sign up to get started</p>
      </div>
      <div className='form-container'>
        <form onSubmit={handleSubmit} method="POST"> 
          <label className='labelstyles' style={{'marginTop':10}}>Name</label><br></br>
          <input className='inputfield' type="text" name="username" value={data.username} onChange={handleChange} placeholder="Enter Your Name" required /><br></br>
          <label className='labelstyles'>Email</label><br></br>
          <input className='inputfield' type="email" name="email" value={data.email} onChange={handleChange}  placeholder="Enter Your Email" required /><br></br>
          <label className='labelstyles'>Password</label><br></br>
          <input className='inputfield' type="password" name="password1" value={data.password1} onChange={handleChange}  placeholder="Enter Your Password" required /><br></br>
          <label className='labelstyles'>Re-Type Password</label><br></br>
          <input className='inputfield' type="password" name="password2" value={data.password2} onChange={handleChange}   placeholder="Re-Type Your Password" required /><br></br>
          {error && <div  style={{marginLeft:"10%"}}>{error}</div>} 
          <button className='submitbtn' type="submit">Sign Up</button>
        </form>
        <p style={{'fontSize':'medium', 'fontWeight':'300', 'textAlign':'center'}}>Already have an account? <Link style={{color:"#8423FF"}} to='/login'>login instead.</Link></p>
        <p style={{'fontSize':'small  ','width':'100%' ,'fontWeight':'300', 'textAlign':'center', 'position':'absolute','bottom':'10px'}}>Want to Sign up as a farmer and sell your products? <Link style={{color:"#8423FF"}} to='/farmersignup'>Click Here!</Link></p>
        {showNotification && <NotificationPopup message="User created please login" onClose={() => setShowNotification(false)} />}</div>
    </div>
  )
}

export default SignupPage
