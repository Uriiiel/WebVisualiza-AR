import React, { useEffect, useState } from 'react';
import { useContext } from 'react';
import { NavLink, Navigate } from 'react-router-dom';
import { ShoppingCartContext } from '../../Context';
import { ShoppingBagIcon } from '@heroicons/react/24/solid';
import { useAuth } from "../../Context/authContext";
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "../../utils/firebaseConfig";

function Navbar() {
    const { logout, user } = useAuth();
    const [userRole, setUserRole] = useState(null);
    const [loading, setLoading] = useState(true);
    const context = useContext(ShoppingCartContext);
    const activeStyle = 'underline underline-offset-4';

    useEffect(() => {
        const fetchUserRole = async () => {
            if (user) {
                const q = query(collection(db, 'usuarios'), where('email', '==', user.email));
                const querySnapshot = await getDocs(q);
                querySnapshot.forEach((doc) => {
                    setUserRole(doc.data().role);
                });
            }
            setLoading(false);
        };

        fetchUserRole();
    }, [user]);

    if (loading) {
        return <p>Cargando...</p>;
    }

    const isBuyer = userRole === 'comprador';
    const isSeller = userRole === 'vendedor';

    // const handleLogout = async () => {
    //     try {
    //         await logout();
    //         Navigate("/");
    //         window.location.reload(); // Recargar la página después de la navegación
    //     } catch (error) {
    //         console.error(error.message);
    //     }
    // };
    const handleLogout = async () => {
        try {
            await logout();
            window.location.href = '/'; // Redirigir a la ruta de inicio y recargar la página
        } catch (error) {
            console.error(error.message);
        }
    };


    return (
        <nav className='flex justify-between items-center fixed z-10 top-0 w-full py-5 px-8 text-sm font-light'>
            <ul className='flex items-center gap-3'>
                <li className='font-semibold text-lg'>
                    <NavLink to="/" className={activeStyle}>
                        Inicio
                    </NavLink>
                </li>
                <li>
                    <NavLink to="/my-account" className={activeStyle}>
                        Mi cuenta
                    </NavLink>
                </li>
                {isBuyer && (
                    <li>
                        <NavLink to="/my-orders" className={activeStyle}>
                            Mis pedidos
                        </NavLink>
                    </li>
                )}
                {isSeller && (
                    <React.Fragment>
                        <li>
                            <NavLink to="/upload-product" className={activeStyle}>
                                Subir producto
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to="/requests" className={activeStyle}>
                                Solicitudes
                            </NavLink>
                        </li>
                    </React.Fragment>
                )}
                {!user && (
                    <li>
                        <NavLink to="/sign-in" className={activeStyle}>
                            Iniciar sesión
                        </NavLink>
                    </li>
                )}
            </ul>
            <ul className='flex items-center gap-3'>
                {user && (
                    <React.Fragment>
                        <li className='text-black/60'>
                            <p>{user.email}</p>
                        </li>
                        <li className='text-black/60'>
                            <NavLink to="/" className={activeStyle} onClick={handleLogout}>
                                Cerrar sesión
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to="/my-orders" className={activeStyle}>
                                Mi carrito
                            </NavLink>
                        </li>
                    </React.Fragment>
                )}
                <li className='flex items-center'>
                    <ShoppingBagIcon className='h-6 w-6 text-black' />
                    <div>{context.count}</div>
                </li>
            </ul>
        </nav>
    )
}

export default Navbar;