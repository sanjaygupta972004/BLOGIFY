import React from 'react'
import { useNavigate, Outlet } from 'react-router-dom'
import { useSelector } from 'react-redux'
export const PrivateRoute = () => {
    const navigate = useNavigate()
    const { currentUser } = useSelector((state) => state.user)
  return (
    <div>
      {currentUser ? <Outlet /> : navigate('/sign-in')}
    </div>
  )
}
