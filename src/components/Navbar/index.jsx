import React from 'react';
import { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import { ShoppingCartContext } from '../../Context';
import { ShoppingBagIcon } from '@heroicons/react/24/solid';
import { useAuth } from "../../Context/authContext";

function Navbar() {
    const { logout, user } = useAuth();
    console.log(user);

    const handleLogout = async () => {
        try {
            await logout();
        } catch (error) {
            console.error(error.message);
        };
    };

    const context = useContext(ShoppingCartContext);
    const activeStyle = 'underline underline-offset-4';

    return (
        <nav className='flex justify-between items-center fixed z-10 top-0 w-full py-5 px-8 text-sm font-light'>
            <ul className='flex items-center gap-3'>
                <li className='font-semibold text-lg'>
                    <NavLink
                        to="/"
                        className={({ isActive }) =>
                            isActive ? activeStyle : undefined
                        }>
                        Inicio
                    </NavLink>
                </li>
                <li>
                    <NavLink
                        to="/my-account"
                        className={({ isActive }) =>
                            isActive ? activeStyle : undefined
                        }>
                        Mi cuenta
                    </NavLink>
                </li>
                <li>
                    <NavLink
                        to="/my-orders"
                        className={({ isActive }) =>
                            isActive ? activeStyle : undefined
                        }
                    >
                        Carrito
                    </NavLink>
                </li>
                <li>
                    <NavLink
                        to="/sign-in"
                        className={({ isActive }) =>
                            isActive ? activeStyle : undefined
                        }
                    >
                        Iniciar sesión
                    </NavLink>
                </li>
            </ul>
            <ul className='flex items-center gap-3'>
                <li className='text-black/60'>
                    {user && user.email && <p>{user.email}</p>}
                </li>
                <li className='text-black/60'>
                    <button
                        onClick={handleLogout}
                    >
                        Salir
                    </button>
                </li>
                <li>
                    <NavLink
                        to="/my-orders"
                        className={({ isActive }) =>
                            isActive ? activeStyle : undefined
                        }
                    >
                        Mi carrito
                    </NavLink>
                </li>
                <li className='flex items-center'>
                    <ShoppingBagIcon className='h-6 w-6 text-black' />
                    <div>
                        {context.count}
                    </div>
                </li>
            </ul>
        </nav>
    )
}

export default Navbar;