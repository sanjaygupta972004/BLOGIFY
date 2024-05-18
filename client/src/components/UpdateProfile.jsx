
import { Button, Card, Alert, Label, Spinner, TextInput } from "flowbite-react";
import { useEffect, useState } from "react";
import { updateProfileAsync} from '../redux/profile/profileSlice'
import { useDispatch, useSelector } from 'react-redux'
import { signInSuccess } from "../redux/user/userSlice";


export default function UpdateProfile() {
    const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    username: "",
    password: ""
    });
  
  const dispatch = useDispatch()
  const { currentUser } = useSelector(state => state.user)
  const { loading, profileError,userProfile } = useSelector(state => state.profile)

  const userId = currentUser.user?.id
  const handleChange = (e) => {
        setFormData({ ...formData, [e.target.id]: e.target.value });
    }
  
  const handleSubmit = (e) => {
    e.preventDefault();
    if(userId){
    dispatch(updateProfileAsync({formData,userId}))  
    }
  }

  useEffect(() => {
    if (userProfile) {
      dispatch(signInSuccess(userProfile))
      setFormData({ email: "", username: "", password: "" });
      setShowForm(false);
    }
   },
    [userProfile,dispatch])
        
    

return (
        <Card className="max-w-sm min-h-content">
      {!showForm && (
      <Button className=" w-full h-full text-2xl font-serif " onClick={() => setShowForm(true)}>Update-Profile</Button>
         )}  
        {showForm && (
         <form className="flex flex-col gap-4">
         <div>
          <div className="mb-2 block">
            <Label htmlFor="email" value="Your email" />
          </div>
                  <TextInput
                      id="email"
                      type="email"
                      placeholder="name@gmail.com"
                      required
                      onChange={handleChange}
                  />
           </div>
         <div>
          <div className="mb-2 block">
            <Label htmlFor="username" value="Your Username" />
          </div>
                  <TextInput
                      id="username"
                      type="text"
                      required
                      onChange={handleChange}
                  />
        </div>
        <div>
          <div className="mb-2 block">
            <Label htmlFor="password" value="Your password" />
          </div>
                  <TextInput
                      id="password"
                      type="password"
                      required
                     onChange={handleChange}
                  />
        </div>
        {
          loading ? (
            <Button className="w-full" disabled>
              <>
                <Spinner size="sm" />
                <span className="pl-4">Updating</span>
              </>
            </Button>
          ) : (
            <Button className="w-full" type="submit" onClick={handleSubmit}>
              Update Profile
            </Button>
          )
        }
        {profileError && <Alert className='mt-5 font-mono text-xl' color='failure'>{profileError}</Alert>}
       </form>
            )}
            
    </Card>
);
}
