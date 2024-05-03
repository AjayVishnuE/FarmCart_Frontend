import React, { useState } from 'react';
import axios from 'axios';
import { API_ENDPOINTS } from '../../components/Auth/apiConfig';
import './ChatPage.css';
import { Link } from 'react-router-dom';
import { Header, Navbar, EmptyChat} from '../../components';
import bot from '../../Images/smalllogo.png';


function ChatPage() {
  const [query, setQuery] = useState('');
  const [responses, setResponses] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isComplaintNext, setIsComplaintNext] = useState(false);
  const accessToken = localStorage.getItem('accessToken');
  const COMPLAINT_KEYWORDS = ["i want to register a complaint", "i have a complaint", "complaint about a product", "complaint regarding service", "file a complaint", "report an issue"];

  const handleQueryChange = (e) => {
    setQuery(e.target.value);
  };

  const handleQuerySubmit = async (e) => {
    e.preventDefault();
    if (!query.trim()) return;
    setLoading(true);
  
    const isComplaintTrigger = COMPLAINT_KEYWORDS.some(keyword => query.toLowerCase().includes(keyword));
  
    if (isComplaintTrigger) {
      setResponses([...responses, { query, response: 'Your next message will be registered as a complaint, and our technical team will look into it shortly.' }]);
      setIsComplaintNext(true);
      setLoading(false);
      setQuery('');
      return; 
    }
  
    const endpoint = isComplaintNext ? `${API_ENDPOINTS.chat}/complaint/` : `${API_ENDPOINTS.chat}/chat/`;
    const requestBody = isComplaintNext ? { complaint: query } : { message: query };
    const config = {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json'
      }
    };
  
    try {
      const response = await axios.post(endpoint, requestBody, config);
      const responseMessage = isComplaintNext ? 'Your message has been registered as a complaint, and our technical team will look into it shortly.' : response.data.response;
      setResponses([...responses, { query, response: responseMessage }]);
      setQuery('');
      setIsComplaintNext(false); 
    } catch (error) {
      console.error('Error:', error);
      setResponses([...responses, { query, response: 'Failed to get a response. Please try again.' }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='chat-overall-container'>
      <Header/>
      {responses.length > 0 ? (
          responses.map((item, index) => (
          <div  className= 'msg-chat' key={index}>
            <div className="msg right-msg">
              <div className='msg-bubble'>
                <p className="msg-text"> {item.query}</p>
              </div>
            </div>
            <div className="msg left-msg">
              <div class="msg-img">
                <img src={bot} alt="logo"></img>
              </div>
              <div className='msg-bubble'>
                <p className="msg-text"> {item.response}</p>
              </div>
            </div>
          </div>
        ))
        ): (
          <EmptyChat /> 
      )}

      <form onSubmit={handleQuerySubmit}>
        <div className='msger-inputarea'>
        <input className="msger-input"
          type="text" 
          value={query}
          onChange={handleQueryChange}
          placeholder="Ask something..."
        />
            
        <button class="msger-send-btn" type="submit" disabled={loading}>
          {loading ? 'Loading...' : <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path d="M18.07 8.50989L9.51 4.22989C3.76 1.34989 1.4 3.70989 4.28 9.45989L5.15 11.1999C5.4 11.7099 5.4 12.2999 5.15 12.8099L4.28 14.5399C1.4 20.2899 3.75 22.6499 9.51 19.7699L18.07 15.4899C21.91 13.5699 21.91 10.4299 18.07 8.50989ZM14.84 12.7499H9.44C9.03 12.7499 8.69 12.4099 8.69 11.9999C8.69 11.5899 9.03 11.2499 9.44 11.2499H14.84C15.25 11.2499 15.59 11.5899 15.59 11.9999C15.59 12.4099 15.25 12.7499 14.84 12.7499Z" fill="#0BCE83"/>
            </svg>}
        </button>
        </div>
      </form>
      
      
      <div className='navbar-container'>
      <Link to="/dashboard">
        
      <svg className="mySvg"  id="dashboard-svg" width="27" height="27" viewBox="0 0 27 27" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path className="mypath" d="M14.5958 1.55415C14.3052 1.26357 13.911 1.10033 13.5 1.10033C13.089 1.10033 12.6948 1.26357 12.4041 1.55415L1.55414 12.4042C1.27179 12.6965 1.11556 13.088 1.11909 13.4944C1.12263 13.9008 1.28564 14.2896 1.57302 14.577C1.8604 14.8644 2.24916 15.0274 2.65557 15.0309C3.06197 15.0344 3.45351 14.8782 3.74584 14.5959L4.19999 14.1417V24.35C4.19999 24.7611 4.36329 25.1553 4.65397 25.446C4.94466 25.7367 5.3389 25.9 5.74999 25.9H8.84999C9.26108 25.9 9.65532 25.7367 9.946 25.446C10.2367 25.1553 10.4 24.7611 10.4 24.35V21.25C10.4 20.8389 10.5633 20.4447 10.854 20.154C11.1447 19.8633 11.5389 19.7 11.95 19.7H15.05C15.4611 19.7 15.8553 19.8633 16.146 20.154C16.4367 20.4447 16.6 20.8389 16.6 21.25V24.35C16.6 24.7611 16.7633 25.1553 17.054 25.446C17.3447 25.7367 17.7389 25.9 18.15 25.9H21.25C21.6611 25.9 22.0553 25.7367 22.346 25.446C22.6367 25.1553 22.8 24.7611 22.8 24.35V14.1417L23.2541 14.5959C23.5465 14.8782 23.938 15.0344 24.3444 15.0309C24.7508 15.0274 25.1396 14.8644 25.427 14.577C25.7143 14.2896 25.8774 13.9008 25.8809 13.4944C25.8844 13.088 25.7282 12.6965 25.4458 12.4042L14.5958 1.55415V1.55415Z" stroke="#888888" stroke-width="2"/>
      </svg>
        
      </Link>

      <Link to="/notification">
      <svg id="notification-svg" className="mySvg" width="24" height="27" viewBox="0 0 24 27" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path id="Vector" d="M2.64214 19.3564L2.67143 19.3271V19.2857V11.5714C2.67143 7.62994 5.21382 4.1974 9.02874 3.05293L9.1 3.03155V2.95714V2.57143C9.1 1.21237 10.2124 0.1 11.5714 0.1C12.9305 0.1 14.0429 1.21237 14.0429 2.57143V2.95714V3.03155L14.1141 3.05293C17.929 4.1974 20.4714 7.62994 20.4714 11.5714V19.2857V19.3271L20.5007 19.3564L23.0429 21.8986V23.0429H0.1V21.8986L2.64214 19.3564ZM5.04286 20.5714V20.6714H5.14286H18H18.1V20.5714V11.5714C18.1 7.9162 15.2267 5.04286 11.5714 5.04286C7.9162 5.04286 5.04286 7.9162 5.04286 11.5714V20.5714ZM14.0408 24.5286C13.9879 25.8418 12.897 26.9 11.5714 26.9C10.2459 26.9 9.15497 25.8418 9.10201 24.5286H14.0408Z" fill="#888888" stroke="white" stroke-width="0.2"/>
      </svg>
      </Link>

      
      
      <Link to="/chat">
      <svg xmlns="http://www.w3.org/2000/svg" width="21" height="20" viewBox="0 0 21 20" fill="#7519EB">
        <path d="M0.857147 20V2C0.857147 1.45 1.05315 0.979333 1.44515 0.588C1.83715 0.196667 2.30781 0.000666667 2.85715 0H18.8571C19.4071 0 19.8781 0.196 20.2701 0.588C20.6621 0.98 20.8578 1.45067 20.8571 2V14C20.8571 14.55 20.6615 15.021 20.2701 15.413C19.8788 15.805 19.4078 16.0007 18.8571 16H4.85715L0.857147 20ZM4.85715 12H12.8571V10H4.85715V12ZM4.85715 9H16.8571V7H4.85715V9ZM4.85715 6H16.8571V4H4.85715V6Z" fill="#7519EB"/>
      </svg>
        </Link>

        <Link to="/profile">
        <svg id="profile-svg" className="mySvg" width="25" height="25" viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
        <g id="user">
          <path id="Vector" d="M20.1429 21.5V19.5C20.1429 18.4391 19.7214 17.4217 18.9713 16.6716C18.2211 15.9214 17.2037 15.5 16.1429 15.5H8.14285C7.08199 15.5 6.06457 15.9214 5.31443 16.6716C4.56428 17.4217 4.14285 18.4391 4.14285 19.5V21.5" stroke="#888888" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <path id="Vector_2" d="M12.1429 11.5C14.352 11.5 16.1429 9.70914 16.1429 7.5C16.1429 5.29086 14.352 3.5 12.1429 3.5C9.93371 3.5 8.14285 5.29086 8.14285 7.5C8.14285 9.70914 9.93371 11.5 12.1429 11.5Z" stroke="#888888" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </g>
      </svg>
        </Link>

    

     
      
        
      
    </div>
    </div>
  );
}

export default ChatPage;
