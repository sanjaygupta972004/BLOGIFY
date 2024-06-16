import axios from 'axios';

export const axiosBaseQuery = ({ baseUrl } = { baseUrl: '' }) => {
  return async ({ url, method, data, headers, params, ...rest }) => {
        const fullUrl = baseUrl + url;
        console.log(`Request URL: ${fullUrl}`); // Add logging to verify the URL
    try {
    
      const response = await axios({
        url: baseUrl + url,
        method,
        data,
        headers,
        params,
        ...rest,
        withCredentials: true,
      });
      return { data: response.data };
    } catch (axiosError) {
      let err = axiosError;
      return {
        error: {
          status: err.response?.status,
          data: err.response?.data || err.message,
        },
      };
    }
  };
};

