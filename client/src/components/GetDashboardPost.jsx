import React from 'react'
import {Table,Button} from "flowbite-react"

export default function GetDashboardPost() {

  return (
    <div className='table-auto overflow-x-scroll md:mx-auto p-2  scrollbar scrollbar-thumb-sky-700 scrollbar-track-sky-300 h-35'>
      <Table className=' shadow-md rounded-lg ' hoverable >
        <Table.Head className=' text-sm sm:text-[18px] text-gray-500 dark:text-white'>
          <Table.HeadCell>Post Updated</Table.HeadCell>
          <Table.HeadCell> Post Image</Table.HeadCell>
          <Table.HeadCell>Post Title</Table.HeadCell>
          <Table.HeadCell>Category</Table.HeadCell>
          <Table.HeadCell>
            <span className=" text-blue-500 rounded-lg ">Edit</span>
          </Table.HeadCell>
          <Table.HeadCell>
            <span className=" text-red-500 rounded-lg ">Delete</span>
          </Table.HeadCell>

        </Table.Head>
        <Table.Body className=' divide-y-1'>
          <Table.Row className=' bg-white dark:bg-gray-600 dark:border-gray-500 font-semibold 
           text-gray-500 dark:text-white  text-sm sm:text-[14px]'>
            <Table.Cell>
                <div className="">Post Update</div>
            </Table.Cell>
            <Table.Cell>
              <img src="https://via.placeholder.com/150" alt="Placeholder" className="w-15 h-12 rounded-lg fit-i" />
            </Table.Cell>
            <Table.Cell>
              <div >title</div>
            </Table.Cell>
            <Table.Cell>
              <div >title</div>
            </Table.Cell>
            <Table.Cell>
              <Button gradientMonochrome="teal">Edit</Button>
            </Table.Cell>
            <Table.Cell>
              <Button gradientMonochrome="failure" >Delete</Button>
            </Table.Cell>
          </Table.Row>
        </Table.Body>
      </Table>

    </div>
  )
}
