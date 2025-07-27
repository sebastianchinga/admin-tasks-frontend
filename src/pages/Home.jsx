const Home = () => {
    return (
        <>
            {/* Welcome Section */}
            <div className="text-center mb-12">
                <h2 className="text-3xl font-bold text-gray-900 mb-4">
                    Bienvenido a TaskManager
                </h2>
                <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                    Organiza, gestiona y completa tus tareas de manera eficiente. Mantén el
                    control de todos tus proyectos en un solo lugar.
                </p>
            </div>
            {/* Features Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
                {/* Feature 1 */}
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                    <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                        <svg
                            className="w-6 h-6 text-blue-600"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"
                            ></path>
                        </svg>
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                        Gestión de Tareas
                    </h3>
                    <p className="text-gray-600">
                        Crea, edita y organiza tus tareas con facilidad. Establece prioridades
                        y fechas límite.
                    </p>
                </div>
                {/* Feature 2 */}
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                    <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                        <svg
                            className="w-6 h-6 text-green-600"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                            ></path>
                        </svg>
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                        Colaboración
                    </h3>
                    <p className="text-gray-600">
                        Trabaja en equipo, asigna tareas y mantén a todos sincronizados en
                        tiempo real.
                    </p>
                </div>
                {/* Feature 3 */}
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                    <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
                        <svg
                            className="w-6 h-6 text-purple-600"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                            ></path>
                        </svg>
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">Reportes</h3>
                    <p className="text-gray-600">
                        Visualiza tu progreso con gráficos y estadísticas detalladas de
                        productividad.
                    </p>
                </div>
            </div>
            {/* CTA Section */}
            <div className="bg-blue-50 rounded-lg p-8 text-center">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">
                    ¿Listo para ser más productivo?
                </h3>
                <p className="text-gray-600 mb-6 max-w-xl mx-auto">
                    Únete a miles de usuarios que ya están organizando mejor su trabajo con
                    TaskManager.
                </p>
                <a
                    href="registrar.html"
                    className="px-6 py-3 text-base font-medium text-white bg-blue-600 border border-transparent rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
                >
                    Comenzar Gratis
                </a>
            </div>
        </>
    )
}

export default Home