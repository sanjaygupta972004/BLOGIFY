import React, { useEffect,useState } from 'react'
import {Table,Button,Spinner} from "flowbite-react"
import {useSelector,useDispatch} from "react-redux"
import { getAuthorPostAsync } from '../../redux/post/PostSlice'
import { toast } from 'react-toastify';

export default function GetAuthorPosts() {

  const dispatch = useDispatch();
  const {authorPosts,error,isLoading} = useSelector(state => state.post);
  const {currentUser} = useSelector(state => state.user);
  const[startIndex,setStartIndex] = useState(1)
  const[limit,setLimit] = useState(9)
     
  const posts = authorPosts && authorPosts.posts ? authorPosts.posts:[];
  const totalAuthorPosts = authorPosts && authorPosts.totalPostsAccordingToQuery;
   
  useEffect(() => {
   if(currentUser.user){
       dispatch(getAuthorPostAsync({
      authorId:currentUser.user?.id,
      startIndex,
      limit,
    }))
   }
   if(error){
     toast.error(error) 
   }

  }, [dispatch,currentUser.user?.id,limit])


const loadMorePosts = () => {
  setStartIndex(startIndex + 1)
  setLimit(limit + 5)
}


  return (
    <div className='table-auto md:mx-auto p-2 scrollbar-corner-sky-500 scrollbar scrollbar-thumb-slate-700 scrollbar-track-slate-300 h-full overflow-scroll   '>
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
           text-gray-500 dark:text-white  text-sm sm:text-[15px]'>
            <Table.Cell>
                <div className="">{new Date(post.updatedAt).toLocaleDateString()}</div>
            </Table.Cell>
            <Table.Cell>
              <img src= {post.postImage} alt="postImg" className="w-14 h-14 rounded-lg" />
            </Table.Cell>
            <Table.Cell>
              <div >{post.title}</div>
            </Table.Cell>
            <Table.Cell>
              <div >{post.category}</div>
            </Table.Cell>
            <Table.Cell>
              <Button gradientMonochrome="teal">edit</Button>
            </Table.Cell>
            <Table.Cell>
              <Button gradientMonochrome="failure" >Delete</Button>
            </Table.Cell>
          </Table.Row>
        </Table.Body>
             ))
         )}
        <div className='flex justify-center mt-4 mb-2 '>
        <Button className='w-full max-w-sm border border-dotted font-normal' gradientDuoTone='purpleToBlue' onClick={loadMorePosts}>
          {isLoading ? <Spinner size={"lg"} /> : "Load More Posts"}
         </Button>
       </div>
      </Table>
 
    </div>
  )
}
