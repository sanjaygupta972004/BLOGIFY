import React from 'react'
import { signOutHandler } from '../api/auth/apiService'
import { useNavigate } from 'react-router-dom'
import { useDispatch ,useSelector} from 'react-redux'
export default function SignOut() {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { loading, error } = useSelector((state) => state.user) 
    const handleSignOut = async (e) => {
        e.preventDefault()
        await signOutHandler(dispatch, navigate)
    }
  return (
      <div>
            <h1>Sign Out</h1>
            <button onClick={handleSignOut} disabled={loading}>Sign Out</button>
            {error && <p>{error}</p>}
    </div>
  )
}
