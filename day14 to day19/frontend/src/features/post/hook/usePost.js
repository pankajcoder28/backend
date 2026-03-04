import { useContext,useEffect } from "react";
import { PostContext } from "../post.context";
import { createPost, getFeed} from "../services/Post.api";

export const usePost = ()=> {

    const context = useContext(PostContext)

    const{post,loading,setLoading,feed,setFeed} = context

    const handleGetFeed = async()=>{
        setLoading(true)
        const data = await getFeed()
        setFeed(data.post)
        setLoading(false)
    }

    const handlecreatePost = async(imageFile,caption)=>{
        setLoading(true)
        const data = await createPost(imageFile,caption)
        setFeed([data.post])
        setLoading(false)
    }

    useEffect(()=>{
        handleGetFeed()
    },[])

    return {loading,feed,post,handleGetFeed ,handlecreatePost }
}
