import React from 'react'
import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import DashProfile from '../components/DashProfile'
import DashSidebar from '../components/DashSidebar'
import SignOut from '../components/SignOut'
import GetDashboardPost from '../components/GetDashboardPost'
const Dashboard = () => {
  const location = useLocation()
  const [tab, setTab] = React.useState('')
  useEffect(() => {
    const searchParams = new URLSearchParams(location.search)
    const tabFromUrl = searchParams.get('tab')
    if (tabFromUrl) {
      setTab(tabFromUrl)
    }
  }, [location.search])
  

  return (
    <div className=' min-h-screen flex flex-col md:flex-row w-full gap-x-10 md:justify-between'>
        <DashSidebar />
          
      {tab === 'blogs' && (
        <div className='flex-grow w-full mr-4 mt-1 opacity-25'>
          <GetDashboardPost />
        </div>
      )}
      
      {tab !== 'blogs' && (
        <div className='w-full sm:w-[30%] flex justify-center md:min-w-[28%]'>
          {tab === 'profile' && <DashProfile />}
          {tab === 'sign-out' && <SignOut />}
        </div>
      )}
   </div>
  )
}

export default Dashboard