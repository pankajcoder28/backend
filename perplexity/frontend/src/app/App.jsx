import { RouterProvider } from "react-router"
import { router } from "./app.routes.jsx"
import { useEffect } from "react"
import { useAuth } from "../features/auth/hook/useAuth.js"

function App() {
  const auth = useAuth()

  useEffect(()=>{
    auth.handleGetme()
  },[])
  
 return(
    <RouterProvider router={router} />
 )
}

export default App
