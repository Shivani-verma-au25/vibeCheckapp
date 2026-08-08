import { useState } from "react";
import { createContext } from "react";

export const songContext = createContext();


export const SongContenxtProvider = ({children}) => {
    const [songLoading , setSongLoading] = useState(false);
    const [songs ,setSongs] = useState([]);
    const [currentSong ,setCurrentSong] = useState(null);
    const [currentSongIndex, setCurrentSongIndex] = useState(0);


    


    return <songContext.Provider value={{songLoading , songs  ,setSongLoading ,setSongs , currentSong ,setCurrentSong ,currentSongIndex , setCurrentSongIndex}} >{children}</songContext.Provider>
}


