import { useState } from "react";
import { createContext } from "react";

export const songContext = createContext();


export const SongContenxtProvider = ({children}) => {
    const [songLoading , setSongLoading] = useState(false);
    const [songs ,setSongs] = useState([]);
    const [currentSongIndex, setCurrentSongIndex] = useState(0);
    const [playQueue, setPlayQueue] = useState([]);

    const currentSong = playQueue[currentSongIndex] || null;
   



    return <songContext.Provider value={{
        songLoading , 
        songs  ,
        setSongLoading ,
        setSongs , 

        currentSong ,

        setPlayQueue,
        playQueue,

        currentSongIndex , 
        setCurrentSongIndex ,  }} >{children}</songContext.Provider>
}


