import { useEffect } from "react";
import { useSongs } from "../hooks/useSongs";

const PlayList = () => {

    const {
        songs,
        currentSongIndex,
        selectSong,
        currentSong,
        getAllSongsHandler,
        playQueue,
        queueType,
        showAllSongs
    } = useSongs();


    // Only load all songs if we don't have them
    useEffect(() => {

        if (!songs?.length) {
            getAllSongsHandler();
        }

    }, []);


    // ==============================
    // Decide what to display
    // ==============================

    const displaySongs =
        queueType === "all"
            ? songs
            : playQueue;


    // ==============================
    // Heading
    // ==============================

    const getHeading = () => {

        if (queueType === "search") {
            return "Search results";
        }

        if (queueType === "mood") {
            return "Recommended for you";
        }

        return "All songs";
    };


    if (!displaySongs?.length) {

        return (
            <div className="p-5 text-center text-gray-400">
                No songs available
            </div>
        );

    }

   

    return (

        <div className="space-y-4">

            {/* Heading */}

            <div className="flex items-center justify-between px-2">

    <div>
        <h2 className="text-xl font-bold text-white">
            {queueType === "search"
                ? "Search results"
                : queueType === "mood"
                ? "Recommended for you"
                : "All songs"}
        </h2>

        <p className="mt-1 text-sm text-gray-500">
            {displaySongs.length} songs
        </p>
    </div>

    {queueType !== "all" && (
        <button
            onClick={showAllSongs}
            className="rounded-lg bg-white px-4 py-2 text-sm font-medium text-black transition hover:bg-gray-200 cursor-pointer"
        >
            All Songs
        </button>
    )}

</div>


            {/* Songs */}

            <div className="space-y-2 p-2 pb-30 md:pb-0">

                {displaySongs.map((sng, index) => (

                    <div
                        key={sng?._id}
                        onClick={() => selectSong(sng)}
                        className={`
                            flex cursor-pointer items-center gap-4
                            rounded-lg p-3 transition
                            ${
                                currentSong?._id === sng?._id
                                    ? "bg-white text-black"
                                    : "bg-white/5 text-white hover:bg-white/10"
                            }
                        `}
                    >

                        {/* Poster */}

                        <img
                            src={sng?.posterUrl}
                            alt={sng?.title}
                            className="h-12 w-12 shrink-0 rounded-md object-cover"
                        />


                        {/* Song information */}

                        <div className="min-w-0">

                            <h3 className="truncate font-medium">
                                {sng?.title}
                            </h3>

                            <p
                                className={`
                                    text-sm
                                    ${
                                        currentSong?._id === sng?._id
                                            ? "text-gray-700"
                                            : "text-gray-500"
                                    }
                                `}
                            >
                                {sng?.mood || "Mood not detected"}
                            </p>

                        </div>

                    </div>

                ))}

            </div>

        </div>
    );
};

export default PlayList;