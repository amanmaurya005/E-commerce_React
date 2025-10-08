import React, { useState } from 'react'
import { FaShoppingCart } from "react-icons/fa";
import { FiLogIn } from "react-icons/fi";
import { NavLink } from "react-router-dom";

function Header() {

    const [cart, setCart] = useState([]);
    const [currency, setCurrency] = useState(localStorage.getItem("currency") || "inr"); // added

    function cartAdd() {
        setCart([{}])
    }

    //  handle currency selection
    function handleCurrencyChange(e) {
        const selected = e.target.value;
        setCurrency(selected);
        localStorage.setItem("currency", selected); // store globally
        window.dispatchEvent(new Event("currencyChange")); // notify all components
    }

    console.log(cart);

    return (
        <>
            <header className='flex items-center justify-between p-4 bg-amber-600 text-xl text-white w-full'>
                <div className="logo">Logo</div>

                <div className="leftside flex items-center justify-between w-1/2">
                    <div className="menus w-2/3">
                        <ul className='flex items-center justify-around w-full'>

                             {/*  currency selector  */}
                            <select
                                className='outline-none border rounded text-black px-2 py-1'
                                name="Select"
                                id=""
                                value={currency}
                                onChange={handleCurrencyChange} // added
                            >
                                <option className='text-black' value="inr">INR</option>
                                <option className='text-black' value="usd">USD</option>
                            </select>

                            <li>
                                <NavLink
                                    to="/"
                                    className={({ isActive }) =>
                                        isActive
                                            ? "text-amber-500 font-semibold border-b-2 border-amber-600 pb-1"
                                            : "text-white hover:text-amber-500 transition"
                                    }
                                >
                                    Home
                                </NavLink>
                            </li>

                            <li>
                                <NavLink
                                    to="/about"
                                    className={({ isActive }) =>
                                        isActive
                                            ? "text-amber-500 font-semibold border-b-2 border-amber-600 pb-1"
                                            : "text-white hover:text-amber-500 transition"
                                    }
                                >
                                    About
                                </NavLink>
                            </li>

                            <li>
                                <NavLink
                                    to="/contact"
                                    className={({ isActive }) =>
                                        isActive
                                            ? "text-amber-500 font-semibold border-b-2 border-amber-600 pb-1"
                                            : "text-white hover:text-amber-500 transition"
                                    }
                                >
                                    Contact
                                </NavLink>
                            </li>
                        </ul>
                    </div>

                    <div className="info w-1/6">
                        <ul className='flex items-center justify-around'>
                            <li onClick={cartAdd}>
                                <a href=""><FaShoppingCart /></a>
                            </li>
                            <li>
                                <a href=""><FiLogIn /></a>
                            </li>
                        </ul>
                    </div>
                </div>
            </header>
        </>
    )
}

export default Header
