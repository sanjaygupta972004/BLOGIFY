import axios from 'axios';
import { toast } from 'react-toastify';
export const updateProfileImage = async ({ imageUrl, userId }) => {
  if (!imageUrl) {
    throw new Error('Please provide an image URL.');
  }
  try {
    const response = await axios.patch(`/api/v1/users/update-profile-image/${userId}`, { 
      profileImage: imageUrl
     }, {
      withCredentials: true,
    });
    if (response.data.statusCode === 200) {
      toast.success('Profile image updated successfully');
    }
    return response.data.data;
  } catch (error) {
    if (error.response) {
      throw new Error(error.response.data.message);
    }
    throw new Error('Something went wrong. Please try again.' + error.message);
  };
}

export const updateProfile = async ({ formData, userId }) => {
  const { email, username, password } = formData;

  if (!username || !email || !password || username === "" || email === "" || password === "") {
    throw new Error('Please fill out all fields.');
  }

  try {
    const response = await axios.patch(`/api/v1/users/update-profile/${userId}`, formData, {
      withCredentials: true,
    });

    if (response.data.statusCode === 200) {
      toast.success(response.data.message);
    }

    return response.data.data;
  } catch (error) {
    if (error.response && error.response.data && error.response.data.message) {
      throw new Error(error.response.data.message);
    } else {
      throw new Error('Something went wrong. Please try again.');
    }
  }
};