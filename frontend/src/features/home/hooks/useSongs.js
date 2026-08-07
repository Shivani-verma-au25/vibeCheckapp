import { useContext } from "react";
import { songContext } from "../state/song.contens";
import { getSongByMood } from "../services/song.api";

export const useSongs = () => {
    const {songLoading , songs  ,setSongLoading ,setSongs} = useContext(songContext);
    
    // export const uploadSongsHandler = (songs) =>{};

    // get song by mood

    // const getSongByMoodHadnler = async ({mood}) =>{
    //     setSongLoading(true);
    //         console.log("mood outer" , mood);
    //     try {
    //         const response = await getSongByMood(mood);
            
    //         const song = response;
    //         console.log("resp",response.data);
    //         if(!song){
    //             throw new Error("Song not found.")
    //         };

    //         setSongs(song);
    //         return{
    //             success : response?.success,
    //             message : response?.message,
    //             song
    //         };
            
    //     } catch (error) {
    //         setSongLoading(false);
    //         return {
    //             success: error.response?.success,
    //             message:
    //                 error.response?.data?.message ||
    //                 error.message ||
    //                 "Something went wrong",
    //         };
    //     }finally{
    //         setSongLoading(false);
    //     };

    // };

    const getSongByMoodHadler = async ({ mood }) => {
    setSongLoading(true);

    try {
        const response = await getSongByMood({ mood });


        const song = response?.data;

        if (!song) {
            throw new Error("Song not found.");
        }

        setSongs(song);

        return {
            success: response.success,
            message: response.message,
            song,
        };

    } catch (error) {
        return {
            success: false,
            message:
                error.response?.data?.message ||
                error.message,
        };
    } finally {
        setSongLoading(false);
    }
};

    return {
        // uploadSongsHandler,
        getSongByMoodHadler,
        songs,
        songLoading
    };
}