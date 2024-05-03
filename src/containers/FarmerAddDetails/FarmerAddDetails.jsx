import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import { FarmerHeader, FarmerNavbar } from '../../components'
import axios from 'axios';
import './FarmerAddDetails.css'
import { API_ENDPOINTS } from '../../components/Auth/apiConfig';


function FarmerAddDetails() {
  const [farms, setFarms] = useState('');
  const [verified, setVerified] = useState(false);
  const [farmerRating, setFarmerRating] = useState(0);
  const [hasDetails, setHasDetails] = useState(false);
  const navigate = useNavigate();


  useEffect(() => {
      const fetchData = async () => {
          try {
              const response = await axios.get(`${API_ENDPOINTS.farmerdetails}farmer-details/`, {
                  headers: {
                      'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
                  }
              });
              if (response.data) {
                  setFarms(response.data.farms || '');
                  setVerified(response.data.Verified || false);
                  setFarmerRating(response.data.farmer_rating || 0);
                  setHasDetails(true);
              }
          } catch (error) {
              console.error('Error fetching farmer details:', error);
          }
      };
      fetchData();
  }, []);

  const handleSubmit = async (event) => {
      event.preventDefault();
      const data = {
          farms: farms,
          Verified: verified,
          farmer_rating: farmerRating
      };
      console.log(data);

      try {
          let response;
          if (hasDetails) {
              response = await axios.patch(`${API_ENDPOINTS.farmerdetails}farmer-details/`, data, {
                  headers: {
                      'Authorization': `Bearer ${localStorage.getItem('accessToken')}`,
                      'Content-Type': 'application/json'
                  }
              });
          } else {
              response = await axios.post(`${API_ENDPOINTS.farmerdetails}farmer-details/`, data, {
                  headers: {
                      'Authorization': `Bearer ${localStorage.getItem('accessToken')}`,
                      'Content-Type': 'application/json'
                  }
              });
              setHasDetails(true);
          }
          console.log('Success:', response.data);
          navigate("/farmerprofile")
      } catch (error) {
          console.error('Error submitting farmer details:', error);
      }
  };
  return (
    <div className='adddetailsoverallcontainer'>
        <FarmerHeader/>
        <form onSubmit={handleSubmit}>
            <div className='addproductInfoItem'>
                <label className='addlabel'>Enter FarmName</label>
                <input className='addvalue' id="farms" value={farms} onChange={e => setFarms(e.target.value)} type='text'/>
                <label className='addlabel'>Enter Address</label>
                <input className='addvalue' placeholder="address"/>
            </div>
            <button className='addproductbtn' type="submit">
                Add/Edit Farm
            </button>
        </form>
        <FarmerNavbar/>
    </div>
  )
}

export default FarmerAddDetails
