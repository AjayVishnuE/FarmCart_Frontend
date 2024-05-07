import React, { useState } from 'react'
import { Link , redirect, useNavigate} from 'react-router-dom';
import { API_ENDPOINTS } from '../../components/Auth/apiConfig';  
import axios from 'axios';
import './login.css'

function LoginPage() {
  const [data, setData] = useState({
    EmailOrUsername:'',
    password:''
  }); 

  const [error, setError] = useState('');
  const navigate = useNavigate(); 

  const handleChange = ({ currentTarget: input }) => {
    setData({...data, [input.name]: input.value})
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const userData = {
      EmailOrUsername: data.EmailOrUsername,
      password: data.password,
    };
  
    try {
      const url = `${API_ENDPOINTS.users}/login/`;
      const response = await axios.post(url, userData);
      const accessToken = response.data.accessToken;

      localStorage.setItem('accessToken', accessToken);

      const notifyUrl = `${API_ENDPOINTS.notification}getpost/`;
      const notifyData = {
        title: "Successful login",
        message:"Your Account login Has been successful",
        redirect: "/profileedit",

      };

      await axios.post(notifyUrl, notifyData, {
        headers: { Authorization: `Bearer ${accessToken}` }
      });

      navigate('/location');
  
    } catch(error){
      if (error.response) {
        setError(error.response.data.detail || "An error occurred during registration.");
      }
    }
  };
  return (
    <div className='signup-login-page-container'>
        <div className='header-section'>
            <h2 style={{'fontsize':'xx-large', 'paddingBottom':10, 'fontWeight':'semibold'}}>Log In</h2>
            <p style={{'fontsize':'small', 'fontWeight':'200'}}>Please sign in to your existing account</p>
        </div>
        <div className='form-container'>
            <form onSubmit={handleSubmit} method="POST"> 
            <label className='labelstyles'>Username or Email</label><br></br>
            <input className='inputfield' type="text" name="EmailOrUsername" value={data.EmailOrUsername} onChange={handleChange} placeholder="Enter Your Email" required /><br></br>
            <label className='labelstyles'>Password</label><br></br>
            <input className='inputfield' type="password" name="password" value={data.password} onChange={handleChange} placeholder="Enter Your Password" required /><br></br>
            <div className='floatdiv'>
              <label className='labelstylescb'><input className='checkbox1' type='checkbox' name="rememberme" />Remember Me</label><br></br>
              <Link style={{textDecoration:"none", color:"#8423FF"}} to="/forgotpassword" className='fplabel'>Forgot Password</Link>
            </div>
            {error && <div style={{margin:"5px 0 0 10%"}}>{error}</div>} 
            <button className='submitbtn' type="submit" >Log In</button>
            </form> 
            <p style={{'fontsize':'medium', 'fontWeight':'300', 'textAlign':'center', marginTop:"5px"}}>Don't have an account? <Link style={{color:"#8423FF"}} to='/signup'>Sign Up here.</Link></p>
        </div>
    </div>
  )
}

export default LoginPage
