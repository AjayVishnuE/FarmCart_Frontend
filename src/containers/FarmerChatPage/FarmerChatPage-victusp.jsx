import React, { useState } from 'react';
import axios from 'axios';
import { API_ENDPOINTS } from '../../components/Auth/apiConfig';
import './ChatPage.css';
import { FarmerHeader, FarmerNavbar, EmptyChat} from '../../components';
import bot from '../../Images/smalllogo.png';
import { Link } from 'react-router-dom';
import bar from '../../Images/Bar.png'

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
      <FarmerHeader/>
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
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path d="M18.07 8.50989L9.51 4.22989C3.76 1.34989 1.4 3.70989 4.28 9.45989L5.15 11.1999C5.4 11.7099 5.4 12.2999 5.15 12.8099L4.28 14.5399C1.4 20.2899 3.75 22.6499 9.51 19.7699L18.07 15.4899C21.91 13.5699 21.91 10.4299 18.07 8.50989ZM14.84 12.7499H9.44C9.03 12.7499 8.69 12.4099 8.69 11.9999C8.69 11.5899 9.03 11.2499 9.44 11.2499H14.84C15.25 11.2499 15.59 11.5899 15.59 11.9999C15.59 12.4099 15.25 12.7499 14.84 12.7499Z" fill="#0BCE83"/>
            </svg>
        <button class="msger-send-btn" type="submit" disabled={loading}>
          {loading ? 'Loading...' : 'Ask'}
        </button>
        </div>
      </form>
      
      <FarmerNavbar/>
    </div>
  );
}

export default ChatPage;