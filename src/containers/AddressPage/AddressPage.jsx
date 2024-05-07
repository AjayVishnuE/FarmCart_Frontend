import React, { useState, useEffect } from 'react';
import { Header, Navbar } from '../../components';
import { useNavigate } from 'react-router-dom';
import { API_ENDPOINTS } from '../../components/Auth/apiConfig';
import "./AddressPage.css"
import axios from 'axios';

function AddressPage(props) {
    const [addressType, setAddressType] = useState('Home');
    const [name, setName] = useState('');
    const [address, setAddress] = useState('');
    const [pincode, setPincode] = useState('');
    const [phonenumber, setPhonenumber] = useState('');
    const [addresses, setAddresses] = useState([]);
    const navigate = useNavigate();
    const accessToken = localStorage.getItem('accessToken');

    useEffect(() => {
        fetchAddresses();
    }, []);

    useEffect(() => {
        const currentAddress = addresses.find(addr => addr.address_type === addressType);
        if (currentAddress) {
            setName(currentAddress.name || '');
            setAddress(currentAddress.address || '');
            setPincode(currentAddress.pincode || '');
            setPhonenumber(currentAddress.phonenumber || '');
        } else {
            setName('');
            setAddress('');
            setPincode('');
            setPhonenumber('');
        }

    }, [addressType, addresses]);

    const fetchAddresses = async () => {
        try {
            const response = await fetch(`${API_ENDPOINTS.address}addresses/`, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${accessToken}`,
                    'Content-Type': 'application/json',
                },
            });
            if (!response.ok) {
                throw new Error('Failed to fetch addresses');
            }
            const data = await response.json();
            setAddresses(data);
        } catch (error) {
            console.error('Error fetching addresses:', error);
        }
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        const existingAddress = addresses.find(addr => addr.address_type === addressType);
        const url = existingAddress ? `${API_ENDPOINTS.address}addresses/${existingAddress.id}/` : `${API_ENDPOINTS.address}addresses/`;
        const method = existingAddress ? 'PATCH' : 'POST';

        try {
            const response = await fetch(url, {
                method: method,
                headers: {
                    'Authorization': `Bearer ${accessToken}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    address_type: addressType,
                    name: name,
                    address: address,
                    pincode: pincode,
                    phonenumber: phonenumber,
                }),
            });
            if (!response.ok) {
                throw new Error('Failed to save address');
            }
            await fetchAddresses(); 

            const notifyUrl = `${API_ENDPOINTS.notification}getpost/`;
            const notifyData = {
              title: "New Address Added",
              message:"Your new address Has been added successfully",
              redirect: "/address",
      
            };
      
            await axios.post(notifyUrl, notifyData, {
              headers: { Authorization: `Bearer ${accessToken}` }
            });

            navigate('/checkout');
        } catch (error) {
            console.error('Error saving address:', error);
        }
    };

    return (
        <div className='address-overall-container'>
            <Header/>
            <form className='addressInfoContainer' onSubmit={handleSubmit}>
                <div className='addressInfoItem'>
                    <label className='addlabeladdress'>Address Type</label><br/>
                    <select className='addvalueaddress12' value={addressType} onChange={e => setAddressType(e.target.value)}>
                        <option className="addvalueaddress12option" value='Home'>Home Address</option>
                        <option className="addvalueaddress12option" value='Office'>Office Address</option>
                        <option className="addvalueaddress12option" value='Other'>Other</option>
                    </select>
                </div>
                <div className='addressInfoItem'>
                    <label style={{paddingBottom:"20px"}} className='addlabeladdress'>Name</label>
                    <input className='addvalueaddress' type='text' value={name} onChange={e => setName(e.target.value)} />
                </div>
                <div className='addressInfoItem'>
                    <label className='addlabeladdress'>Address</label>
                    <input className='addvalueaddress' type='text' value={address} onChange={e => setAddress(e.target.value)} />
                </div>
                <div className='addressInfoItem'>
                    <label className='addlabeladdress'>Pincode</label>
                    <input className='addvalueaddress' type='text' value={pincode} onChange={e => setPincode(e.target.value)} />
                </div>
                <div className='addressInfoItem'>
                    <label className='addlabeladdress'>Phone Number</label>
                    <input className='addvalueaddress' type='text' value={phonenumber} onChange={e => setPhonenumber(e.target.value)} />
                </div>
                <button className='orderbtn36' type="submit">
                    Continue
                </button>
            </form>
            <Navbar/>
        </div>
    );
}

export default AddressPage;
