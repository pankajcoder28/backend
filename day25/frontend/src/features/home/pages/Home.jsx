import React from 'react'
import FaceExpression from '../../expression/components/FaceExpression'
import Player from '../components/player'
import { useSong } from '../hooks/usesong'

const Home = () => {

  const{handleGetSong} = useSong()
  return (
    <>
      <FaceExpression 
         onClick={(expression)=>{handleGetSong({expression})}}
      />
      <Player />
    </>
  )
}

export default Home
