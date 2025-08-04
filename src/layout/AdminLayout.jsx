import { Link, Navigate, Outlet } from "react-router-dom"
import useDropdown from "../hooks/useDropdown"
import useAuth from "../hooks/useAuth";
import useIniciales from "../hooks/useIniciales";
import { useEffect, useRef } from "react";

const AdminLayout = () => {

    const dropdownMenu = useRef(null);
    const botonDrop = useRef(null);
    const { abrirDropdown, dropdown, setDropdown } = useDropdown();
    const { cargando, auth, cerrarSesion } = useAuth();
    const { obtenerIniciales } = useIniciales();

    useEffect(() => {
        document.addEventListener('click', (e) => { 
            if (!botonDrop.current.contains(e.target) && !botonDrop.current.contains(e.target)) {
                setDropdown(false);
            }
        });
    }, [])

    if (cargando) return 'cargando';

    return (
        <>
            {/* Header */}
            <header className="bg-white shadow-sm border-b border-gray-200">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center h-16">
                        {/* Logo/Brand */}
                        <div className="flex items-center">
                            <Link to="/home" className="text-xl font-bold text-gray-900 hover:text-blue-600 transition-colors">TaskManager</Link>
                        </div>
                        {/* User Menu */}
                        <div className="relative">
                            <button
                                ref={botonDrop}
                                onClick={abrirDropdown}
                                id="userMenuBtn"
                                className="flex items-center space-x-3 p-2 rounded-full hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
                            >
                                <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                                    <span className="text-sm font-medium text-white">{auth?.id && obtenerIniciales(auth.nombre)}</span>
                                </div>
                                <svg
                                    className="w-4 h-4 text-gray-400"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M19 9l-7 7-7-7"
                                    ></path>
                                </svg>
                            </button>
                            {/* Dropdown Menu */}
                            <div
                                ref={dropdownMenu}
                                id="userDropdown"
                                className={`${!dropdown && 'hidden'} absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg border border-gray-200 z-50`}
                            >
                                <div className="py-1">
                                    {/* User Info */}
                                    <div className="px-4 py-3 border-b border-gray-100">
                                        <p className="text-sm font-medium text-gray-900">{auth.nombre}</p>
                                        <p className="text-sm text-gray-500">{auth.email}</p>
                                    </div>
                                    {/* Menu Items */}
                                    <Link to="/perfil" className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors">
                                        <svg
                                            className="w-4 h-4 mr-3 text-gray-400"
                                            fill="none"
                                            stroke="currentColor"
                                            viewBox="0 0 24 24"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                                            />
                                        </svg>
                                        Mi Perfil
                                    </Link>
                                    <a
                                        href="#"
                                        className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
                                    >
                                        <svg
                                            className="w-4 h-4 mr-3 text-gray-400"
                                            fill="none"
                                            stroke="currentColor"
                                            viewBox="0 0 24 24"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                                            ></path>
                                        </svg>
                                        Ayuda y Soporte
                                    </a>
                                    <div className="border-t border-gray-100 mt-1">
                                        <button onClick={cerrarSesion}
                                            className="flex items-center px-4 py-2 text-sm text-red-700 hover:bg-red-50 transition-colors hover:cursor-pointer">

                                            <svg
                                                className="w-4 h-4 mr-3 text-red-400"
                                                fill="none"
                                                stroke="currentColor"
                                                viewBox="0 0 24 24"
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth={2}
                                                    d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                                                ></path>
                                            </svg>
                                            Cerrar Sesión
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </header>
            {/* Main Content */}
            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {auth?.id ? <Outlet /> : <Navigate to="/" />}
            </main>
        </>
    )
}

export default AdminLayout