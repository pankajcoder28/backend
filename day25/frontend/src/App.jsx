import { RouterProvider } from "react-router"
import {router} from './app.routes'
import './features/shared/styles/global.scss'
import { AuthProvider } from "./features/auth/auth.context"
import { SongContextProvider } from "./features/home/song.context"
import Player from "./features/home/components/player"

function App() {
  return (
    <AuthProvider>
      <SongContextProvider>
          <RouterProvider router = {router} />
          <Player/>
      </SongContextProvider>
    </AuthProvider>
  )
}

export default App
