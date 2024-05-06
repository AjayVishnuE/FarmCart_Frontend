import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate} from "react-router-dom";

import './ProfileEdit.css';
import edit from '../../Images/edit_icon.png';
import { API_ENDPOINTS } from '../../components/Auth/apiConfig';  
import { FarmerHeader, FarmerNavbar, Header, Loader, Navbar } from '../../components';


function FarmerUsersEdit() {
    const { User_id } = useParams();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [userData, setuserData] = useState({
        username: '',
        email: '',
        role: '',
        mobile: '',
        user_image: '' 
    });
    const accessToken = localStorage.getItem('accessToken'); 
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`${API_ENDPOINTS.users}/edituser/`, {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${accessToken}`,
                        'Content-Type': 'application/json',
                    },
                });

                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }

                const data = await response.json();
                setuserData(data);

            } catch (error) {
                console.error('Error fetching consumer profile:', error);
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []); 

    const handleFormSubmit = async (event) => {
        event.preventDefault();
    
        const formData = new FormData();
    
        Object.entries(userData).forEach(([key, value]) => {
            if (key !== 'user_image') {
                formData.append(key, value);
            }
        });
    
        if (userData.user_image instanceof File) {
            formData.append('user_image', userData.user_image);
        }
    
        try {
            const accessToken = localStorage.getItem('accessToken');
            const config = {
                headers: {
                    'Authorization': `Bearer ${accessToken}`,
                    'Content-Type': 'multipart/form-data',  
                },
            };
            const response = await axios.patch(`${API_ENDPOINTS.users}/edituser/`, formData, config);
            console.log('User updated:', response.data);
        } catch (error) {
            console.error('Error updating User:', error.response ? error.response.data : error);
        }
        if (userData.role === 'Farmer') {
            navigate('/farmerprofile');
          } else if (userData.role === 'Consumer') {
            navigate('/profile');
          } else {
            navigate('/profile'); 
          }
    };
    
    
    const handleInputChange = (event) => {
        const { name, type } = event.target;
        if (type === "file") {
            const file = event.target.files[0];
            setuserData({
                ...userData,
                [name]: file
            });
            if (file) {
                setuserData(prevData => ({
                    ...prevData,
                    user_image_preview: URL.createObjectURL(file)
                }));
            }
        } else {
            setuserData({
                ...userData,
                [name]: event.target.value
            });
        }
    };
    

    if (loading) {
        return <Loader/>;
    }
    
    if (error) {
        return <div>Error: {error}</div>;
    }
    
    if (!userData) {
        return <div>User not found.</div>;
    }
    return (
        <div classname="profileeditcontainer">
            {userData.role === "Farmer" ? (
                <FarmerHeader/>
            ) : (
                <Header/>
            )}
            <form className='editUserFormContainer' onSubmit={handleFormSubmit}>
                <span className='editlabelprofile'>User Image:</span>
                <div className="FileUploadBaseprofile">
                    <input type="file" onChange={handleInputChange} name="user_image" accept="image/*" style={{ display: 'none' }} id="UserImageUpload" />
                    <label htmlFor="UserImageUpload" className="User-image-edit-label">
                        <img 
                            className='User-image-edit'
                            src={userData.user_image_preview || (typeof userData.user_image === 'string' ? API_ENDPOINTS.media + userData.user_image : '')} 
                            alt="User Preview" 
                        />                    
                    </label>
                </div>
                <div className='editUserFormItem'>
                    <label className='editlabel12'>User name:</label>
                    <input className='editvalue12' name="username" value={userData.username} onChange={handleInputChange} type='text' placeholder='your name' />
                </div>
                <div className='editUserFormItem'>
                    <label className='editlabel12'>Email ID:</label>
                    <input className='editvalue12' name="email" value={userData.email} onChange={handleInputChange} type='text'placeholder='email Id' />
                </div>
                <div className='editUserFormItem'>
                    <label className='editlabel12'>Phone No.:</label>
                    <input className='editvalue12' name="mobile" value={userData.mobile} onChange={handleInputChange} type='text' placeholder="mobile Number"/>
                </div>
                <button className='editUserbtn' type="submit">
                    Update User
                </button>
        </form>
        {userData.role === "Farmer" ? (
            <FarmerNavbar/>
        ) : (
            <Navbar/>
        )}
        </div>
    )
}

export default FarmerUsersEdit
