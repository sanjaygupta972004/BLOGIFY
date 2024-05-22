import { Avatar, Button, Dropdown, DropdownDivider, Navbar, TextInput } from 'flowbite-react'
import { Link,useLocation } from 'react-router-dom'
import { AiOutlineSearch} from "react-icons/ai";
import { FaMoon } from "react-icons/fa";
import { FaSun } from "react-icons/fa6"
import { useSelector, useDispatch } from 'react-redux'
import { toggleTheme } from '../redux/theme/themeSlice';

const Header = () => {
  const path = useLocation().pathname
  const dispatch = useDispatch()
  const { theme } = useSelector((state) => state.theme);
  const { currentUser } = useSelector((state) => state.user)
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
      <div className=' flex gap-5 md:order-2 '>
        <Button className=' w-12 h-12 hidden sm:inline ' color="gray" 
          onClick={()=> dispatch(toggleTheme()) }>
          {theme && theme=== 'light'?<FaMoon />:<FaSun/>}
        </Button>
        <Link to="/sign-in" >
          <Button gradientDuoTone = "purpleToBlue" className= {`font-mono ${currentUser?"w-12 h-12":"w-15 h-15"} text-sm sm:text-xl`} >
            {currentUser ? (
              <Dropdown
              arrowIcon={false}
              inline
              label={
                <Avatar
                  alt="user"
                  size="sm"
                  rounded
                />
              }  >
                <Dropdown.Header>
                  <span className=' block text-sm  text-start '>@{currentUser.user?.username.toLowerCase()}</span>
                  <span className=' block truncate font-medium text-md' >{currentUser.user?.email }</span>
                </Dropdown.Header>
                <Link to="/dashboard?tab=profile" >
                  <Dropdown.Item
                    as={"div"}
                  >Profile
                  </Dropdown.Item>
                </Link>
                <DropdownDivider />
                <Link to="/dashboard?tab=sign-out" >
                  <Dropdown.Item
                    as={"div"}
                  >Sign-Out
                  </Dropdown.Item>
                </Link>

                
            </Dropdown>
            )
          
           :"Sign In"} 
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