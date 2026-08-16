import { useContext } from "react";
import { songContext } from "../state/song.contens";
import { getAllSongs, getSongByMood, searchSong } from "../services/song.api";

export const useSongs = () => {
    const { songLoading,
        songs,
        setSongLoading,
        setSongs,

        currentSongIndex,


        playQueue,
        setPlayQueue,


        currentSong,
        // setCurrentSong,
        setCurrentSongIndex } = useContext(songContext);


    // export const uploadSongsHandler = (songs) =>{};



    //  song by mood handler
    const getSongByMoodHandler = async ({ mood }) => {
        setSongLoading(true);


        try {

            const response = await getSongByMood({ mood });

            const playlist = response?.data;
            console.log("res" , response);


            if (!playlist) {
                throw new Error("No song found.");
            }

            // setRecommendedSongs
            setRecommendedSongs(playlist)

             // IMPORTANT:
            // Mood songs become the current play queue
            setPlayQueue(playlist);

           
            // Start first recommended song
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

        if (!playQueue?.length) return;


        setCurrentSongIndex((prev) => {

            if (prev >= playQueue?.length - 1) {

                // Go back to first song
                return 0;
            }

            return prev + 1;
        });

        // --------------------

        // if (!songs?.length) return;
       

        // setCurrentSongIndex((prev) => {
        // // const nextIndex =
        // // prev >= songs.length - 1 ? 0 : prev + 1;

        // // set next song index into  setCurrentSong
        // // setCurrentSong(songs[nextIndex]);

        // // return nextIndex;

        // if (prev >= songs?.length - 1) {
        //     return 0;
        // }

        // return prev + 1;
        // });
    };

    // play previous song
    const playPrevious = () => {

        if (!playQueue?.length) return;


        setCurrentSongIndex((prev) => {

            if (prev <= 0) {

                return playQueue?.length - 1;
            }

            return prev - 1;
        });


        // -------------------------

        // if (!songs?.length) return;

        // setCurrentSongIndex((prev) => {

        // // const previousIndex =
        // //     prev <= 0 ? songs.length - 1 : prev - 1;
        // // set next song index into setCurrentSong state
        // // setCurrentSong(songs[previousIndex]);

        // // return previousIndex;

        //     if (prev <= 0) {
        //         return songs.length - 1;
        //     }

        //     return prev - 1;
        // });
    };


    // select song 
    // const selectSong = (index) => {
    //     if (index < 0 || index >= songs.length) return;

    //     setCurrentSongIndex(index);
    //     // set next song index into setCurrentSong state
    //     // setCurrentSong(songs[index]);
    // };

    const selectSong = (index) => {

        if (
            index < 0 ||
            index >= playQueue?.length
        ) {
            return;
        }


        setCurrentSongIndex(index);
    };


    // get all songs

    const getAllSongsHandler = async () => {
        setSongLoading(true);

        try {
            const res = await getAllSongs();
            const allSongs = res.data;
         
            if (allSongs?.length === 0) {
                throw new Error('Song not found')
            };

            // set song into state
            setSongs(allSongs);

            // IMPORTANT:
            // If user wants to play all songs,
            // make all songs the queue.
            setPlayQueue(allSongs);

            // Start from first song
            setCurrentSongIndex(0);

            return {
                success: res?.success,
                message: res?.message,
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
        } finally {
            setSongLoading(false);
        }
    };

    // search song 

    const serachHandler = async (query) => {
        setSongLoading(true);
        try {
            const res = await searchSong(query);
            const searchResults = res?.data;
            if (!searchResults) {
                throw new Error("Song not found")
            };

            // setSongs(song);
             // Search results become queue
            setPlayQueue(searchResults);

            // Start from first result
            setCurrentSongIndex(0);

            return {
                success: res?.success,
                message: res?.message,
                searchResults
            };

        } catch (error) {
            setSongLoading(false)
            return {
                success: false,
                message: error?.response?.data?.message || error?.message || "Something went wrong"
            }
        } finally {
            setSongLoading(false)
        }
    };






    return {
        // uploadSongsHandler,
        getSongByMoodHandler,

        songs,
        songLoading,

        currentSong,
        currentSongIndex,

        playNext,
        playPrevious,
        selectSong,

        getAllSongsHandler,
        serachHandler,

         // Current queue
        playQueue,

    };
}