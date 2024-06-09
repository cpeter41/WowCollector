import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Outlet, createBrowserRouter, RouterProvider } from "react-router-dom";
import Navigation from "./components/Navigation";
import LandingPage from "./components/LandingPage";
import MainPage from "./components/MainPage";
import Achievements from "./components/Achievements";
import * as sessionActions from "./redux/session";
import { Modal } from "./context/Modal";
import { HelmetProvider, Helmet } from "react-helmet-async";

const helmetContext = {};

function Layout() {
    const dispatch = useDispatch();
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        dispatch(sessionActions.restoreUser()).then(() => {
            setIsLoaded(true);
        });
    }, [dispatch]);

    return (
        <>
            <Modal />
            <Navigation isLoaded={isLoaded} />
            {isLoaded && <Outlet />}
        </>
    );
}

const router = createBrowserRouter([
    {
        element: <Layout />,
        children: [
            {
                path: "/",
                element: <LandingPage />,
            },
            {
                path: "/achievements",
                element: <Achievements />,
            },
            // {
            //     path: "/achievements/:categoryId",
            //     element: <Achievements />,
            // },
            {
                path: "/mounts",
                element: <MainPage />,
            },
            {
                path: "*",
                element: <h1>Page Not Found</h1>,
            },
        ],
    },
]);

function App() {
    return (
        <HelmetProvider context={helmetContext}>
            <Helmet>
                {import.meta.env.MODE === "production" ? (
                    <title>WowCollector</title>
                ) : (
                    <title>Wowcollector (dev)</title>
                )}
            </Helmet>
            <RouterProvider router={router} />
        </HelmetProvider>
    );
}

export default App;
