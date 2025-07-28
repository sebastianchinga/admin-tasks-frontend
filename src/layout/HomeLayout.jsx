import { Link, Outlet } from 'react-router-dom'

const HomeLayout = () => {
    return (
        <>
            {/* Header */}
            <header className="bg-white shadow-sm border-b border-gray-200">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center h-16">
                        {/* Logo/Brand */}
                        <div className="flex items-center">
                            <Link to="/" className="text-xl font-bold text-gray-900">
                                TaskManager
                            </Link>
                        </div>
                        {/* Auth Buttons */}
                        <div className="flex items-center space-x-3">
                            <Link to="login" className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors">Iniciar Sesión</Link>
                            <Link to="registrar" className="px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors">Registrarse</Link>
                        </div>
                    </div>
                </div>
            </header>
            {/* Main Content */}
            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <Outlet />
            </main>
            {/* Footer */}
            <footer className="bg-white border-t border-gray-200 mt-16">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                    <div className="text-center text-gray-500">
                        <p>© 2024 TaskManager. Todos los derechos reservados.</p>
                    </div>
                </div>
            </footer>
        </>
    )
}

export default HomeLayout