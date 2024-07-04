import React from 'react'
import { Sidebar, SidebarItemGroup, SidebarItems } from "flowbite-react";
import { HiArrowNarrowRight, HiUser } from "react-icons/hi";
import { Link,useLocation } from "react-router-dom";
import { useState,useEffect } from 'react'
import { TfiWrite } from "react-icons/tfi";
import { useSelector } from 'react-redux';
import { MdPostAdd } from "react-icons/md";

const DashSidebar = () => {
   const location = useLocation()
  const [tab, setTab] = useState('')
  const { currentUser } = useSelector(state => state.user)
  useEffect(() => {
    const searchParams = new URLSearchParams(location.search)
    const tabFromUrl = searchParams.get('tab')
    if (tabFromUrl) {
      setTab(tabFromUrl)
    }
  }, [location.search])
  return (
    <Sidebar className='rounded-lg w-full md:w-[16%] pt-[2px] '>
      <SidebarItems>
        <SidebarItemGroup className=" sm:font-2xl font-xl px-1">
          <Link to= "/dashboard?tab=profile">
            <Sidebar.Item
              icon={HiUser}
              label={currentUser?.user?.isAdmin ? "Admin" : "User"}
              active={tab === "profile"}
              labelColor="dark"
              className="font-mono text-[18px] cursor-pointer" 
              as={"div"}
              >
              Profile
            </Sidebar.Item> 
          </Link>
          <br />
          <Link to= "/dashboard?tab=sign-out">
          <Sidebar.Item
            icon={HiArrowNarrowRight}
            title="Logout"
            active={tab === "sign-out"}
            className=" cursor-pointer font-mono text-[18px]"
            labelColor="dark"
            as={"div"}
            >
            Sign-Out
            </Sidebar.Item>
          </Link>
           <br />
          <Link to= "/newPost/write-blog">
            <Sidebar.Item
              icon={TfiWrite}
              labelColor="dark"
              className="font-mono cursor-pointer md:text-[18px]"
              as={"div"}
              >
              Write-Blog
            </Sidebar.Item> 
          </Link>
          <br />
          <Link to= "/dashboard?tab=blogs">
            <Sidebar.Item
              icon={MdPostAdd}
              active={tab === "blogs"}
              labelColor="dark"
              className="font-mono text-[18px] cursor-pointer" 
              as={"div"}
              >
              Blogs
            </Sidebar.Item>
          </Link>
          <br />
        </SidebarItemGroup>
      </SidebarItems>
  </Sidebar>
  )
}

export default DashSidebar