import { useEffect, useState } from 'react'
import axios from 'axios'

function App() {
  const [notes, setNotes] = useState([])
  const [editnote, setEditnote] = useState(null)

  function fetchnotes(){
    axios.get('http://localhost:3000/api/note').then(
    (res)=>{
      setNotes(res.data.note)
    }
  )
  }

  function handleform(e){
    e.preventDefault()
    const{title,description} = e.target.elements
    
    axios.post('http://localhost:3000/api/note',{
      title : title.value,
      description: description.value
    }).then((res)=>{
        console.log(res.data);
        fetchnotes()
    })

  }
  function handledeleteform(noteid){
    axios.delete('http://localhost:3000/api/note/'+noteid)
    fetchnotes()
  }

  function handleupdate(e){
    e.preventDefault()
    const{title,description} = e.target.elements

    axios.patch('http://localhost:3000/api/note/'+editnote._id,{
      title : title.value,
      description :description.value,
    }).then(()=>{
      setEditnote(null)
      fetchnotes()
    })
  }

  useEffect(()=>{
    fetchnotes()
  },[])

  return (
    <>
    
    <form  className='notes-creating-form' onSubmit={handleform}>
      <input name='title' type="text" placeholder='enter title' />
      <input name='description' type="text" placeholder='enter description' />
      <button>create note</button>
    </form>

    {editnote && (<form className='note-updating-form' onSubmit={handleupdate}>
      <input name='title' type="text" defaultValue={editnote.title} placeholder='text...'/>
      <input name='description' type="text" defaultValue={editnote.description} placeholder='text...' />
      <button>update note</button>
    </form>)}

    <div className="notes">
      {
         notes.map(note =>{
           return <div className="note">
          <h1>{note.title}</h1>
          <p>{note.description}</p>
          <button onClick={()=>{handledeleteform(note._id)}}>delete</button>
          <button onClick={()=>{setEditnote(note)}}>edit</button>
          
      </div>
        })
      }
    </div>
    </>
  )
}

export default App
