import React from 'react'
import { useSelector } from 'react-redux'
import {  useNavigate } from 'react-router-dom'


export default function AdminPrivateRoute({children}) {
    const navigate = useNavigate()
    const user = useSelector(state => state.user.currentUser.user)
    React.useEffect(() => {
        if(user && !user.isAdmin){
           navigate('/dashboard')
        } 
    },[user])
    
    return (
        <div className=' shadow-2xl text-sm '>
            {user && user.isAdmin ? children : "denied to delete post"}
         </div>
    )
    
} 