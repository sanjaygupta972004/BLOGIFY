import { Button, Navbar, TextInput } from 'flowbite-react'
import { Link,useLocation } from 'react-router-dom'
import { AiOutlineSearch} from "react-icons/ai";
import { FaMoon } from "react-icons/fa";

const Header = () => {
  const path = useLocation().pathname
  return (
      <Navbar className=' border-b-2'>
          <Link to="/" className="self-center whitespace-nowrap
           text-sm sm:text-xl font-semibold dark:text-white "> <span className=' px-2
            py-1 bg-gradient-to-r from-orange-400 via-pink-500 to-pink-900 rounded-lg text-white  '>Blogify
         </span>Blog 
       </Link>
      <form >
        <TextInput
          type='search'
          placeholder='Search...'
          rightIcon={AiOutlineSearch}
          className='hidden lg:inline'
        />
      </form>
      <Button className='w-12 h-10 lg:hidden' color='gray' pill >
        <AiOutlineSearch />
      </Button>
      <div className=' flex gap-2 md:order-2 '>
        <Button className=' w-12 h-10 hidden sm:inline ' color= "gray" pill>
          <FaMoon/>
        </Button>
        <Link to="/sign-up" >
          <Button gradientDuoTone = "purpleToBlue" className=' font-mono text-xl' outline>
            Sign In
          </Button>
        </Link>
        <Navbar.Toggle/>
      </div>
       <Navbar.Collapse>
          <Navbar.Link active = {path ==='/'} as ={"div"} className=' font-medium text-[20px] hover:underline'>
            <Link to="/" >Home</Link>
          </Navbar.Link>
          <Navbar.Link active = {path ==='/about'} as ={"div"} className=' font-medium text-[20px] hover:underline'>
            <Link to="/about">About</Link>
          </Navbar.Link>
          <Navbar.Link active = {path ==='/projects'} as ={"div"} className=' font-medium text-[20px] hover:underline'>
            <Link to="/projects">Projects</Link>
          </Navbar.Link>
        </Navbar.Collapse>
    </Navbar>
  )
}

export default Header