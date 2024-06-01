import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useState } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'


export default function AdminPrivateRoute() {
    const[admin ,setAdmin] = useState(false)
    const user = useSelector(state => state.user.currentUser.user)
    const navigate = useNavigate()
    useEffect(() => {
     if(user && user.isAdmin){
         setAdmin(true)
        }
   }, [user.isAdmin])
    return (
        <div>
            {admin ? <Outlet/> : navigate('/dashboard')}
      </div>
    )
}