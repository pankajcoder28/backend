import { createContext } from "react";
import { useState } from "react";

export const PostContext = createContext()

export  function PostContextProvider({children}) {
    
    const [post, setPost] = useState(null)
    const [loading, setLoading] = useState(false)
    const [feed, setFeed] = useState(null)

    

    return (<PostContext.Provider value={{post,setPost,loading,setLoading,feed,setFeed}}>
        {children}
    </PostContext.Provider>
    )
}