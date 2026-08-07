import { useState } from "react";
import { createContext } from "react";

export const songContext = createContext();


export const SongContenxtProvider = ({children}) => {
    const [songLoading , setSongLoading] = useState(false);
    const [songs ,setSongs] = useState({
        url : "https://ik.imagekit.io/8g3ispr7t/vibe-check/songs/Mere_Mehboob__From__Vicky_Vidya_Ka_Woh_Wala_Video____DownloadMing.Com__fc7nxQDUx.mp3",
        posterUrl : "https://ik.imagekit.io/8g3ispr7t/vibe-check/posters/Mere_Mehboob__From__Vicky_Vidya_Ka_Woh_Wala_Video____DownloadMing.Com__X1T31NkP_.jpeg",
        title : "Mere Mehboob (From \"Vicky Vidya Ka Woh Wala Video\") [DownloadMing.Com]",
        mood : "happy",
    });
    return <songContext.Provider value={{songLoading , songs  ,setSongLoading ,setSongs}} >{children}</songContext.Provider>
}