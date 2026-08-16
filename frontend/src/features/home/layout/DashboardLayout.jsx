import React from "react";
import { Outlet, NavLink } from "react-router-dom";
import { FiHome, FiList, FiUser, FiMusic } from "react-icons/fi";
import { motion } from "framer-motion";
import { useSongs } from "../hooks/useSongs";
import Player from '../compoents/Player'

const DashboardLayout = () => {

    const { currentSong } = useSongs();

    const navItems = [
        {
            name: "Home",
            path: "/",
            icon: FiHome,
        },
        {
            name: "Playlist",
            path: "/playlist",
            icon: FiList,
        },
        {
            name: "Profile",
            path: "/profile",
            icon: FiUser,
        },
    ];

    return (
        <main className="min-h-screen bg-black text-white">

            {/* Background */}

            <div className="pointer-events-none fixed inset-0 overflow-hidden">

                <div className="absolute -left-40 -top-40 h-[500px] w-[500px] rounded-full bg-white/[0.03] blur-[120px]" />

                <div className="absolute right-[-200px] top-[30%] h-[500px] w-[500px] rounded-full bg-white/[0.03] blur-[150px]" />

            </div>


            {/* ================= SIDEBAR ================= */}

            <aside className="fixed left-0 top-0 z-40 hidden h-screen w-64 border-r border-white/10 bg-black/80 px-6 py-8 backdrop-blur-xl lg:block">

                {/* Logo */}

                <div className="mb-14 flex items-center gap-3">

                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white text-black">
                        <FiMusic size={20} />
                    </div>

                    <div>
                        <h1 className="font-bold">
                            VibeCheck
                        </h1>

                        <p className="text-xs text-gray-500">
                            Your mood. Your music.
                        </p>
                    </div>

                </div>


                {/* Navigation */}

                <nav className="space-y-2">

                    {navItems.map((item) => {

                        const Icon = item.icon;

                        return (
                            <NavLink
                                key={item.name}
                                to={item.path}
                                end={item.path === "/"}
                                className={({ isActive }) =>
                                    `flex items-center gap-4 rounded-xl px-4 py-3 text-sm transition ${isActive
                                        ? "bg-white text-black"
                                        : "text-gray-400 hover:bg-white/5 hover:text-white"
                                    }`
                                }
                            >

                                <Icon size={19} />

                                {item.name}

                            </NavLink>
                        );

                    })}

                </nav>

            </aside>


            {/* ================= MAIN ================= */}

            <div className="relative lg:ml-64">

                {/* Header */}

                <header className="sticky top-0 z-30 border-b border-white/10 bg-black/80 backdrop-blur-xl">

                    <div className="flex items-center justify-between px-5 py-4">

                        <div className="lg:hidden flex items-center gap-3">

                            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-white text-black">
                                <FiMusic />
                            </div>

                            <span className="font-bold">
                                VibeCheck
                            </span>

                        </div>


                        <input
                            type="text"
                            placeholder="Search songs, moods..."
                            className="hidden md:block w-full max-w-md rounded-xl border border-white/10 bg-white/[0.04] px-4 py-3 text-sm outline-none placeholder:text-gray-600 focus:border-white/30"
                        />


                        <div className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10">
                            <FiUser />
                        </div>

                    </div>

                </header>


                {/* ================================= */}
                {/* THIS IS THE IMPORTANT PART */}
                {/* ================================= */}

                <div className="pb-40 md:pb-32 pt-2xl">

                    <Outlet />

                </div>

            </div>


            {/* ================= MOBILE NAV ================= */}

            <nav className="fixed bottom-0 left-0 right-0 z-40 border-t border-white/10 bg-black/90 px-4 py-3 backdrop-blur-xl lg:hidden">

                <div className="mx-auto flex max-w-md justify-around">

                    {navItems.map((item) => {

                        const Icon = item.icon;

                        return (
                            <NavLink
                                key={item.name}
                                to={item.path}
                                end={item.path === "/"}
                                className={({ isActive }) =>
                                    `flex flex-col items-center gap-1 rounded-xl px-5 py-2 text-xs ${isActive
                                        ? "bg-white text-black"
                                        : "text-gray-500"
                                    }`
                                }
                            >

                                <Icon size={18} />

                                {item.name}

                            </NavLink>

                        );

                    })}

                </div>

            </nav>


            {/* Player stays alive */}

            {currentSong && (
                <motion.div
                    initial={{ y: 100 }}
                    animate={{ y: 0 }}
                    className="fixed bottom-0 left-0 right-0 z-50 lg:left-64"
                >
                    {/* Your Player component */}
                </motion.div>
            )}

        {/* player */}
                    <Player />
             

        </main>
    );
};

export default DashboardLayout;