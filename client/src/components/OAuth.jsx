import React from 'react'
import { Button } from 'flowbite-react'
import { FaGoogle } from "react-icons/fa6";
import { GoogleAuthProvider, getAuth, signInWithPopup } from 'firebase/auth'
import { app } from '../firebase'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { signInSuccess,signInFailure } from '../redux/user/userSlice';



const OAuth = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const auth = getAuth(app);
   
  const handleGoogleAuth = async () => {
    const provider = new GoogleAuthProvider();
    provider.setCustomParameters({ prompt: 'select_account' });
    try {
        const resultFromGoogle = await signInWithPopup(auth, provider);
        const user = resultFromGoogle.user;
     
        const googleData = {
            username:  user.displayName,
            email: user.email,
            password: user.uid,
            profileImage: user.photoURL
        }
        const response = await axios.post('/api/v1/users/google-auth', googleData);
        if (response.status = 200 || response.status === 201) {
            dispatch(signInSuccess(response.data.data));
            navigate('/');
        }
        
    } catch (error) {
       if(error.response) {
           dispatch(signInFailure(error.response.data.message));
       } else {
           dispatch(signInFailure(error.message))
       }
        
    }
   
}
    return (
        <Button gradientDuoTone="purpleToBlue" outline className=' font-sans'
            type='button'
            onClick={handleGoogleAuth}
        >
          <FaGoogle className='mr-2 w-5 h-5' />
          Continue with Google
         </Button>
  )
  
 }
export default OAuth    


