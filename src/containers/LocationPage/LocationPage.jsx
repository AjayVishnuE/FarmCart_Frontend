import React, { useState, useEffect }  from 'react';
import './LocationPage.css';
import {Link, useNavigate} from 'react-router-dom';
import { API_ENDPOINTS } from '../../components/Auth/apiConfig';  



function LocationPage() {
  const [userRole, setUserRole] = useState(null);
  const navigate = useNavigate(); 

  useEffect(() => {
    fetchUserRole();
  }, []);

  async function fetchUserRole() {
    const accessToken = localStorage.getItem('accessToken');
    if (!accessToken) {
      console.error('No access token available.');
      return;
    }
    try {
      const response = await fetch(`${API_ENDPOINTS.users}/username`, {
        headers: {
          'Authorization': `Bearer ${accessToken}`
        }
      });
      if (!response.ok) throw new Error('Failed to fetch user data');
      const data = await response.json();
      setUserRole(data.role);
    } catch (error) {
      console.error("Error fetching user role: ", error);
    }
  }

  function redirectButton(){
    if (userRole === 'Farmer') {
      navigate('/farmerdashboard');
    } else if (userRole === 'Consumer') {
      navigate('/dashboard');
    } else {
      navigate('/dashboard'); 
    }
  }

  function getLocation() {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const location_latitude = position.coords.latitude.toString();
          const location_longitude = position.coords.longitude.toString();
          const accessToken = localStorage.getItem('accessToken');
          if (!accessToken) {
            console.error('No access token available.');
            return;
          }

          const locationData = { location_latitude, location_longitude };
          try {
            const response = await fetch(`${API_ENDPOINTS.users}/location/`, {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${accessToken}`
              },
              body: JSON.stringify(locationData)
            });
            if (response.ok) {
              const result = await response.json();
              console.log('Location saved:', result);
              if (userRole === 'Farmer') {
                navigate('/farmerdashboard');
              } else if (userRole === 'Consumer') {
                navigate('/dashboard');
              } else {
                navigate('/dashboard'); 
              }
            } else {
              throw new Error('Failed to save location to the server');
            }
          } catch (error) {
            console.error("Error saving location: ", error);
            alert("Error saving location: " + error.message);
          }
        },
        (error) => {
          console.error("Error Code = " + error.code + " - " + error.message);
          if (error.code === error.PERMISSION_DENIED) {
            alert("Location permission was denied.");
          } else {
            alert("Error getting location: " + error.message);
          }
        },
        {
          enableHighAccuracy: true,
          timeout: 5000,
          maximumAge: 0
        }
      );
    } else {
      alert('Geolocation is not supported by your browser.');
    }
  }
  

  async function requestLocationPermission() {
    try {
      const permissionStatus = await navigator.permissions.query({ name: 'geolocation' });
      return permissionStatus.state;
    } catch (error) {
      console.error("Error requesting location permission:", error);
      throw error; 
    }
  }

  return (
      <div className='LocationPage'>
        <div className="locationbox">
          <div className='Sharelocation'>Share Your Location</div>
          <div className='Locationdesc'>
          <p className='locationtext'>If we have your location, we can provide the nearest farms and delivery points so as to ease your distance. Without location you won't be able to view and purchase products.
          </p></div>
          <button className='continuebutton' onClick={getLocation}>Get Location</button>
          <button className="manualbutton" onClick={redirectButton}>No, Choose location later.</button>
        </div>
      </div>
  );
}

export default LocationPage;


    // const getLocation = () => {
    //     if ('geolocation' in navigator) {
    //       navigator.geolocation.getCurrentPosition(
    //         (position) => {
    //           alert(`Latitude: ${position.coords.latitude}, Longitude: ${position.coords.longitude}`);
    //         },
    //         (error) => {
    //           console.error("Error Code = " + error.code + " - " + error.message);
    //           alert("Error getting location: " + error.message);
    //         },
    //         {
    //           enableHighAccuracy: true, 
    //           timeout: 5000, 
    //           maximumAge: 0 
    //         }
    //       );
    //     } else {
    //       alert('Geolocation is not supported by your browser.');
    //     }
    // };