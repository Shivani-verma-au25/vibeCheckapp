import { useContext } from "react";
import { songContext } from "../state/Song.context";
import { getAllSongs, getSongByMood, searchSong, uploadSongs } from "../services/song.api";

export const useSongs = () => {
    const { songLoading,
        songs,
        setSongLoading,
        setSongs,

        currentSongIndex,


        playQueue,
        setPlayQueue,

        setQueueType,

        currentSong,
        // setCurrentSong,
        setCurrentSongIndex 
        } = useContext(songContext);


    // song uploader handler
    const uploadSongsHandler = async (songs) =>{
        setSongLoading(true);
        try {
            const response = await uploadSongs(songs);
            // console.log("songs" , response);
            const uploadedSongs = response?.data;
            
            if(!response?.success){
                throw new Error("Song not uploaded")
            };

            setSongs(uploadedSongs);
            return {
                success : response?.success,
                message : response?.message,
                uploadSongs
            };

        } catch (error) {
            return {
                success: error.response?.data?.success,
                message:
                    error.response?.data?.message ||
                    error.message ||
                    "Something went wrong"
            };
        }finally{
            setSongLoading(false);
        }
    };



    //  song by mood handler
    const getSongByMoodHandler = async ({ mood }) => {
        setSongLoading(true);

        try {

            const response = await getSongByMood({ mood });

            const playlist = response?.data;

            if (!playlist) {
                throw new Error("No song found.");
            }

            // setRecommendedSongs
            // setRecommendedSongs(playlist)

            // IMPORTANT:
            // Mood songs become the current play queue
            setPlayQueue(playlist);

            // Tell UI this is the normal playlist
            setQueueType("all");

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


    // const selectSong = (index) => {

    //     if (
    //         index < 0 ||
    //         index >= playQueue?.length
    //     ) {
    //         return;
    //     }


    //     setCurrentSongIndex(index);
    // };

    // ----------------

    const selectSong = (song) => {
        if (!song) return;

        const queueIndex = playQueue.findIndex(
            (item) => item._id === song._id
        );

        if (queueIndex === -1) {
            // Song isn't currently in the queue.
            // Add the clicked song as the queue.
            setPlayQueue([song]);
            setCurrentSongIndex(0);
            return;
        }

        setCurrentSongIndex(queueIndex);
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

                // Tell UI this is the normal playlist
        setQueueType("all");

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

            // Tell UI this is a mood queue
        setQueueType("mood");

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

// show all songs
        const showAllSongs = () => {
            setPlayQueue(songs);
            setQueueType("all");
            setCurrentSongIndex(0);
        };





    return {
        uploadSongsHandler,
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
        showAllSongs

    };
}