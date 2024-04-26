import { Button, Label,TextInput } from 'flowbite-react'
import { Link } from 'react-router-dom'
const SignUp = () => {
  return (
    <div className=" min-h-screen mt-20">
      <div className=' flex p-3 max-w-3xl mx-auto gap-3 md:gap-2 flex-col md:flex-row md:items-center '>
       <div className=" flex-1">
          <Link to="/" className="text-4xl sm:text-xl font-semibold dark:text-white font-serif "> <span className=' px-2
            py-1 bg-gradient-to-r from-orange-400 via-pink-500 to-pink-900 rounded-lg text-white font-mono '>Blogify
         </span>Blog 
       </Link>
        <p className= " font-normal text-[18px] mt-2">
            This is a blog website. You can sing up with your email and
            password or with Google to create a new account...
       </p>
      </div>
      <div className=" flex-1">
          <form className=' flex flex-col gap-4'>
            <div className=''>
              <Label value="Your username" />
              <TextInput placeholder="Username" type= "text" id="username"/>
            </div>
             <div className=''>
              <Label value="Your email" />
              <TextInput placeholder="Email" type= "email" id="email"/>
            </div>
            
             <div className=''>
              <Label value="Your password" />
              <TextInput placeholder="Password" type= "text" id="user"/>
            </div>
            <Button gradientDuoTone="purpleToBlue" className=' font-serif text-[29px]' >
              Sign Up
            </Button>
            <div className='flex gap-2 '>
              <span className=' font-medium'> Have an account?</span>
              <Link to="/sign-in" className='text-blue-500 font-serif underline'>Sign In</Link>
            </div>
        </form> 
        </div>
      </div>
     </div>
  )
}

export default SignUp