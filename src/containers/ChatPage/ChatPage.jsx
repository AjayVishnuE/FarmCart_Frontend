import React, { useState, useContext } from 'react';
import axios from 'axios';
import { API_ENDPOINTS } from '../../components/Auth/apiConfig';
import './ChatPage.css';
import { Header, Navbar, EmptyChat } from '../../components';
import bot from '../../Images/smalllogo.png';

function ChatPage() {
  const [query, setQuery] = useState('');
  const [responses, setResponses] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isComplaintNext, setIsComplaintNext] = useState(false);
  const accessToken = localStorage.getItem('accessToken');
  const COMPLAINT_KEYWORDS = ["i want to register a complaint", "i have a complaint", "complaint about a product", "complaint regarding service", "file a complaint", "report an issue", "lodge a complaint", "submit a complaint", "make a complaint", "raise a complaint", "issue a complaint", "report a problem", "express dissatisfaction", "send a complaint", "formal complaint", "problem with a product", "issue with service", "not happy with product", "unsatisfied with service", "complaint about an order", "feedback about poor service", "negative feedback", "need to complain", "want to complain", "complaint department", "complaint against", "complaint due to", "complaint for"];

  const handleQueryChange = (e) => {
    setQuery(e.target.value);
  };

  const handleQuerySubmit = async (e) => {
    e.preventDefault();
    if (!query.trim()) return;
    setLoading(true);
  
    const isComplaintTrigger = COMPLAINT_KEYWORDS.some(keyword => query.toLowerCase().includes(keyword));
  
    if (isComplaintTrigger) {
      setResponses([...responses, { query, response: 'Your next message will be registered as a complaint, Please explain your complaint in detail, and our technical team will look into it shortly.' }]);
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
          <div className='msg-chat' key={index}>
            <div className="msg right-msg">
              <div className='msg-bubble'>
                <p className="msg-text"> {item.query}</p>
              </div>
            </div>
            <div className="msg left-msg">
              <div className="msg-img">
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
          <button className="msger-send-btn" type="submit" disabled={loading}>
            {loading ? 'Loading...' : 'Ask'}
          </button>
        </div>
      </form>
      
      <Navbar/>
    </div>
  );
}

export default ChatPage;
