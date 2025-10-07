// import React, { Children } from 'react'
// import Header from './components/Header'
// import Footer from './components/Footer'
import MainSection from './pages/MainSection'
import { createBrowserRouter, Outlet, RouterProvider } from 'react-router-dom'
import Aman from './components/Aman'
import About from './pages/About'
import Contact from './pages/Contact'
import {FoundNot} from "./pages/FoundNot"


const router = createBrowserRouter([
    {
        path: "/",
        element: <Aman />,

        children: [
            {
                index: true,
                element: <MainSection />
            },
            {
                path: "about",
                element: <About />
            },
            {
                path: "contact",
                element: <Contact />
            },
             {
                path: "*",
                element: <FoundNot />
            }
         

        ],
          

    }
])

export default function App() {
    return (
        <>
            <RouterProvider router={router} />

        </>
    )
}
