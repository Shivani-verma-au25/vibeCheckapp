import { useContext } from "react";
import { songContext } from "../state/song.contens";
import { getAllSongs, getSongByMood, searchSong } from "../services/song.api";

export const useSongs = () => {
    const { songLoading,
        songs,
        setSongLoading,
        setSongs,
        currentSong,
        setCurrentSong,
        currentSongIndex,
        setCurrentSongIndex } = useContext(songContext);


    // export const uploadSongsHandler = (songs) =>{};

    // get song by mood

    // const getSongByMoodHander = async ({mood}) =>{
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

    //  song by mood handler
    const getSongByMoodHandler = async ({ mood }) => {
        setSongLoading(true);
        // const currentSong = songs[currentSongIndex] || null;


        try {

            const response = await getSongByMood({ mood });

            const playlist = response?.data;
            // console.log("res" , response);


            if (!playlist || playlist.length === 0) {
                throw new Error("No song found.");
            }

            // Save playlist
            setSongs(playlist);

            //set current song 
            // setCurrentSong(playlist[0])

            // Start from first song
            setCurrentSongIndex(0);

            return {
                success: response?.success,
                message: response?.message,
                playlist
            };

        } catch (error) {

            return {
                success: false,
                message:
                    error.response?.data?.message ||
                    error.message ||
                    "Something went wrong"
            };

        } finally {

            setSongLoading(false);

        }
    };

    // play next song
    const playNext = () => {

        if (!songs?.length) return;

        setCurrentSongIndex((prev) => {
            // const nextIndex =
            //     prev >= songs.length - 1 ? 0 : prev + 1;

            // set next song index into  setCurrentSong
            // setCurrentSong(songs[nextIndex]);

            // return nextIndex;

            if (prev >= songs?.length - 1) {
                return 0;
            }

            return prev + 1;
        });
    };

    // play previous song
    const playPrevious = () => {

        if (!songs?.length) return;

        setCurrentSongIndex((prev) => {

            // const previousIndex =
            //     prev <= 0 ? songs.length - 1 : prev - 1;
            // set next song index into setCurrentSong state
            // setCurrentSong(songs[previousIndex]);

            // return previousIndex;

            if (prev <= 0) {
                return songs.length - 1;
            }

            return prev - 1;
        });
    };


    // select song 
    const selectSong = (index) => {
        if (index < 0 || index >= songs.length) return;

        setCurrentSongIndex(index);
          // set next song index into setCurrentSong state
        // setCurrentSong(songs[index]);
    };


    // get all songs

    const getAllSongsHandler = async () =>{
        setSongLoading(true);

        try {
            const res = await getAllSongs();
            console.log('res' , res);
            const allSongs = res.data;

            if(allSongs?.length === 0){
                throw new Error('Song not found')
            };

            // set song into state
            setSongs(allSongs);

            return {
                success : res?.success,
                message : res?.message,
                allSongs
            }
                        
        } catch (error) {
            setSongLoading(false);
            return {
                success: false,
                message:
                    error.response?.data?.message ||
                    error.message ||
                    "Something went wrong"
            };
        }finally{
            setSongLoading(false);
        }
    } ;

    // search song 

    const serachHandler = async (query)=>{
        setSongLoading( true);
        try {
            const res = await searchSong(query);
            const song = res?.data;
            if(!song){
                throw new Error("Song not found")
            };

            setSongs(song);

            return {
                success : res?.success,
                message : res?.message,
                song
            };
            
        } catch (error) {
            setSongLoading(false)
            return {
                success : false,
                message : error?.response?.data?.message || error?.message || "Something went wrong"
            }
        }finally{
            setSongLoading( false)
        }
    }


    return {
        // uploadSongsHandler,
        getSongByMoodHandler,

        songs,
        songLoading,

        currentSong,
        setCurrentSong,
        currentSongIndex,

        playNext,
        playPrevious,
        selectSong,

        getAllSongsHandler,
        serachHandler
    };
}