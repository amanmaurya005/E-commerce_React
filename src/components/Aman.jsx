import React from 'react'
import MainSection from '../pages/MainSection'
import { Outlet } from 'react-router-dom'
import Header from './Header'
import Footer from './footer'

export default function Aman() {
    return (
        <>
            <Header />
            <Outlet />
            <Footer />
        </>
    )
}
