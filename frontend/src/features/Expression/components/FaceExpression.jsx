// import { useEffect, useRef, useState } from "react";
// import { detect, init,stopCamera } from "../utils/utils";
// import { FiCamera, FiRefreshCw } from "react-icons/fi";
// import { motion } from "framer-motion";

// export default function FaceExpression({ onClick = () => {} , onClose = () => {} }) {
//     const videoRef = useRef(null);
//     const landmarkerRef = useRef(null);
//     const streamRef = useRef(null);

//     const [expression, setExpression] = useState("Detecting...");
//     const [isDetecting, setIsDetecting] = useState(false);

//     useEffect(() => {
//         init({
//             landmarkerRef,
//             videoRef,
//             streamRef,
//         });

//         return () => {
//         stopCamera({
//             videoRef,
//             streamRef,
//             landmarkerRef
//         });
//     };

//         // return () => {
//         //     if (landmarkerRef.current) {
//         //         landmarkerRef.current.close();
//         //     }

//         //     if (videoRef.current?.srcObject) {
//         //         videoRef.current.srcObject
//         //             .getTracks()
//         //             .forEach((track) => track.stop());
//         //     }
//         // };
//     }, []);

//     async function handleClick() {
//         setIsDetecting(true);

//         try {
//             const detectedExpression = await detect({
//                 landmarkerRef,
//                 videoRef,
//                 setExpression,
//             });

//             onClick(detectedExpression);
//         } finally {
//             setIsDetecting(false);
//         }
//     }

//     // stop camera
//     const handleStopCamera = () => {
//     stopCamera({
//         videoRef,
//         streamRef,
//         landmarkerRef
//     });

//     setIsDetecting(false);
//     onClose();
// };

//     return (
//         <section className="w-full px-4 py-6 sm:px-6 lg:px-8">

//             <div className="mx-auto w-full max-w-2xl">

//                 {/* ================= HEADER ================= */}

//                 <div className="mb-6 text-center">

//                     <motion.div
//                         initial={{ opacity: 0, y: -10 }}
//                         animate={{ opacity: 1, y: 0 }}
//                         className="mb-3 flex items-center justify-center gap-2"
//                     >
//                         <div className="flex h-9 w-9 items-center justify-center rounded-full bg-white text-black">
//                             <FiCamera size={18} />
//                         </div>

//                         <span className="text-sm font-medium text-gray-400">
//                             Mood Scanner
//                         </span>
//                     </motion.div>

//                     <h2 className="text-2xl font-bold tracking-tight text-white sm:text-3xl">
//                         How are you feeling?
//                     </h2>

//                     <p className="mx-auto mt-2 max-w-md text-sm leading-relaxed text-gray-500">
//                         Let your camera detect your expression and we'll
//                         find music that matches your mood.
//                     </p>

//                 </div>


//                 {/* ================= CAMERA CARD ================= */}

//                 <motion.div
//                     initial={{ opacity: 0, scale: 0.97 }}
//                     animate={{ opacity: 1, scale: 1 }}
//                     transition={{ duration: 0.3 }}
//                     className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/[0.04] p-3 shadow-2xl sm:p-4"
//                 >

//                     {/* Glow */}

//                     <div className="pointer-events-none absolute -left-20 -top-20 h-40 w-40 rounded-full bg-white/[0.05] blur-3xl" />

//                     <div className="pointer-events-none absolute -bottom-20 -right-20 h-40 w-40 rounded-full bg-white/[0.05] blur-3xl" />


//                     {/* Camera */}

//                     <div className="relative overflow-hidden rounded-2xl bg-black">

//                         <video
//                             ref={videoRef}
//                             playsInline
//                             className="aspect-video h-auto w-full object-cover"
//                         />

//                         {/* Camera status */}

//                         <div className="absolute left-3 top-3 flex items-center gap-2 rounded-full border border-white/10 bg-black/60 px-3 py-1.5 text-xs text-white backdrop-blur-md">

//                             <span className="relative flex h-2 w-2">

//                                 <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75" />

//                                 <span className="relative inline-flex h-2 w-2 rounded-full bg-green-500" />

//                             </span>

//                             Camera active

//                         </div>


//                         {/* Scanner animation */}

//                         {isDetecting && (
//                             <motion.div
//                                 initial={{ top: "0%" }}
//                                 animate={{ top: "100%" }}
//                                 transition={{
//                                     duration: 1.2,
//                                     repeat: Infinity,
//                                     ease: "linear",
//                                 }}
//                                 className="absolute left-0 h-0.5 w-full bg-white/80 shadow-[0_0_15px_rgba(255,255,255,0.8)]"
//                             />
//                         )}

//                     </div>


//                     {/* ================= RESULT ================= */}

//                     <div className="mt-4 rounded-2xl border border-white/10 bg-black/40 p-2 text-center">

//                         <p className="mb-1 text-xs uppercase tracking-[0.2em] text-gray-500">
//                             Detected Mood
//                         </p>

//                         <motion.h3
//                             key={expression}
//                             initial={{ opacity: 0, y: 5 }}
//                             animate={{ opacity: 1, y: 0 }}
//                             className="text-xl font-semibold capitalize text-white sm:text-2xl"
//                         >
//                             {expression}
//                         </motion.h3>

//                     </div>


//                     {/* ================= BUTTON ================= */}

//                     <motion.button
//                         whileTap={{ scale: 0.97 }}
//                         whileHover={{ scale: 1.01 }}
//                         onClick={handleClick}
//                         disabled={isDetecting}
//                         className="mt-4 flex w-full items-center justify-center gap-2 rounded-2xl bg-white px-5 py-3.5 text-sm font-semibold text-black transition hover:bg-gray-200 disabled:cursor-not-allowed disabled:opacity-60 sm:py-4"
//                     >

//                         {isDetecting ? (
//                             <>
//                                 <FiRefreshCw
//                                     size={17}
//                                     className="animate-spin"
//                                 />

//                                 Scanning your mood...
//                             </>
//                         ) : (
//                             <>
//                                 <FiCamera size={18} />

//                                 Detect My Mood
//                             </>
//                         )}

//                     </motion.button>
//                     <button
//     onClick={handleStopCamera}
//     className="mt-3 w-full rounded-2xl border border-white/10 bg-white/5 px-5 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
// >
//     Cancel Detection
// </button>
//                 </motion.div>


//                 {/* ================= FOOTER TEXT ================= */}

//                 <p className="mt-4 text-center text-xs text-gray-600">
//                     Your camera is only used to detect your expression.
//                 </p>

//             </div>

//         </section>
//     );
// }


// -------------------------

import { useEffect, useRef, useState } from "react";
import {
    detect,
    init,
    stopCamera
} from "../utils/utils";

import {
    FiCamera,
    FiRefreshCw
} from "react-icons/fi";

import { motion } from "framer-motion";


export default function FaceExpression({
    onClick = () => {}
}) {

    const videoRef = useRef(null);
    const landmarkerRef = useRef(null);
    const streamRef = useRef(null);

    const [expression, setExpression] =
        useState("Ready to scan");

    const [isDetecting, setIsDetecting] =
        useState(false);


    // ==============================
    // START CAMERA
    // ==============================

    useEffect(() => {

        let mounted = true;

        const startCamera = async () => {

            if (!mounted) return;

            await init({
                landmarkerRef,
                videoRef,
                streamRef
            });

        };

        startCamera();


        // ==============================
        // CLEANUP
        // ==============================

        return () => {

            mounted = false;

            stopCamera({
                videoRef,
                streamRef,
                landmarkerRef
            });

        };

    }, []);


    // ==============================
    // DETECT MOOD
    // ==============================

    const handleClick = () => {

        if (isDetecting) return;

        setIsDetecting(true);

        try {

            const detectedExpression = detect({
                landmarkerRef,
                videoRef,
                setExpression
            });

            if (detectedExpression) {

                onClick(detectedExpression);

            }

        } catch (error) {

            console.error(
                "Expression detection failed:",
                error
            );

        } finally {

            setIsDetecting(false);

        }
    };


    return (

        <section className="w-full px-4 py-6 sm:px-6">

            <div className="mx-auto w-full max-w-2xl">

                {/* HEADER */}

                <div className="mb-6 text-center">

                    <motion.div
                        initial={{
                            opacity: 0,
                            y: -10
                        }}
                        animate={{
                            opacity: 1,
                            y: 0
                        }}
                        className="mb-3 flex items-center justify-center gap-2"
                    >

                        <div className="flex h-9 w-9 items-center justify-center rounded-full bg-white text-black">

                            <FiCamera size={18} />

                        </div>

                        <span className="text-sm font-medium text-gray-400">
                            Mood Scanner
                        </span>

                    </motion.div>


                    <h2 className="text-2xl font-bold text-white sm:text-3xl">
                        How are you feeling?
                    </h2>

                    <p className="mx-auto mt-2 max-w-md text-sm text-gray-500">
                        Look at the camera and we'll detect
                        your expression.
                    </p>

                </div>


                {/* CAMERA */}

                <motion.div
                    initial={{
                        opacity: 0,
                        scale: 0.97
                    }}
                    animate={{
                        opacity: 1,
                        scale: 1
                    }}
                    className="overflow-hidden rounded-3xl border border-white/10 bg-white/[0.04] p-3 shadow-2xl"
                >

                    <div className="relative overflow-hidden rounded-2xl bg-black">

                        <video
                            ref={videoRef}
                            playsInline
                            muted
                            autoPlay
                            className="aspect-video w-full object-cover"
                        />


                        {/* CAMERA STATUS */}

                        <div className="absolute left-3 top-3 flex items-center gap-2 rounded-full border border-white/10 bg-black/60 px-3 py-1.5 text-xs text-white backdrop-blur-md">

                            <span className="relative flex h-2 w-2">

                                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75" />

                                <span className="relative inline-flex h-2 w-2 rounded-full bg-green-500" />

                            </span>

                            Camera active

                        </div>


                        {/* SCAN ANIMATION */}

                        {isDetecting && (

                            <motion.div
                                initial={{
                                    top: "0%"
                                }}
                                animate={{
                                    top: "100%"
                                }}
                                transition={{
                                    duration: 1.2,
                                    repeat: Infinity,
                                    ease: "linear"
                                }}
                                className="absolute left-0 h-0.5 w-full bg-white"
                            />

                        )}

                    </div>


                    {/* RESULT */}

                    <div className="mt-4 rounded-2xl border border-white/10 bg-black/40 p-4 text-center">

                        <p className="mb-1 text-xs uppercase tracking-[0.2em] text-gray-500">
                            Detected Mood
                        </p>

                        <motion.h3
                            key={expression}
                            initial={{
                                opacity: 0,
                                y: 5
                            }}
                            animate={{
                                opacity: 1,
                                y: 0
                            }}
                            className="text-xl font-semibold capitalize text-white"
                        >
                            {expression}
                        </motion.h3>

                    </div>


                    {/* BUTTON */}

                    <motion.button
                        whileTap={{
                            scale: 0.97
                        }}
                        onClick={handleClick}
                        disabled={isDetecting}
                        className="mt-4 flex w-full items-center justify-center gap-2 rounded-2xl bg-white px-5 py-4 text-sm font-semibold text-black transition hover:bg-gray-200 disabled:cursor-not-allowed disabled:opacity-60"
                    >

                        {isDetecting ? (

                            <>
                                <FiRefreshCw
                                    size={17}
                                    className="animate-spin"
                                />

                                Scanning...
                            </>

                        ) : (

                            <>
                                <FiCamera size={18} />

                                Detect My Mood
                            </>

                        )}

                    </motion.button>

                </motion.div>


                <p className="mt-4 text-center text-xs text-gray-600">
                    Your camera is only used to detect your expression.
                </p>

            </div>

        </section>
    );
}