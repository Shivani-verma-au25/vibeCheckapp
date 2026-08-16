import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    FiCamera,
    FiX,
    FiMusic,
} from "react-icons/fi";

import FaceExpression from "../../Expression/components/FaceExpression";
import Playlist from "../compoents/PlayList";
import { useSongs } from "../hooks/useSongs";
import RecommendedPlaylist from "../compoents/RecommendedSongs";
import PlayList from "../compoents/PlayList";

const Home = () => {

    const {
        getSongByMoodHandler,
        currentSong,
    } = useSongs();

    const [showScanner, setShowScanner] = useState(false);


    const handleMood = (expression) => {

        getSongByMoodHandler({
            mood: expression,
        });

        // optional:
        // close scanner after detecting mood

        setShowScanner(false);
    };


    return (

        <div className="mx-auto max-w-7xl px-5 py-8 sm:px-8 bg-gray-800 h-full">


            {/* ================= HERO ================= */}

            <motion.section
                initial={{
                    opacity: 0,
                    y: 20,
                }}
                animate={{
                    opacity: 1,
                    y: 0,
                }}
            >

                <p className="text-sm text-gray-500">
                    Good to see you 👋
                </p>

                <h1 className="mt-2 text-4xl font-black sm:text-5xl">
                    What are you
                    <span className="text-gray-500">
                        {" "}feeling today?
                    </span>
                </h1>

                <p className="mt-4 max-w-xl text-gray-500">
                    Let your mood decide what you listen to.
                    Scan your expression and discover music
                    that matches your vibe.
                </p>

            </motion.section>


            {/* ================= SCAN BUTTON ================= */}

            {!showScanner && (

                <motion.section
                    initial={{
                        opacity: 0,
                        y: 20,
                    }}
                    animate={{
                        opacity: 1,
                        y: 0,
                    }}
                    className="mt-10"
                >

                    <button
                        onClick={() => setShowScanner(true)}
                        className="group flex items-center gap-4 rounded-2xl border border-white/10 bg-white/[0.04] px-6 py-5 transition-all duration-300 hover:border-white/30 hover:bg-white/[0.08]"
                    >

                        <div className="flex h-12 w-12 items-center justify-center rounded-xl text-black transition group-hover:scale-110">
                            <FiCamera size={21} />
                        </div>

                        <div className="text-left">

                            <p className="font-semibold">
                                Scan my mood
                            </p>

                            <p className="mt-1 text-xs text-gray-500">
                                Use your expression to find music
                            </p>

                        </div>

                    </button>

                </motion.section>

            )}


            {/* ================= SCANNER ================= */}

            <AnimatePresence>
                {showScanner && (
                    <motion.section
                        initial={{
                            opacity: 0,
                            height: 0,
                            y: 20,
                        }}
                        animate={{
                            opacity: 1,
                            height: "auto",
                            y: 0,
                        }}
                        exit={{
                            opacity: 0,
                            height: 0,
                            y: 20,
                        }}
                        className="mt-10 w-full overflow-hidden rounded-3xl border border-white/10 bg-white/[0.03] p-4 sm:p-8"
                    >

                        {/* Scanner Header */}
                        <div className="mb-8 flex items-start justify-between">

                            <div>
                                <div className="flex items-center gap-2">
                                    <FiCamera />

                                    <span className="text-xs uppercase tracking-[0.2em] text-gray-500">
                                        Mood Scanner
                                    </span>
                                </div>

                                <h2 className="mt-3 text-2xl font-bold">
                                    Show us your vibe
                                </h2>

                                <p className="mt-2 text-sm text-gray-500">
                                    Look at the camera and let us detect
                                    your current mood.
                                </p>
                            </div>

                            <button
                                onClick={() => setShowScanner(false)}
                                className="rounded-full border border-white/10 p-2 text-gray-500 transition hover:bg-white hover:text-black"
                            >
                                <FiX />
                            </button>

                        </div>

                        {/* Scanner */}
                        <div className="flex w-full justify-center">
                            <div className="w-full flex justify-center">
                                <FaceExpression onClick={handleMood}  />
                            </div>
                        </div>

                    </motion.section>
                )}
            </AnimatePresence>


            {/* ================= PLAYLIST ================= */}

            <section className="mt-14">
                {/* music logo */}

                <div className="mb-6 flex items-center gap-3">

                    <FiMusic />

                    <h2 className="text-2xl font-bold">
                        Your music
                    </h2>

                </div>

                {/* <RecommendedPlaylist /> */}
                
                <PlayList/>
            </section>

        </div>

    );
};

export default Home;