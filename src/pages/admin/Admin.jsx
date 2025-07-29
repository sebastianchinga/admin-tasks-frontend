import { useState } from "react";
import Tarea from "../../components/Tarea";
import useModal from "../../hooks/useModal"
import useTarea from "../../hooks/useTarea";
import Alerta from "../../components/Alerta";

const Admin = () => {

    const { abrirModal, cerrarModal, modal } = useModal();
    const { tareas, setFiltro, guardarTarea } = useTarea();
    const [titulo, setTitulo] = useState('');
    const [descripcion, setDescripcion] = useState('');
    const [id, setId] = useState(null);
    const [alerta, setAlerta] = useState({});

    const handleSubmit = async (e) => {
        e.preventDefault();

        if ([titulo, descripcion].includes("")) {
            setAlerta({
                msg: 'Completa los campos',
                error: true
            })
            return;
        }

        await guardarTarea({ id, titulo, descripcion });
        setTitulo('')
        setDescripcion('')
        setAlerta({})
        cerrarModal()
    }

    const { msg } = alerta;

    return (
        <>
            {/* Page Header */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">Mis Tareas</h1>
                    <p className="text-gray-600">
                        Gestiona y completa todas tus tareas pendientes
                    </p>
                </div>
                <div className="mt-4 sm:mt-0">
                    <button
                        onClick={abrirModal}
                        id="openTaskModalBtn"
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
                                d="M12 4v16m8-8H4"
                            />
                        </svg>
                        Nueva Tarea
                    </button>
                </div>
            </div>
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                    <div className="flex items-center">
                        <div className="flex-shrink-0">
                            <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                                <svg
                                    className="w-5 h-5 text-blue-600"
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
                        </div>
                        <div className="ml-4">
                            <p className="text-sm font-medium text-gray-500">Total Tareas</p>
                            <p className="text-2xl font-bold text-gray-900">24</p>
                        </div>
                    </div>
                </div>
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                    <div className="flex items-center">
                        <div className="flex-shrink-0">
                            <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                                <svg
                                    className="w-5 h-5 text-green-600"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                                    />
                                </svg>
                            </div>
                        </div>
                        <div className="ml-4">
                            <p className="text-sm font-medium text-gray-500">Completadas</p>
                            <p className="text-2xl font-bold text-gray-900">16</p>
                        </div>
                    </div>
                </div>
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                    <div className="flex items-center">
                        <div className="flex-shrink-0">
                            <div className="w-8 h-8 bg-yellow-100 rounded-lg flex items-center justify-center">
                                <svg
                                    className="w-5 h-5 text-yellow-600"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                                    />
                                </svg>
                            </div>
                        </div>
                        <div className="ml-4">
                            <p className="text-sm font-medium text-gray-500">Pendientes</p>
                            <p className="text-2xl font-bold text-gray-900">8</p>
                        </div>
                    </div>
                </div>
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                    <div className="flex items-center">
                        <div className="flex-shrink-0">
                            <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center">
                                <svg
                                    className="w-5 h-5 text-purple-600"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
                                    />
                                </svg>
                            </div>
                        </div>
                        <div className="ml-4">
                            <p className="text-sm font-medium text-gray-500">Progreso</p>
                            <p className="text-2xl font-bold text-gray-900">67%</p>
                        </div>
                    </div>
                </div>
            </div>
            {/* Filters and Search */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
                <div className="flex items-center space-x-4 mb-4 sm:mb-0">
                    <select
                        onChange={e => setFiltro(e.target.value)}
                        id="statusFilter"
                        className="px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    >
                        <option value="">Todas las tareas</option>
                        <option value={0}>Pendientes</option>
                        <option value={1}>Completadas</option>
                    </select>

                </div>
                <div className="relative">
                    <input
                        type="text"
                        placeholder="Buscar tareas..."
                        className="pl-10 pr-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 w-full sm:w-64"
                    />
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <svg
                            className="h-5 w-5 text-gray-400"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                            />
                        </svg>
                    </div>
                </div>
            </div>
            {/* Tasks Grid */}
            <div id="tasksContainer" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {tareas.map(tarea => (
                    <Tarea tarea={tarea} key={tarea.id} />
                ))}
            </div>
            {/* Modal for New/Edit Task */}
            <div id="taskModal" className={`${!modal && 'hidden'} fixed inset-0 z-50 overflow-y-auto`}>
                {/* Modal Overlay */}
                <div id="taskModalOverlay" className="fixed inset-0 bg-black/50 z-40" />
                {/* Modal Content */}
                <div className="flex min-h-full items-center justify-center p-4 relative z-50">
                    <div className="relative bg-white rounded-lg shadow-xl max-w-lg w-full mx-auto">
                        {/* Modal Header */}
                        <div className="flex items-center justify-between p-6 border-b border-gray-200">
                            <h3
                                id="taskModalTitle"
                                className="text-lg font-semibold text-gray-900"
                            >
                                Nueva Tarea
                            </h3>
                            <button
                                onClick={cerrarModal}
                                id="closeTaskModalBtn"
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
                            <div className="px-5 pt-5">
                                <Alerta alerta={alerta} />
                            </div>
                        )}
                        {/* Modal Body */}
                        <form id="taskForm" className="p-6" onSubmit={handleSubmit}>
                            <input type="hidden" id="taskId" name="taskId" />
                            <div className="space-y-4">
                                {/* Title Field */}
                                <div>
                                    <label
                                        htmlFor="taskTitle"
                                        className="block text-sm font-medium text-gray-700 mb-2"
                                    >
                                        Título de la Tarea *
                                    </label>
                                    <input
                                        type="text"
                                        value={titulo}
                                        onChange={e => setTitulo(e.target.value)}
                                        id="taskTitle"
                                        name="title"
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                        placeholder="Ej: Diseñar mockups de homepage"
                                    />
                                </div>
                                {/* Description Field */}
                                <div>
                                    <label
                                        htmlFor="taskDescription"
                                        className="block text-sm font-medium text-gray-700 mb-2"
                                    >
                                        Descripción *
                                    </label>
                                    <textarea
                                        id="taskDescription"
                                        value={descripcion}
                                        onChange={e => setDescripcion(e.target.value)}
                                        name="description"
                                        rows={4}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none"
                                        placeholder="Describe detalladamente lo que se debe hacer en esta tarea..."
                                    />
                                </div>
                            </div>
                            {/* Modal Footer */}
                            <div className="flex items-center justify-end space-x-3 mt-6 pt-6 border-t border-gray-200">
                                <button
                                    onClick={cerrarModal}
                                    type="button"
                                    id="cancelTaskBtn"
                                    className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
                                >
                                    Cancelar
                                </button>
                                <button
                                    type="submit"
                                    id="saveTaskBtn"
                                    className="px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
                                >
                                    Guardar Tarea
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Admin