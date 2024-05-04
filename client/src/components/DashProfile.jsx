import { Button, TextInput } from 'flowbite-react'
import { useSelector } from 'react-redux'

const DashProfile = () => {
  const {currentUser} = useSelector(state => state.user)  

  return (
    <div className='flex justify-center mt-10 w-full '>
      <form className='flex flex-col gap-3 w-full md:w-1/2' >
      <h1 className='text-center font-serif font-bold  text-2xl underline'> User_Profile</h1>
      <div className='w-[105px] h-[105px] shadow-md overflow-hidden rounded-full self-center '>
       <img className='w-full h-full object-cover border-5 border-[lightgray] ' src= "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ1FDNnI6Mh_eW4PGWdHB0CHxKfIfggOL7ZZoAN9lyYLPgobX49CNbktr9vMO0Ma3i461I&usqp=CAU" alt="userImg" />
      </div>
      <TextInput placeholder='username' label="username" type ="text" id="username"defaultValue={currentUser.user.username} />
      <TextInput placeholder='email' label="email" type="email" id="email" defaultValue={currentUser.user.email} />
        <TextInput placeholder='********' label="password" type="password" id="password" />
        <Button label="Update" >
          Update
        </Button>
        <div className='flex justify-between  '>
          <Button label="Delete" >
            Delete
          </Button>
          <Button label="Logout" >
            Logout
          </Button>
        </div>
        
    </form>

 </div>
  )
}

export default DashProfile