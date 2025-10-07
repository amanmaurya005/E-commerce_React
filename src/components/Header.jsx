import React, { useState } from 'react'
import { FaShoppingCart } from "react-icons/fa";
import { FiLogIn } from "react-icons/fi";

function Header() {

    const [cart, setCart] = useState([]);

    function cartAdd() {
        setCart([{}])
    }
    console.log(cart)

  return (
    <>
     <header className='flex items-center justify-between p-4 bg-amber-700 text-xl text-white w-full'>
                <div className="logo">Logo</div>
                <div className="leftside flex items-center justify-between w-1/2">
                <div className="menus w-2/3">
                    <ul className='flex items-center justify-around w-full'>
                        <li><a href="">Home</a></li>
                        <li><a href="">About</a></li>
                        <li><a href="">Contact</a></li>
                    </ul>
                </div>
                <div className="info w-1/6">
                    <ul className='flex items-center justify-around'>
                        <li onClick={cartAdd}><a href=""><FaShoppingCart /></a></li>
                        <li><a href=""><FiLogIn /></a></li>
                    </ul>
                </div>
                </div>
            </header>
    </>
  )
}

export default Header