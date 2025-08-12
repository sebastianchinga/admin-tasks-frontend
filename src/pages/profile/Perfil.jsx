import { useEffect, useRef, useState } from "react";
import useAuth from "../../hooks/useAuth"
import useIniciales from "../../hooks/useIniciales";
import useModalPerfil from "../../hooks/useModalPerfil";
import Alerta from "../../components/Alerta";
import clienteAxios from "../../config/axios";

const Perfil = () => {

    // Custom Hooks
    const { modalPerfil, cerrarModalPerfil, mostrarPerfil } = useModalPerfil();
    const { auth, setAuth } = useAuth();
    const { obtenerIniciales } = useIniciales();

    // Referencia a los elementos HTML
    const modalEdit = useRef(null);

    // States
    const [nombre, setNombre] = useState('')
    const [email, setEmail] = useState('')
    const [alerta, setAlerta] = useState({})
    const [proyectos, setProyectos] = useState([]);
    const [completados, setCompletados] = useState(0);
    const [progreso, setProgreso] = useState(0);

    useEffect(() => {
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && !modalEdit.current.classList.contains('hidden')) {
                cerrarModalPerfil();
            }
        });
        setNombre(auth.nombre)
        setEmail(auth.email)
    }, [])

    useEffect(() => {
        const obtenerProyectos = async () => {
            const token = localStorage.getItem('token');

            if (!token) return;
            const config = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                }
            }

            try {
                const { data } = await clienteAxios.get('/proyectos/', config);
                setProyectos(data);
            } catch (error) {
                console.log(error)
            }
        }
        obtenerProyectos();
    }, [])

    const handleSubmit = async (e) => {
        e.preventDefault();

        if ([nombre, email].includes("")) {
            setAlerta({
                msg: 'Completa los campos',
                error: true
            })
            return;
        }

        const token = localStorage.getItem('token');

        if (!token) return;
        const config = {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            }
        }

        try {
            const { data } = await clienteAxios.put('/usuarios/actualizar-perfil', { nombre, email }, config);
            setAuth(data);
        } catch (error) {
            console.log(error);
        }
        cerrarModalPerfil()
    }

    // Calcular estadisticas de los proyectos, escucha el array proyectos
    useEffect(() => {
        const obtenerEstadisticas = async () => {
            const completados = []; // Crea nuevo para agregar las tareas
            // Extraemos en un nuevo arra unicamente los slugs de cada proyecto
            const slugs = proyectos.map(proyecto => proyecto.slug);
            // Validamos, si slug tiene algo (mayor a 0)
            if (slugs.length > 0) {

                // Obtenemos token y creamos la cabecera para la peticion
                const token = localStorage.getItem('token');
                if (!token) return;
                const config = {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`
                    }
                }

                // Iteramos, mientras index sea menor a la longitud del array slugs, incrementamos uno mas a index
                for (let index = 0; index < slugs.length; index++) {
                    // Por cada iteraccion hacemos extraemos la tarea y su info
                    try {
                        const { data } = await clienteAxios.get(`/tareas/${slugs[index]}`, config);
                        // Agregamos la tarea y su info al array
                        completados.push(data);
                    } catch (error) {
                        console.log('Hubo un error');
                    }
                }

                // Seteamos los states completados y progreso
                setCompletados(completados.filter(c => c.progreso === 100).length);
                setProgreso(completados.filter(c => c.progreso < 100).length);
            }
        }
        obtenerEstadisticas()
    }, [proyectos])

    const { msg } = alerta

    return (
        <>

            {/* Page Header */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">Mi Perfil</h1>
                    <p className="text-gray-600">
                        Gestiona tu información personal y configuración de cuenta
                    </p>
                </div>
                <div className="mt-4 sm:mt-0">
                    <button
                        onClick={mostrarPerfil}
                        id="editProfileBtn"
                        className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
                    >
                        <svg
                            className="w-4 h-4 mr-2"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                            ></path>
                        </svg>
                        Editar Perfil
                    </button>
                </div>
            </div>

            {/* Profile Content */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Left Column - Profile Info */}
                <div className="lg:col-span-2 space-y-6">
                    {/* Profile Header Card */}
                    <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
                        {/* Cover Photo */}
                        <div className="h-32 bg-gradient-to-r from-blue-500 to-purple-600" />
                        {/* Profile Info */}
                        <div className="relative px-6 pb-6">
                            <div className="flex flex-col sm:flex-row sm:items-end sm:space-x-6">
                                {/* Avatar with Initials */}
                                <div className="relative -mt-16 mb-4 sm:mb-0">
                                    <div
                                        className="w-32 h-32 rounded-full border-4 border-white shadow-lg bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center"
                                        id="profileAvatar"
                                    >
                                        <span
                                            className="text-4xl font-bold text-white"
                                            id="profileInitials"
                                        >
                                            {obtenerIniciales(auth.nombre)}
                                        </span>
                                    </div>
                                    <button
                                        className="absolute bottom-2 right-2 bg-blue-600 text-white p-2 rounded-full hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
                                        id="changeAvatarBtn"
                                        title="Cambiar color del avatar"
                                    >
                                        <svg
                                            className="w-4 h-4"
                                            fill="none"
                                            stroke="currentColor"
                                            viewBox="0 0 24 24"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zM21 5a2 2 0 00-2-2h-4a2 2 0 00-2 2v12a4 4 0 004 4h4a2 2 0 002-2V5z"
                                            ></path>
                                        </svg>
                                    </button>
                                </div>
                                {/* User Info */}
                                <div className="flex-1">
                                    <h2
                                        className="text-2xl font-bold text-gray-900"
                                        id="profileUserName"
                                    >
                                        {auth.nombre}
                                    </h2>
                                    <p className="text-sm text-gray-500 mt-1">
                                        Miembro desde Enero 2024
                                    </p>
                                    <div className="flex items-center mt-2 space-x-4">
                                        <div className="flex items-center text-sm text-gray-500">
                                            <svg
                                                className="w-4 h-4 mr-1"
                                                fill="none"
                                                stroke="currentColor"
                                                viewBox="0 0 24 24"
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth={2}
                                                    d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                                                ></path>
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth={2}
                                                    d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                                                />
                                            </svg>
                                            Madrid, España
                                        </div>
                                        <div className="flex items-center text-sm text-gray-500">
                                            <svg
                                                className="w-4 h-4 mr-1"
                                                fill="none"
                                                stroke="currentColor"
                                                viewBox="0 0 24 24"
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth={2}
                                                    d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                                                ></path>
                                            </svg>
                                            {auth.email}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* Personal Information */}
                    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                        <div className="flex items-center justify-between mb-6">
                            <h3 className="text-lg font-semibold text-gray-900">
                                Información Personal
                            </h3>
                            <button
                                onClick={mostrarPerfil}
                                className="text-blue-600 hover:text-blue-700 text-sm font-medium"
                                id="editInfoBtn"
                            >
                                Editar
                            </button>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Nombre completo
                                </label>
                                <p className="text-gray-900" id="fullName">
                                    {auth.nombre}
                                </p>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Correo electrónico
                                </label>
                                <p className="text-gray-900" id="email">
                                    {auth.email}
                                </p>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Teléfono
                                </label>
                                <p className="text-gray-900" id="phone">
                                    +34 612 345 678
                                </p>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Ubicación
                                </label>
                                <p className="text-gray-900" id="location">
                                    Madrid, España
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
                {/* Right Column - Stats & Settings */}
                <div className="space-y-6 mb-8">
                    {/* Statistics */}
                    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                        <h3 className="text-lg font-semibold text-gray-900 mb-6">
                            Estadísticas de Proyectos
                        </h3>
                        <div className="space-y-4">
                            {/* Added total projects statistic at the top */}
                            <div className="flex items-center justify-between">
                                <div className="flex items-center space-x-3">
                                    <div className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center">
                                        <svg
                                            className="w-4 h-4 text-gray-600"
                                            fill="none"
                                            stroke="currentColor"
                                            viewBox="0 0 24 24"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
                                            ></path>
                                        </svg>
                                    </div>
                                    <span className="text-sm text-gray-700">Total de proyectos</span>
                                </div>
                                <span className="text-lg font-semibold text-gray-900">{proyectos.length}</span>
                            </div>
                            <div className="flex items-center justify-between">
                                <div className="flex items-center space-x-3">
                                    <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                                        <svg
                                            className="w-4 h-4 text-green-600"
                                            fill="currentColor"
                                            viewBox="0 0 20 20"
                                        >
                                            <path
                                                fillRule="evenodd"
                                                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                                clipRule="evenodd"
                                            />
                                        </svg>
                                    </div>
                                    <span className="text-sm text-gray-700">Proyectos completados</span>
                                </div>
                                <span className="text-lg font-semibold text-gray-900">{ completados}</span>
                            </div>
                            <div className="flex items-center justify-between">
                                <div className="flex items-center space-x-3">
                                    <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                                        <svg
                                            className="w-4 h-4 text-blue-600"
                                            fill="none"
                                            stroke="currentColor"
                                            viewBox="0 0 24 24"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
                                            ></path>
                                        </svg>
                                    </div>
                                    <span className="text-sm text-gray-700">Proyectos en progreso</span>
                                </div>
                                <span className="text-lg font-semibold text-gray-900">{progreso}</span>
                            </div>
                        </div>
                    </div>
                </div>

            </div>

            {/* Edit Profile Modal */}
            <div ref={modalEdit} id="editModal" className={`${!modalPerfil ? 'hidden' : ''} fixed inset-0 z-50 overflow-y-auto`}>
                {/* Modal Overlay */}
                <div id="editModalOverlay" className="fixed inset-0 bg-black/5 bg-opacity-50 transition-opacity" />
                {/* Modal Content */}
                <div className="flex min-h-full items-center justify-center p-4">
                    <div className="relative bg-white rounded-lg shadow-xl max-w-2xl w-full mx-auto">
                        {/* Modal Header */}
                        <div className="flex items-center justify-between p-6 border-b border-gray-200">
                            <h3 className="text-lg font-semibold text-gray-900">Editar Perfil</h3>
                            <button
                                onClick={cerrarModalPerfil}
                                id="closeModal"
                                className="text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-full p-1"
                            >
                                <svg
                                    className="w-6 h-6"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M6 18L18 6M6 6l12 12"
                                    />
                                </svg>
                            </button>
                        </div>
                        {msg && (
                            <div className="mx-4 mt-4">
                                <Alerta alerta={alerta} />
                            </div>
                        )}
                        {/* Modal Body */}
                        <form id="editProfileForm" className="p-6" onSubmit={handleSubmit}>
                            <div className="space-y-6">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Nombre completo
                                        </label>
                                        <input
                                            type="text"
                                            value={nombre}
                                            onChange={e => setNombre(e.target.value)}
                                            id="editFullName"
                                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Correo electrónico
                                        </label>
                                        <input
                                            type="email"
                                            value={email}
                                            onChange={e => setEmail(e.target.value)}
                                            disabled
                                            id="editEmail"
                                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 bg-gray-100 focus:ring-blue-500 focus:border-blue-500 cursor-not-allowed"
                                        />
                                    </div>
                                    {/* <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Teléfono
                                        </label>
                                        <input
                                            type="tel"
                                            id="editPhone"
                                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                        />
                                    </div> */}
                                    {/* <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Ubicación
                                        </label>
                                        <input
                                            type="text"
                                            id="editLocation"
                                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                        />
                                    </div> */}
                                </div>
                            </div>
                            {/* Modal Footer */}
                            <div className="flex items-center justify-end space-x-3 mt-6 pt-6 border-t border-gray-200">
                                <button
                                    onClick={cerrarModalPerfil}
                                    type="button"
                                    id="cancelEdit"
                                    className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
                                >
                                    Cancelar
                                </button>
                                <button
                                    type="submit"
                                    className="px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
                                >
                                    Guardar Cambios
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>

    )
}

export default Perfil