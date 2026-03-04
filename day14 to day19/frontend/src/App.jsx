import { RouterProvider } from "react-router-dom"
import {router} from './app.routes'
import './features/shared/globel.scss'
import { AuthProvider } from "./features/auth/auth.context"
import { PostContextProvider } from "./features/post/post.context"

function App() {
  return (
    <AuthProvider>
      <PostContextProvider>
        <RouterProvider router={router} />
      </PostContextProvider>
    </AuthProvider>
    
  )
}

export default App
