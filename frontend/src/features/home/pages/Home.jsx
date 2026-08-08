import React from 'react'
import FaceExpression from '../../Expression/components/FaceExpression'
import Player from '../compoents/Player'
import { useSongs } from '../hooks/useSongs';
import Playlist from '../compoents/PlayList';

const Home = () => {
    const {getSongByMoodHandler ,currentSong } = useSongs();
    
  return (
     <main className="min-h-screen bg-black">

            <FaceExpression
                onClick={(expression) =>
                    getSongByMoodHandler({
                        mood: expression
                    })
                }
            />

            <div className="mx-auto grid max-w-6xl gap-8 p-6 lg:grid-cols-[1fr_350px]">

                <div>
                    {/* Player */}
                    {currentSong && <Player />}
                </div>

                <div>
                    {/* Playlist */}
                    {currentSong && <Playlist />}
                </div>

            </div>

        </main>
  )
}

export default Home