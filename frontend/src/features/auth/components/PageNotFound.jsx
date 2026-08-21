import React from "react";
import { motion } from "framer-motion";
import { FiMusic, FiHome, FiArrowLeft } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

const PageNotFound = () => {

    const navigate = useNavigate();

    return (
        <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-black px-5 text-white">

            {/* Background glow */}
            <div className="pointer-events-none absolute -left-40 -top-40 h-[400px] w-[400px] rounded-full bg-white/[0.04] blur-[120px]" />

            <div className="pointer-events-none absolute -bottom-40 -right-40 h-[400px] w-[400px] rounded-full bg-white/[0.04] blur-[120px]" />


            {/* Content */}
            <motion.div
                initial={{ opacity: 0, y: 25 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="relative w-full max-w-lg text-center"
            >

                {/* Music icon */}
                <motion.div
                    animate={{
                        y: [0, -8, 0],
                        rotate: [0, 4, -4, 0],
                    }}
                    transition={{
                        duration: 3,
                        repeat: Infinity,
                        ease: "easeInOut",
                    }}
                    className="mx-auto flex h-20 w-20 items-center justify-center rounded-3xl border border-white/10 bg-white/[0.05]"
                >
                    <FiMusic size={34} />
                </motion.div>


                {/* 404 */}
                <motion.h1
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{
                        delay: 0.15,
                        duration: 0.4,
                    }}
                    className="mt-8 text-8xl font-black tracking-tighter sm:text-9xl"
                >
                    404
                </motion.h1>


                {/* Title */}
                <h2 className="mt-4 text-2xl font-bold sm:text-3xl">
                    Looks like you're off beat.
                </h2>


                {/* Description */}
                <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-gray-500 sm:text-base">
                    The page you're looking for doesn't exist or
                    may have been moved somewhere else.
                </p>


                {/* Buttons */}
                <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">

                    {/* Home */}
                    <motion.button
                        whileHover={{ scale: 1.03 }}
                        whileTap={{ scale: 0.97 }}
                        onClick={() => navigate("/")}
                        className="flex items-center justify-center gap-2 rounded-xl bg-white px-6 py-3 text-sm font-semibold text-black transition hover:bg-gray-200"
                    >
                        <FiHome size={17} />
                        Back to Home
                    </motion.button>


                    {/* Back */}
                    <motion.button
                        whileHover={{ scale: 1.03 }}
                        whileTap={{ scale: 0.97 }}
                        onClick={() => navigate(-1)}
                        className="flex items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/[0.04] px-6 py-3 text-sm font-medium text-white transition hover:bg-white/[0.08]"
                    >
                        <FiArrowLeft size={17} />
                        Go Back
                    </motion.button>

                </div>


                {/* Footer */}
                <p className="mt-10 text-xs text-gray-600">
                    VibeCheck • Your mood. Your music. 🎵
                </p>

            </motion.div>

        </div>
    );
};

export default PageNotFound;