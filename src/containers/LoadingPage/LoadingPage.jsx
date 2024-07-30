import axios from 'axios';
import React , {useState, useEffect }from 'react';
import { useNavigate } from 'react-router-dom';
import logo from '../../Images/logo.png';
import heroimg from '../../Images/Hero Image.png';
import background from '../../Images/Backgroundlogo.png'; 
import { Link } from 'react-router-dom';
import { useAuth } from '../../components/Auth/AuthContext';
import { API_ENDPOINTS } from '../../components/Auth/apiConfig';

import "./loadingpage.css"
const UserRoleRedirect = () => {
  const navigate = useNavigate();
  const { user, isAuthenticated } = useAuth(); 
  const [isRedirected, setIsRedirected] = useState(false);

  useEffect(() => {
    if (isAuthenticated && !isRedirected) {
      const checkUserRole = async () => {
        try {
          const response = await axios.get(`${API_ENDPOINTS.users}/username/`, {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('accessToken')}`
            }
          });
          if (response.data.role === "Consumer") {
            navigate('/dashboard');
          } else if (response.data.role === "Farmer") {
            navigate('/farmerdashboard');
          }
          setIsRedirected(true); 
        } catch (error) {
            navigate('/'); // Other errors
          }
      };
      checkUserRole();
    }
  }, [isAuthenticated, isRedirected, navigate]);

  return null;
};

function LoadingPage() {
  return (
    <div className='Loadingpage'>
      <UserRoleRedirect />
      <img className='bg-img' src={background} alt="bg-img" />
      <img className='logo-img' src={logo} alt="logo-img" />

      <h1 className="herotext">Farm fresh <br></br>for all</h1>
      <img className='heroimage' src={heroimg} alt="" />
      <div className="getbutton">
        <Link style={{color:"white", fontSize:"20px"}} to="/introduction">
          Get Started!
        </Link>
      </div>
    </div>
  )
}

export default LoadingPage
