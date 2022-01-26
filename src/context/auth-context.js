import { message } from 'antd';
import React, { useState, createContext, useEffect } from 'react';
import apis from '../services/apis';
import http from '../services/http';


export const AuthContext = createContext({
  isLoggedIn: false,
  login: () => {},
  logout: () => {},
});

const AuthProvider = ({children, ...rest}) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userDetails, setUserDetails] = useState('');

  useEffect(() => {
    const token = localStorage.getItem('token');
    const userId = localStorage.getItem('userId');
    if(token && userId) {
        http.defaults.headers.common['Authorization'] = 'Bearer '+ token;
        http.defaults.headers.common['userid'] = userId;
        setIsLoggedIn(true);
    }
  }, [isLoggedIn]);
  
  
  const login = async (email, password) => {
      rest.setIsLoading(true);

      const response = await http.post(`${apis.BASE_SERVER_URL}/${apis.LOGIN}/`, {
        email, password
      });

      rest.setIsLoading(false);
      console.log(response);
      
      if(!response.data.success) {
        return message.error(response.data.message)
      } 

      localStorage.setItem('token', response.data.token);
      localStorage.setItem('userId', response.data.userid);

      message.success(response.data.message);
      
      setIsLoggedIn(true);
  }

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userId');

    setIsLoggedIn(false);
  }

  const register = async (name, email, password, role) => {
    rest.setIsLoading(true);
    const response = await http.post(`${apis.BASE_SERVER_URL}/${apis.REGISTER}`, {
      name, email, password, role
    });
    rest.setIsLoading(false);

    if(response.data.success) {
      message.success(response.data.message);
    } else {
      message.error(response.data.message);
    }
  }

  const value = {
    isLoggedIn,
    login,
    logout,
    register,
    ...rest
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;