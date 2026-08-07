import React from 'react'
import FaceExpression from '../../Expression/components/FaceExpression'
import Player from '../compoents/Player'
import { useSongs } from '../hooks/useSongs';

const Home = () => {
    const {getSongByMoodHadler} = useSongs();
    
  return (
    <>
        <FaceExpression  onClick={(expression) => getSongByMoodHadler({mood  : expression})} />
        <Player/>
    </>
  )
}

export default Home