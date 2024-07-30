import { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';
import { API_ENDPOINTS } from './apiConfig'; // Make sure this path is correct

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [accessToken, setAccessToken] = useState(localStorage.getItem('accessToken') || null);
  const [userRole, setUserRole] = useState(null);
  const isAuthenticated = !!accessToken; // Boolean flag for authentication status

  useEffect(() => {
    if (accessToken) {
      fetchUserRole();
    } else {
      setUserRole(null); // Clear user role if not authenticated
    }
  }, [accessToken]);

  const fetchUserRole = async () => {
    try {
      const response = await axios.get(`${API_ENDPOINTS.users}/username/`, {
        headers: {
          Authorization: `Bearer ${accessToken}`
        }
      });
      setUserRole(response.data.role); 
    } catch (error) {
      console.error('Error fetching user role:', error);
    }
  };

  const login = (token) => {
    setAccessToken(token);
    localStorage.setItem('accessToken', token);
    fetchUserRole(); 
  };

  const logout = () => {
    setAccessToken(null);
    setUserRole(null); 
    localStorage.removeItem('accessToken');
  };

  return (
    <AuthContext.Provider value={{ accessToken, userRole, login, logout, isAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
