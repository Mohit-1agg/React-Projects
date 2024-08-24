/**
 *  Axios utility functions
 */
import axios from 'axios';
import $config from '../../conf/web/web.local.json';

// Create an instance of Axios with default configurations
const axiosInstance = axios.create({
  baseURL: $config.appData.core_api,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Utility function for GET requests
const get = async (url, config = {}) => {
  try {
    const response = await axiosInstance.get(url, {
      ...config,
      headers: {
        ...axiosInstance.defaults.headers,
        ...config.headers
      }
    });

    return response.data;
  } catch (error) {
    console.error('GET request error:', error.response);
    throw error;
  }
};

// Utility function for POST requests
const post = async (url, data, config = {}) => {
  try {
    const response = await axiosInstance.post(url, data, {
      ...config,
      headers: {
        ...axiosInstance.defaults.headers,
        ...config.headers // Merge default headers with custom headers
      }
    });
    return response.data;
  } catch (error) {
    console.error('POST request error:', error.response);
    throw error;
  }
};

// Utility function for PUT requests
const put = async (url, data, config = {}) => {
  try {
    const response = await axiosInstance.put(url, data, {
      ...config,
      headers: {
        ...axiosInstance.defaults.headers,
        ...config.headers // Merge default headers with custom headers
      }
    });
    return response.data;
  } catch (error) {
    console.error('PUT request error:', error.response);
    throw error;
  }
};

// Utility function for DELETE requests
const remove = async (url, config = {}) => {
  try {
    const response = await axiosInstance.delete(url, {
      ...config,
      headers: {
        ...axiosInstance.defaults.headers,
        ...config.headers // Merge default headers with custom headers
      }
    });
    return response.data;
  } catch (error) {
    console.error('DELETE request error:', error.response);
    throw error;
  }
};

export default { get, post, put, remove };
