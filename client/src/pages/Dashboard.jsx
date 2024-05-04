import React from 'react'
import { useState,useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import DashProfile from '../components/DashProfile'
import DashSidebar from '../components/DashSidebar'
const Dashboard = () => {
  const location = useLocation()
  const [tab, setTab] = useState('')
  useEffect(() => {
    const searchParams = new URLSearchParams(location.search)
    const tabFromUrl = searchParams.get('tab')
    if (tabFromUrl) {
      setTab(tabFromUrl)
    }
  }, [location.search])
  
  console.log(tab)
  return (
    <div className=' min-h-screen flex flex-col md:flex-row gap-3'>
      <div className='md:w-56 w-full'>
        <DashSidebar/>
      </div>
      {tab === 'profile' && <DashProfile/>}
   </div>
  )
}

export default Dashboard