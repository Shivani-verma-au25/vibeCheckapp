import { lazy, Suspense } from "react";
import { createBrowserRouter } from "react-router-dom";

const SignIn = lazy(() =>import("../features/auth/pages/Signin"));
import Signup from "../features/auth/pages/Signup";

import ProtectedRoute from "../features/auth/components/ProtectedRoute";

import DashboardLayout from "../features/home/layout/DashboardLayout";

const Home = lazy(() => import("../features/home/pages/Home"));
import PageNotFound from "../features/auth/components/PageNotFound";
import PlayList from "../features/home/compoents/PlayList";
const Profile = lazy(() =>import("../features/home/pages/Profile"));

const router = createBrowserRouter([
    // =========================
    // PUBLIC ROUTES
    // =========================

    {
        path: "/sign-in",
        element: <SignIn />
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
                        element: <PlayList />
                    },

                    {
                        path: "profile",
                        element: <Profile/>
                    }

                ]
            }

        ]
    },

    {
        path:'*',
        element:<PageNotFound/>
    }
]);

export default router;