import axios from 'axios';
import { toast } from 'react-toastify';
export const updateProfileImage = async (imageUrl, userId) => {
  try {
    if (!imageUrl) {
      throw new Error('Please provide an image URL.');
    }

    const response = await axios.patch(`/api/v1/users/update-profile-image/${userId}`, { imageUrl }, {
      withCredentials: true,
    });

    console.log(response.data.data);
    return response.data.data;
  } catch (error) {
    if (error.response) {
      throw new Error(error.response.data.message);
    } else {
      throw new Error('Something went wrong. Please try again.');
    }
  }
};

export const updateProfile = async ({ formData, userId }) => {
  try {
    if (!formData.username || !formData.email|| !formData.password) {
      throw new Error('Please fill out all fields.');
    }
     console.log(formData, userId)
    const response = await axios.patch(`/api/v1/users/update-profile/${userId}`, formData, {
      withCredentials: true,
    });
    if(response.data.statusCode === 200){
     toast.error(response.data.message)
    }
    return response.data.data;
  } catch (error) {
    if (error.response) {
      throw new Error(error.response.data.message);
    } else {
      throw new Error('Something went wrong. Please try again.');
    }
  }
};