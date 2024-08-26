import axios from 'axios';
import { SetUserData, ClearUserData } from '../redux/authSlice';
import { jwtDecode } from "jwt-decode";
import store from '../redux/store';
import { message } from 'antd';
const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5500/api';

// Handles API request and token storage
const HandleResponse = (response) => {
  const { token, messages } = response;
  message.success(messages); 
  let temp = {}
  if (token) {
    localStorage.setItem('token', token);
    temp = jwtDecode(token);    
    store.dispatch(SetUserData(temp));
  }
  return temp.auth
};

// Signin function
export const signin = async (email, password) => {
  try {
    const response = await axios.post(`${API_URL}/signin`, { email, password });
    console.log(response.data);
    message.success(response.data.message);
    return HandleResponse(response.data);
  } catch (error) {
    throw error;
  }
};

// Signup function
export const signup = async (email, password) => {
  try {
    const response = await axios.post(`${API_URL}/signup`, { email, password });
    return response.data;
  } catch (error) {
    console.error('Signup failed:', error);
    throw error;
  }
};

// Logout function
export const Logout = () => {
  
  localStorage.removeItem('token');
  store.dispatch(ClearUserData());
  window.location.href="/";
};

// password reset
export const requestPasswordReset = async (email) => {
  try {    
    const response = await axios.post(`${API_URL}/request-password-reset`, { email });
    return response.data;
  } catch (error) {
    console.log(error);    
    console.error('Password reset request failed:', error);
    throw error;
  }
};

// Get the current user token
export const getCurrentUser = () => {
  return localStorage.getItem('token');
};
