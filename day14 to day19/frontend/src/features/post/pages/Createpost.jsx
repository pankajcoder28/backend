import React, { useRef,useState } from 'react'
import '../style/post.scss'
import { usePost } from '../hook/usePost'
import { useNavigate } from 'react-router'

const Createpost = () => {

  const [caption, setCaption] = useState("")
  const postImageInputFieldRef = useRef(null)

  const{loading , handlecreatePost} = usePost()

  const navigate = useNavigate()

  async function handleSubmit(e) {
    e.preventDefault()
      const file = postImageInputFieldRef.current.files[0]
      await handlecreatePost(file , caption)
      navigate('/feed')
  }

  if(loading){
    return <main>
      <h1>Creating post...</h1>
    </main>
  }
  
  return (
    <main className='createpost-page'>
      <div className="form-container">
        <h1>create post</h1>
        <form onSubmit={handleSubmit}>
          <label className='postimage-label' htmlFor="postImage"> select image</label>
          <input ref={postImageInputFieldRef} hidden type="file" id='postImage' name='postImage' placeholder='image url' />
          <input onInput={(e)=>{setCaption(e.target.value)}} type="text" id='caption' name='caption' placeholder='enter the caption' />
          <button>Create post</button>
        </form>
      </div>
    </main>
  )
}

export default Createpost
