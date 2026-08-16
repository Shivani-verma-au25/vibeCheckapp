import { useEffect, useState } from "react";
import { useSongs } from "../hooks/useSongs";

const RecommendedSongs = () => {

    const {
        selectSong,
        playQueue,
        currentSongIndex
    } = useSongs();


    if (!playQueue || playQueue?.length === 0) {
        return null;
    };


    return (
        <div className="space-y-2 p-2 pb-30 md:pb-0">

            {/* playqueue songs  */}

            {playQueue?.map((song, index) => (

                <div
                    key={song?._id}
                    onClick={() => selectSong(index)}
                    // onClick={() => setCurrentSong(song)}
                    className={`
                        flex items-center gap-4 p-3 rounded-lg cursor-pointer
                        ${
                            currentSongIndex === index
                            // currentSong === index
                                ? "bg-white text-black"
                                : "bg-white/5 text-white"
                        }
                    `}
                >

                    <img
                        src={song?.posterUrl}
                        alt={song?.title}
                        className="w-12 h-12 rounded-md object-cover"
                    />

                    <div>
                        <h3>{song?.title}</h3>
                        <p>{song?.mood || 'There is no mood'} </p>
                    </div>

                </div>

            ))}

        </div>
    );
};

export default RecommendedSongs;