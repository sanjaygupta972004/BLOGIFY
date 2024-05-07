import React from 'react'
import { Sidebar, SidebarItemGroup, SidebarItems } from "flowbite-react";
import { HiArrowNarrowRight, HiUser } from "react-icons/hi";
import { Link,useLocation } from "react-router-dom";

import { useState,useEffect } from 'react'

const DashSidebar = () => {
   const location = useLocation()
  const [tab, setTab] = useState('')
  useEffect(() => {
    const searchParams = new URLSearchParams(location.search)
    const tabFromUrl = searchParams.get('tab')
    if (tabFromUrl) {
      setTab(tabFromUrl)
    }
  }, [location.search])
  return (
    <Sidebar className='w-full md:w-56 '>
      <SidebarItems>
        <SidebarItemGroup>
          <Link to= "/dashboard?tab=profile">
            <Sidebar.Item
              icon={HiUser}
              label="User"
              active={tab === "profile"}
              labelColor="dark"
              className="font-mono"
              as={"div"}
              >
              Profile
            </Sidebar.Item> 
          </Link>
          <Sidebar.Item
            icon={HiArrowNarrowRight}
            title="Logout"
            className=" cursor-pointer font-mono"
            labelColor="dark">
            Logout
          </Sidebar.Item>
        </SidebarItemGroup>
      </SidebarItems>
  </Sidebar>
  )
}

export default DashSidebar