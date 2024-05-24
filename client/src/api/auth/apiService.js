
import {
  signInStart,
  signInSuccess,
  signInFailure,
  signOutStart,
  signOutSuccess,
  signOutFailure,
} from "../../redux/user/userSlice";
import axios from "axios";

const SignInHandler = async (formData, navigate, dispatch) => {
  try {
    if (!formData.email || !formData.password) {
      dispatch(signInFailure('Please provide email and password.'));
      return;
    }

     dispatch(signInStart());
      const response = await axios.post('/api/v1/users/sign-in', formData);
      
    if (response.status === 200) {
      dispatch(signInSuccess(response.data.data));
      navigate('/');
    } else {
      dispatch(signInFailure(response.data.message || 'Failed to sign in.'));
    }
  } catch (error) {
    if (error.response) {
      dispatch(signInFailure(error.response.data.message));
    } else if (error.request) {
      dispatch(signInFailure('Network error. Please try again.'));
    } else {
      dispatch(signInFailure(`An error occurred: ${error.message}`));
    }
  }
};

const SignUpHandler = async (formData, navigate, setError, setLoading) => {
  try {
    if (!formData.username || !formData.email || !formData.password) {
      setError('Please fill out all fields.');
      return;
    }
    setError(null);
    setLoading(true);
    const response = await fetch('/api/v1/users/sign-up', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    });

    const data = await response.json();

    if (!response.ok) {
      setError(data.message);
    } else {
      navigate('/sign-in');
    }
  } catch (error) {
    setError(error.message);
  } finally {
    setLoading(false);
  }
};

// const googleAuthHandler = async (auth, provider, dispatch, navigate) => {
    
// }

const signOutHandler = async (dispatch, navigate) => {
  try {
    dispatch(signOutStart());
    const response = await axios.get('/api/v1/users/sign-out');
    if (response.status === 200) {
      dispatch(signOutSuccess());
      navigate('/');
    } else {
      dispatch(signOutFailure(response.data.message || 'Failed to sign out.'));
    }
  } catch (error) {
    if (error.response) {
      dispatch(signOutFailure(error.response.data.message));
    } else if (error.request) {
      dispatch(signOutFailure('Network error. Please try again.'));
    } else {
      dispatch(signOutFailure(`An error occurred: ${error.message}`));
    }
  }
};

export {
  SignInHandler,
  SignUpHandler,
  signOutHandler,

}