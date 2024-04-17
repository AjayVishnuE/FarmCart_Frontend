import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './dashboard.css';
import '@fortawesome/fontawesome-free/css/all.css';
import { Navbar,DashboardComponent, Header} from '../../components'
import { API_ENDPOINTS } from '../../components/Auth/apiConfig';
import { Link } from 'react-router-dom';

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

function Dashboard() {
    const [username, setUsername] = useState('');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchUsername = async () => {
            try {
                const response = await axios.get(`${API_ENDPOINTS.users}/username/`, {
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('accessToken')}`, // Assuming you're using Bearer token authentication
                        'Content-Type': 'application/json',
                    },
                });
                const capitalizedUsername = capitalizeFirstLetter(response.data.username);
                setUsername(capitalizedUsername);
                setLoading(false);
            } catch (err) {
                setError('Failed to fetch username');
                setLoading(false);
                console.error('Fetching username error:', err);
            }
        };

        fetchUsername();
    }); 

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error loading username: {error}</p>;
  return (
    <div className='dashboard-overall-container'>
      <Header/>
      
      <h1 className='goodmorni'>Good Morning,</h1>
      <h2 className='username'>{username} !</h2>
      <Link to = "/search">
        <div class = 'search-box'>
          <div class = "search-btn">
            <i class="fas fa-search"></i>
          </div>
          <input class = "search-text" type="text" placeholder = "Search Anything" />
          
      </div>
      </Link>
      <DashboardComponent/>
      <Navbar/>
      </div>
  )
}

export default Dashboard
