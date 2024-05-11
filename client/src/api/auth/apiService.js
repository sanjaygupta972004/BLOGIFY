// Desc: API service for authentication
import { signInStart, signInSuccess, signInFailure } from "../../redux/user/userSlice";
import axios from "axios";



const SignInHandler = async (formData,navigate,dispatch) => {

        if (!formData.email || !formData.password) {
            dispatch(signInFailure('Please provide email and password.'));
        }
    try {
        dispatch(signInStart());
        const response = await axios.post('/api/v1/users/sign-in', formData);

        if (response.status === 200) {
            dispatch(signInSuccess(response.data.data));
            navigate('/');
        } else {
            dispatch(signInFailure(response.data.message||"failed to sign in"));
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


const SignUpHandler = async (formData) => {
    
}

export {
    SignInHandler,
    SignUpHandler

}