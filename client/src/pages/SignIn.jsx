import { Alert, Button, Label, Spinner, TextInput } from 'flowbite-react';
import { useState } from 'react';
import { Link,useNavigate } from 'react-router-dom';
import { useSelector,useDispatch } from 'react-redux';
import OAuth from '../components/OAuth';
import { SignInHandler } from '../api/auth/apiService';


export default function SignIn() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value.trim() });
  };
 const { loading, error } = useSelector((state) => state.user);
 const errorMessage = error;

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(SignInHandler);
    await SignInHandler(formData,navigate,dispatch);
  };

  return (
    <div className='min-h-screen mt-20'>
      <div className='flex p-3 max-w-3xl mx-auto flex-col md:flex-row md:items-center gap-5'>
        {/* Left */}
        <div className='flex-1'>
          <Link to='/' className='font-bold dark:text-white text-4xl'>
            <span className='px-2 py-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-lg text-white'>
              Blogify
            </span>
            Blog
          </Link>
          <p className='text-xl font-serif mt-5'>
            Welcome to our blog Website! Sign in with your email and password, or choose the quicker option: 'Sign in with Google'
          </p>
        </div>
        {/* Right */}

        <div className='flex-1'>
          <form className='flex flex-col gap-4' onSubmit={handleSubmit}>
            <div>
              <Label value='Your email' />
              <TextInput
                type='email'
                placeholder='name@gmail.com'
                id='email'
                onChange={handleChange}
              />
            </div>
            <div>
              <Label value='Your password' />
              <TextInput
                type='password'
                placeholder='Password'
                id='password'
                onChange={handleChange}
              />
            </div>
            <Button
              gradientDuoTone='purpleToPink'
              type='submit'
              disabled={loading}
              className='font-sans text-xl'
            >
              {loading ? ( 
                <>
                  <Spinner size='sm' />
                  <span className='pl-3'>Loading...</span>
                </>
              ) : (
                'Sign In'
              )}
            </Button>
            <OAuth />
             {errorMessage && (
            <Alert className='mt-5 font-mono text-xl' color='failure'>
              {errorMessage}
            </Alert>
          )}
          </form>
          <div className='flex gap-2 text-[17px] mt-5'>
            <span>Don't have an account?</span>
            <Link to='/sign-up' className='text-blue-500 font-sans font-bold hover:underline'>
              Sign Up
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

