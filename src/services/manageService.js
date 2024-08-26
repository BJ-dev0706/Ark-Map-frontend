import axios from 'axios';
import { SetUsers, SetMaps } from '../redux/manageSlice';
import store from '../redux/store';
import { message, notification } from 'antd';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5500/api';

export const getUsers = async (retryCount = 0) => {
    try {
      const response = await axios.get(`${API_URL}/manage/users`);
      console.log(response);
      
      store.dispatch(SetUsers(response.data.users));
    } catch (error) {
        if (error.response && error.response.status === 429) {
            const retryAfter = error.response.headers['retry-after'];
            const waitTime = retryAfter ? parseInt(retryAfter) * 1000 : Math.pow(2, retryCount) * 1000;
        
            if (retryCount < 5) { // Limit the retries to 5 times
                await new Promise(resolve => setTimeout(resolve, waitTime));
                return getUsers(retryCount + 1);
            } else {
                console.error("Max retries reached. Please try again later.");
                notification.error({
                    message: "Database error",
                    description: error.response.data.message || "Max retries reached. Please try again later."
                });
            }
        } else {
            console.error("An error occurred: ", error);
        }
    }
};

export const setPermission = async (id) => {
    try {
        const response = await axios.get(`${API_URL}/manage/users/${id}`);
        console.log(response.data);
        getUsers()
        message.success(response.data.message)
    } catch (error) {
        console.error('Error changing password:', error);
        notification.error({
            message: "Database error",
            description: error.response.data.message || "Failed to set permission. Please try again."
        });
        throw error;
    }
};

export const deleteUser = async (id) => {
    try {
        const response = await axios.delete(`${API_URL}/manage/users/${id}`);
        console.log(response.data);
        getUsers()
        message.success(response.data.message)
    } catch (error) {
        console.error('Error delete user:', error);
        notification.error({
            message: "Database error",
            description: error.response.data.message || "Failed to delete user. Please try again."
        });
        throw error;
    }
};

export const changePassword = async (id) => {
    try {
        const response = await axios.put(`${API_URL}/manage/users/${id}`);
        console.log(response.data);
        getUsers()
        message.success(response.data.message, 5000);
    } catch (error) {
        console.error('Error changing password:', error);
        notification.error({
            message: "Database error",
            description: error.response.data.message || "Error changing password."
        });
        throw error;
    }
};

export const getMaps = async (retryCount = 0) => {
    try {
      const response = await axios.get(`${API_URL}/manage/maps`);
      
      store.dispatch(SetMaps(response.data.maps));
    } catch (error) {
      if (error.response && error.response.status === 429) {
        const retryAfter = error.response.headers['retry-after'];
        const waitTime = retryAfter ? parseInt(retryAfter) * 1000 : Math.pow(2, retryCount) * 1000;
        
        if (retryCount < 5) { // Limit the retries to 5 times
            await new Promise(resolve => setTimeout(resolve, waitTime));
            return getUsers(retryCount + 1);
        } else {
            console.error("Max retries reached. Please try again later.");
            notification.error({
                message: "Database error",
                description: error.response.data.message || "Max retries reached. Please try again later."
            });
        }
    } else {
        console.error("An error occurred: ", error);
    }
    }
};

export const deleteMap = async (id) => {
    try {
        const response = await axios.delete(`${API_URL}/manage/maps/${id}`);
        message.success(response.data.message);
        await getMaps(); // Ensure getMaps is awaited if it's an async function
    } catch (error) {
        console.error('Failed to delete map:', error);
        notification.error({
            message: "Failed to delete map.",
            description: error.response.data.message || "Please try again."
        });
        throw error;
    }
};
