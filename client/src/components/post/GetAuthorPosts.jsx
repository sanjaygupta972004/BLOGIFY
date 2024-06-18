import React, { useEffect } from 'react'
import {Table,Button} from "flowbite-react"
import {useSelector,useDispatch} from "react-redux"
import { getAuthorPostAsync } from '../../redux/post/PostSlice'

export default function GetAuthorPosts() {

  const dispatch = useDispatch();
  const {authorPosts} = useSelector(state => state.post);
  const {currentUser} = useSelector(state => state.user);

  const posts = authorPosts && authorPosts.posts;
  const totalAuthorPosts = authorPosts && authorPosts.totalPostsAccordingToQuery;
   
  console.log("posts",posts)
 
  useEffect(() => {
   if(currentUser.user){
    dispatch(getAuthorPostAsync({authorId:currentUser.user?.id}))
   }
  }, [dispatch,currentUser.user?.id])





  return (
    <div className='table-auto md:mx-auto p-2 scrollbar-corner-sky-500 scrollbar scrollbar-thumb-slate-700 scrollbar-track-slate-300 h-full overflow-scroll'>
      <Table className=' shadow-md rounded-lg ' hoverable >
        <Table.Head className=' text-sm sm:text-[18px] text-gray-500 static dark:text-white'>
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
        {posts && posts.length === 0 ? <div className='text-center text-gray-500 dark:text-white'>No Posts Found</div> :(
          posts.map((post) => (
        <Table.Body className=' divide-y-1 ' key={post._id}>
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
             ))
             )}
      </Table>
 
    </div>
  )
}
