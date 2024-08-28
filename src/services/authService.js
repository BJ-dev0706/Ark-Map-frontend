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

// Get the current user token
export const getCurrentUser = () => {
  return localStorage.getItem('token');
};

export const ChangePassword = async (id, current_password, new_password) => {
  try {    
    const response = await axios.post(`${API_URL}/auth/change/password`, { id, current_password, new_password });
    message.success(response.data.message);
  } catch (error) {
    // Log the error for debugging purposes
    console.error('Password reset request failed:', error);
  
    // Handle different types of errors based on the error response
    if (error.response) {
      // Server responded with a status code other than 2xx
      const statusCode = error.response.status;
  
      // Customize error message based on the status code
      if (statusCode === 400) {
        message.error('Invalid request. Please check your input and try again.');
      } else if (statusCode === 404) {
        message.error('The requested resource was not found.');
      } else if (statusCode === 500) {
        message.error('Server error. Please try again later.');
      } else {
        message.error(`An error occurred: ${error.response.data.message || 'Something went wrong. Please try again later.'}`);
      }
    } else if (error.request) {
      // Request was made but no response was received
      message.error('No response from the server. Please check your network connection.');
    } else {
      // Something happened in setting up the request
      message.error(`Request error: ${error.message}`);
    }
  
    // Rethrow the error if necessary
    throw error;
  }
  
}
