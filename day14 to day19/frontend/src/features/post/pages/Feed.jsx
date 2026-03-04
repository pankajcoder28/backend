import React from 'react'
import '../style/Feed.scss'
import Post from '../components/Post'
import { usePost } from '../hook/usePost'
import { useEffect } from 'react'
import Navbar from '../../shared/components/Navbar'

const Feed = () => {

    const {feed,handleGetFeed,loading} = usePost()

    useEffect(()=>{
        handleGetFeed()
    },[])
    if(loading || !feed){
        return <main><h1>feed is loading</h1></main>
    }
  return (
    <main className='feed-page'>
        <div className="feed">
            <Navbar/>
            <div className="posts">
                {feed.map(post=>{
                    return <Post user ={post.user} post = {post} />
                })}
            </div> 
        </div>
    </main>
  )
}

export default Feed
