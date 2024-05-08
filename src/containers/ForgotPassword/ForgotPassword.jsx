import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { API_ENDPOINTS } from '../../components/Auth/apiConfig';
import './ForgotPassword.css';

function ForgotPassword() {
    const [step, setStep] = useState(1); // Control the step of the form
    const [email, setEmail] = useState(''); // Store email
    const [otp, setOtp] = useState(''); // Store OTP
    const [password, setPassword] = useState(''); // Store new password
    const [confirmPassword, setConfirmPassword] = useState(''); // Store confirm password
    const [error, setError] = useState(''); // Store any error message
    const navigate = useNavigate();

    const handleEmailSubmit = async (e) => {
        e.preventDefault();
        setError('');
        try {
            await axios.post(`${API_ENDPOINTS.users}/forgotpassword/`, { email });
            setStep(2); // Move to OTP verification step
        } catch (error) {
            setError(error.response?.data?.error || 'Failed to send OTP');
        }
    };

    const handleOtpSubmit = async (e) => {
        e.preventDefault();
        setError('');
        try {
            await axios.post(`${API_ENDPOINTS.users}/verifyotp/`, { email, otp });
            setStep(3); // Move to reset password step
        } catch (error) {
            setError(error.response?.data?.message || 'Invalid OTP');
        }
    };

    const handlePasswordReset = async (e) => {
        e.preventDefault();
        setError('');
        if (password !== confirmPassword) {
            setError('Passwords do not match');
            return;
        }
        try {
            await axios.post(`${API_ENDPOINTS.users}/resetpassword/`, {
                email,
                new_password: password // Pass the new password under the key expected by backend
            });
            navigate('/login'); // Redirect to login page on successful password reset
        } catch (error) {
            setError(error.response?.data?.message || 'Failed to reset password');
        }
    };

    return (
        <div className='signup-login-page-container'>
            <div className='header-section'>
                <h2 style={{ fontSize: 'xx-large', paddingBottom: 10, fontWeight: 'semibold' , marginTop:"150px"}}>Reset Password</h2>
                <p style={{ fontSize: 'small', fontWeight: '200' }}>Please follow the steps to reset your password</p>
            </div>
            <div className='form-container-get-otp'>
                {step === 1 && (
                    <form onSubmit={handleEmailSubmit}>
                        <label className='labelstyles'>Enter Your Email</label>
                        <input className='inputfield' type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="Enter Your Email" required />
                        {error && <div className='error'>{error}</div>}
                        <button className='submitbtn' type="submit">Get OTP</button>
                    </form>
                )}
                {step === 2 && (
                    <form onSubmit={handleOtpSubmit}>
                        <label className='labelstyles'>Enter OTP</label>
                        <input className='inputfield' type="text" value={otp} onChange={e => setOtp(e.target.value)} placeholder="Enter OTP" required />
                        {error && <div className='error'>{error}</div>}
                        <button className='submitbtn' type="submit">Verify OTP</button>
                    </form>
                )}
                {step === 3 && (
                    <form onSubmit={handlePasswordReset}>
                        <label className='labelstyles'>Enter New Password</label>
                        <input className='inputfield' type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="New Password" required />
                        <label className='labelstyles'>Confirm New Password</label>
                        <input className='inputfield' type="password" value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} placeholder="Confirm New Password" required />
                        {error && <div style={{marginLeft:"10%"}} className='error'>{error}</div>}
                        <button className='submitbtn' type="submit">Reset Password</button>
                    </form>
                )}
                <p style={{ fontSize: 'medium', fontWeight: '300', textAlign: 'center', marginTop: "5px" }}>
                    Remember Your Password? <Link style={{ color: "#8423FF" }} to='/login'>Login here.</Link>
                </p>
            </div>
        </div>
    );
}

export default ForgotPassword;
