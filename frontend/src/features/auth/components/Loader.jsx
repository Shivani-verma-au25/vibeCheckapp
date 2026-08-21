import React from "react";
import { motion } from "framer-motion";
import { FiMusic } from "react-icons/fi";

const Loader = () => {
    return (
        <div className="flex min-h-[250px] w-full items-center justify-center">

            <div className="flex flex-col items-center">

                {/* Music Icon */}
                <div className="relative mb-5">

                    {/* Glow */}
                    <motion.div
                        animate={{
                            scale: [1, 1.3, 1],
                            opacity: [0.3, 0.6, 0.3],
                        }}
                        transition={{
                            duration: 1.8,
                            repeat: Infinity,
                            ease: "easeInOut",
                        }}
                        className="absolute inset-0 rounded-full bg-white/20 blur-xl"
                    />

                    {/* Icon */}
                    <div className="relative flex h-14 w-14 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.08]">
                        <FiMusic size={24} />
                    </div>

                </div>


                {/* Equalizer */}
                <div className="mb-4 flex h-6 items-end gap-1">

                    {[1, 2, 3, 4, 5].map((bar) => (

                        <motion.span
                            key={bar}
                            animate={{
                                height: ["8px", "22px", "12px", "18px", "8px"],
                            }}
                            transition={{
                                duration: 0.8,
                                repeat: Infinity,
                                delay: bar * 0.1,
                                ease: "easeInOut",
                            }}
                            className="w-1 rounded-full bg-white"
                        />

                    ))}

                </div>


                {/* Text */}
                <motion.p
                    animate={{ opacity: [0.4, 1, 0.4] }}
                    transition={{
                        duration: 1.5,
                        repeat: Infinity,
                    }}
                    className="text-sm font-medium tracking-wide text-gray-400"
                >
                    Loading your vibe...
                </motion.p>

            </div>

        </div>
    );
};

export default Loader;