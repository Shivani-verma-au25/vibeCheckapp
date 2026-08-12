import { createBrowserRouter } from "react-router-dom";

import Signin from "../features/auth/pages/Signin";
import Signup from "../features/auth/pages/Signup";

import ProtectedRoute from "../features/auth/components/ProtectedRoute";

import DashboardLayout from "../features/home/layout/DashboardLayout";

import Home from "../features/home/pages/Home";
import Playlist from "../features/home/compoents/PlayList";
import Profile from "../features/home/pages/Profile";

const router = createBrowserRouter([
    // =========================
    // PUBLIC ROUTES
    // =========================

    {
        path: "/sign-in",
        element: <Signin />
    },

    {
        path: "/sign-up",
        element: <Signup />
    },


    // =========================
    // PROTECTED ROUTES
    // =========================

    {
        element: <ProtectedRoute />,

        children: [

            {
                element: <DashboardLayout />,

                children: [

                    {
                        index: true,
                        element: <Home />
                    },

                    {
                        path: "playlist",
                        element: <Playlist />
                    },

                    {
                        path: "profile",
                        element: <Profile />
                    }

                ]
            }

        ]
    }
]);

export default router;