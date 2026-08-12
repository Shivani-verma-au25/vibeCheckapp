// import React from 'react'
// import FaceExpression from '../../Expression/components/FaceExpression'
// import Player from '../compoents/Player'
// import { useSongs } from '../hooks/useSongs';
// import Playlist from '../compoents/PlayList';
// import {NavLink} from 'react-router-dom'
// const Home = () => {
//     const {getSongByMoodHandler ,currentSong } = useSongs();

//   return (
//      <main className="min-h-screen bg-black">
//         {/* header */}

//         <header className='w-full h-32 bg-yellow p-4' >
//             <input text='serach' placeholder='Serach songs....' />

//             {/* profile pic */}
//             <div>
//                 <img src="" alt="" />
//             </div>
//         </header>

//         {/* side bar */}
//         <aside className='w-56 h-full bg-red-400 flex justify-center items-center gap-5 flex-col'>
//             <NavLink>Home</NavLink>
//             <NavLink>play List</NavLink>
//             <NavLink>Profile</NavLink>

//             <div>
//                 <button>Scan mood</button>
//             </div>
//         </aside>

//             <FaceExpression
//                 onClick={(expression) =>
//                     getSongByMoodHandler({
//                         mood: expression
//                     })
//                 }
//             />

//             <div className="mx-auto grid max-w-6xl gap-8 p-6 lg:grid-cols-[1fr_350px]">

//                 <div>
//                     {/* Player */}
//                     {currentSong && <Player />}
//                 </div>
//             </div>

//         </main>
//   )
// }

// export default Home

// -------------------------------------------------

// import React from "react";
// import { motion } from "framer-motion";
// import {
//   FiHome,
//   FiList,
//   FiUser,
//   FiSearch,
//   FiCamera,
//   FiMusic,
//   FiChevronRight,
// } from "react-icons/fi";
// import { NavLink } from "react-router-dom";

// import FaceExpression from "../../Expression/components/FaceExpression";
// import Player from "../compoents/Player";
// import Playlist from "../compoents/PlayList";
// import { useSongs } from "../hooks/useSongs";

// const Home = () => {
//   const { getSongByMoodHandler, currentSong } = useSongs();

//   const handleMood = (expression) => {
//     getSongByMoodHandler({
//       mood: expression,
//     });
//   };

//   const navItems = [
//     {
//       name: "Home",
//       icon: FiHome,
//       path: "/",
//     },
//     {
//       name: "Playlist",
//       icon: FiList,
//       path: "/playlist",
//     },
//     {
//       name: "Profile",
//       icon: FiUser,
//       path: "/profile",
//     },
//   ];

//   return (
//     <main className="min-h-screen bg-black text-white">

//       {/* ================================================= */}
//       {/* BACKGROUND */}
//       {/* ================================================= */}

//       <div className="pointer-events-none fixed inset-0 overflow-hidden">

//         <div className="absolute -left-40 -top-40 h-[500px] w-[500px] rounded-full bg-white/[0.03] blur-[120px]" />

//         <div className="absolute right-[-200px] top-[30%] h-[500px] w-[500px] rounded-full bg-white/[0.03] blur-[150px]" />

//         <div className="absolute bottom-[-200px] left-[30%] h-[500px] w-[500px] rounded-full bg-white/[0.02] blur-[150px]" />

//       </div>


//       {/* ================================================= */}
//       {/* DESKTOP SIDEBAR */}
//       {/* ================================================= */}

//       <aside className="fixed left-0 top-0 z-40 hidden h-screen w-64 border-r border-white/10 bg-black/70 px-6 py-8 backdrop-blur-xl lg:block">

//         {/* Logo */}

//         <motion.div
//           initial={{ opacity: 0, x: -20 }}
//           animate={{ opacity: 1, x: 0 }}
//           className="mb-14 flex items-center gap-3"
//         >

//           <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white text-black">
//             <FiMusic size={20} />
//           </div>

//           <div>
//             <h1 className="text-lg font-bold">
//               VibeCheck
//             </h1>

//             <p className="text-xs text-gray-500">
//               Your mood. Your music.
//             </p>
//           </div>

//         </motion.div>


//         {/* Navigation */}

//         <nav className="space-y-2">

//           {navItems.map((item, index) => {

//             const Icon = item.icon;

//             return (
//               <motion.div
//                 key={item.name}
//                 initial={{ opacity: 0, x: -15 }}
//                 animate={{ opacity: 1, x: 0 }}
//                 transition={{
//                   delay: index * 0.08,
//                 }}
//               >

//                 <NavLink
//                   to={item.path}
//                   className={({ isActive }) =>
//                     `group flex items-center gap-4 rounded-xl px-4 py-3 text-sm transition-all duration-300 ${
//                       isActive
//                         ? "bg-white text-black"
//                         : "text-gray-400 hover:bg-white/5 hover:text-white"
//                     }`
//                   }
//                 >

//                   <Icon size={19} />

//                   <span>
//                     {item.name}
//                   </span>

//                 </NavLink>

//               </motion.div>
//             );
//           })}

//         </nav>


//         {/* Mood Scanner Card */}

//         <motion.div
//           initial={{ opacity: 0, y: 20 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ delay: 0.4 }}
//           className="absolute bottom-8 left-6 right-6 rounded-2xl border border-white/10 bg-white/[0.04] p-5"
//         >

//           <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl bg-white text-black">
//             <FiCamera />
//           </div>

//           <h3 className="mb-1 text-sm font-semibold">
//             Discover your vibe
//           </h3>

//           <p className="mb-4 text-xs leading-relaxed text-gray-500">
//             Let us read your mood and create the perfect playlist.
//           </p>

//           <button
//             onClick={() => {
//               document
//                 .getElementById("mood-scanner")
//                 ?.scrollIntoView({
//                   behavior: "smooth",
//                 });
//             }}
//             className="flex w-full items-center justify-center gap-2 rounded-lg bg-white py-2.5 text-xs font-semibold text-black transition hover:bg-gray-200"
//           >
//             Scan Mood
//             <FiChevronRight />
//           </button>

//         </motion.div>

//       </aside>


//       {/* ================================================= */}
//       {/* MAIN CONTENT */}
//       {/* ================================================= */}

//       <div className="relative lg:ml-64">


//         {/* ================================================= */}
//         {/* HEADER */}
//         {/* ================================================= */}

//         <header className="sticky top-0 z-30 border-b border-white/10 bg-black/70 backdrop-blur-xl">

//           <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-5 py-4 sm:px-8">

//             {/* Mobile Logo */}

//             <div className="flex items-center gap-3 lg:hidden">

//               <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-white text-black">
//                 <FiMusic size={18} />
//               </div>

//               <span className="font-bold">
//                 VibeCheck
//               </span>

//             </div>


//             {/* Search */}

//             <div className="relative hidden max-w-md flex-1 md:block">

//               <FiSearch
//                 className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500"
//                 size={18}
//               />

//               <input
//                 type="text"
//                 placeholder="Search songs, moods..."
//                 className="w-full rounded-xl border border-white/10 bg-white/[0.04] py-3 pl-11 pr-4 text-sm text-white outline-none transition placeholder:text-gray-600 focus:border-white/30 focus:bg-white/[0.06]"
//               />

//             </div>


//             {/* Profile */}

//             <motion.button
//               whileHover={{ scale: 1.05 }}
//               whileTap={{ scale: 0.95 }}
//               className="flex h-10 w-10 items-center justify-center overflow-hidden rounded-full border border-white/20 bg-white/10"
//             >

//               <FiUser size={18} />

//             </motion.button>

//           </div>

//         </header>


//         {/* ================================================= */}
//         {/* CONTENT */}
//         {/* ================================================= */}

//         <div className="mx-auto max-w-7xl px-5 pb-36 pt-8 sm:px-8">


//           {/* ================================================= */}
//           {/* HERO */}
//           {/* ================================================= */}

//           <motion.section
//             initial={{
//               opacity: 0,
//               y: 25,
//             }}
//             animate={{
//               opacity: 1,
//               y: 0,
//             }}
//             transition={{
//               duration: 0.6,
//             }}
//             className="mb-10"
//           >

//             <p className="mb-2 text-sm text-gray-500">
//               Good to see you 👋
//             </p>

//             <h1 className="max-w-2xl text-4xl font-black tracking-tight sm:text-5xl lg:text-6xl">

//               What are you
//               <span className="text-gray-500">
//                 {" "}feeling today?
//               </span>

//             </h1>

//             <p className="mt-4 max-w-xl text-sm leading-relaxed text-gray-500 sm:text-base">
//               Tell us your mood and we'll find music that
//               matches your vibe.
//             </p>

//           </motion.section>


//           {/* ================================================= */}
//           {/* MOOD SCANNER */}
//           {/* ================================================= */}

//           <motion.section
//             id="mood-scanner"
//             initial={{
//               opacity: 0,
//               y: 30,
//             }}
//             animate={{
//               opacity: 1,
//               y: 0,
//             }}
//             transition={{
//               delay: 0.2,
//               duration: 0.6,
//             }}
//             className="relative mb-12 overflow-hidden rounded-3xl border border-white/10 bg-white/[0.03] p-6 sm:p-8 lg:p-10"
//           >

//             {/* Glow */}

//             <div className="pointer-events-none absolute -right-20 -top-20 h-60 w-60 rounded-full bg-white/[0.04] blur-[80px]" />

//             <div className="relative">

//               <div className="mb-8 flex items-center justify-between">

//                 <div>

//                   <div className="mb-2 flex items-center gap-2">

//                     <FiCamera
//                       className="text-gray-400"
//                       size={18}
//                     />

//                     <span className="text-xs font-semibold uppercase tracking-[0.2em] text-gray-500">
//                       Mood Scanner
//                     </span>

//                   </div>

//                   <h2 className="text-2xl font-bold sm:text-3xl">
//                     Read your vibe
//                   </h2>

//                   <p className="mt-2 text-sm text-gray-500">
//                     Show us your expression and discover
//                     your next song.
//                   </p>

//                 </div>

//               </div>


//               {/* Face Expression */}

//               <div className="flex justify-center">

//                 <FaceExpression
//                   onClick={handleMood}
//                 />

//               </div>

//             </div>

//           </motion.section>


//           {/* ================================================= */}
//           {/* MUSIC SECTION */}
//           {/* ================================================= */}

//           <section>

//             <div className="mb-6 flex items-end justify-between">

//               <div>

//                 <p className="mb-1 text-xs uppercase tracking-[0.2em] text-gray-600">
//                   Your music
//                 </p>

//                 <h2 className="text-2xl font-bold">
//                   Your playlist
//                 </h2>

//               </div>

//               <NavLink
//                 to="/playlist"
//                 className="hidden text-sm text-gray-500 transition hover:text-white sm:block"
//               >
//                 View all →
//               </NavLink>

//             </div>


//             <div className="grid gap-8 xl:grid-cols-[1fr_360px]">

//               {/* Playlist */}

//               <motion.div
//                 initial={{
//                   opacity: 0,
//                   y: 20,
//                 }}
//                 animate={{
//                   opacity: 1,
//                   y: 0,
//                 }}
//                 transition={{
//                   delay: 0.3,
//                 }}
//                 className="min-w-0"
//               >

//                 <Playlist />

//               </motion.div>


//               {/* Current Song */}

//               <motion.div
//                 initial={{
//                   opacity: 0,
//                   x: 20,
//                 }}
//                 animate={{
//                   opacity: 1,
//                   x: 0,
//                 }}
//                 transition={{
//                   delay: 0.4,
//                 }}
//                 className="hidden xl:block"
//               >

//                 {currentSong ? (

//                   <div className="sticky top-24 rounded-3xl border border-white/10 bg-white/[0.03] p-5">

//                     <div className="mb-5 flex items-center justify-between">

//                       <span className="text-xs uppercase tracking-widest text-gray-600">
//                         Now playing
//                       </span>

//                       <div className="flex gap-1">

//                         <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-white" />

//                         <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-white [animation-delay:200ms]" />

//                         <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-white [animation-delay:400ms]" />

//                       </div>

//                     </div>


//                     <img
//                       src={currentSong.posterUrl}
//                       alt={currentSong.title}
//                       className="aspect-square w-full rounded-2xl object-cover"
//                     />


//                     <div className="mt-5">

//                       <h3 className="line-clamp-2 text-lg font-bold">
//                         {currentSong.title}
//                       </h3>

//                       <p className="mt-1 text-sm capitalize text-gray-500">
//                         {currentSong.mood} mood
//                       </p>

//                     </div>

//                   </div>

//                 ) : (

//                   <div className="flex min-h-[300px] items-center justify-center rounded-3xl border border-dashed border-white/10 text-center">

//                     <div>

//                       <FiMusic
//                         className="mx-auto mb-4 text-gray-700"
//                         size={35}
//                       />

//                       <p className="text-sm text-gray-600">
//                         Choose a mood to start listening
//                       </p>

//                     </div>

//                   </div>

//                 )}

//               </motion.div>

//             </div>

//           </section>

//         </div>

//       </div>


//       {/* ================================================= */}
//       {/* PLAYER */}
//       {/* ================================================= */}

//       {currentSong && (

//         <motion.div
//           initial={{
//             y: 100,
//             opacity: 0,
//           }}
//           animate={{
//             y: 0,
//             opacity: 1,
//           }}
//           transition={{
//             type: "spring",
//             stiffness: 100,
//             damping: 20,
//           }}
//           className="fixed bottom-0 left-0 right-0 z-50 border-t border-white/10 bg-black/90 backdrop-blur-2xl lg:left-64"
//         >

//           <Player />

//         </motion.div>

//       )}


//       {/* ================================================= */}
//       {/* MOBILE NAVIGATION */}
//       {/* ================================================= */}

//       <nav className="fixed bottom-0 left-0 right-0 z-40 border-t border-white/10 bg-black/90 px-4 py-3 backdrop-blur-xl lg:hidden">

//         <div className="mx-auto flex max-w-md items-center justify-around">

//           {navItems.map((item) => {

//             const Icon = item.icon;

//             return (
//               <NavLink
//                 key={item.name}
//                 to={item.path}
//                 className={({ isActive }) =>
//                   `flex flex-col items-center gap-1 rounded-xl px-5 py-2 text-xs transition ${
//                     isActive
//                       ? "bg-white text-black"
//                       : "text-gray-500"
//                   }`
//                 }
//               >

//                 <Icon size={18} />

//                 <span>
//                   {item.name}
//                 </span>

//               </NavLink>
//             );

//           })}

//         </div>

//       </nav>

//     </main>
//   );
// };

// export default Home;


// -3---------------------------------------

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
                        className="mt-10 overflow-hidden rounded-3xl border border-white/10 bg-white/[0.03] p-6 sm:p-10"
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


                            {/* Close */}

                            <button
                                onClick={() => setShowScanner(false)}
                                className="rounded-full border border-white/10 p-2 text-gray-500 transition hover:bg-white hover:text-black"
                            >

                                <FiX />

                            </button>

                        </div>


                        {/* Scanner */}

                        <div className="flex justify-center">

                            <FaceExpression
                                onClick={handleMood}
                            />

                        </div>

                    </motion.section>

                )}

            </AnimatePresence>


            {/* ================= PLAYLIST ================= */}

            <section className="mt-14">

                <div className="mb-6 flex items-center gap-3">

                    <FiMusic />

                    <h2 className="text-2xl font-bold">
                        Your music
                    </h2>

                </div>

                <Playlist />

            </section>

        </div>

    );
};

export default Home;