import React from 'react'
import { FaHeart } from "react-icons/fa";
// import { FaGithub } from "react-icons/fa";


export default function Footer() {
  return (
    <footer className=' p-4 bg-amber-700 text-xl text-center shadow-md text-white'>
        <p>&copy; 2025 | All Right Reserved</p>
        <p>Made with {<FaHeart className='inline-block' />} by <a href="https://github.com/amanmaurya005">Aman maurya</a></p>
    </footer>
  )
}
