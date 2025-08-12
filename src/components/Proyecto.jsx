import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import clienteAxios from "../config/axios";

const Proyecto = ({ proyecto }) => {
    const { titulo, createdAt, slug } = proyecto;


    const [detalles, setDetalles] = useState({
        total: 0,
        progreso: 0,
        completados: 0
    });
    const [cargando, setCargando] = useState(true);

    useEffect(() => {
        const obtenerDetalles = async () => {
            const token = localStorage.getItem('token');
            if (!token) return;

            const config = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                }
            }

            try {
                const { data } = await clienteAxios.get(`tareas/${slug}`, config);
                setDetalles({
                    total: data.total || 0,
                    progreso: data.progreso || 0,
                    completados: data.completados || 0
                })
            } catch (error) {
                setDetalles({})
            }
            setCargando(false);
        }
        obtenerDetalles()

    }, [])

    const { total, progreso, completados } = detalles;
    return (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
            <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                    <h3 className="text-lg font-semibold text-gray-900 mb-1">
                        {titulo}
                    </h3>
                    <p className="text-sm text-gray-500">Creado el {Intl.DateTimeFormat('es-PE', { day: "2-digit", month: "long", year: "numeric" })
                        .format(new Date(createdAt))}</p>
                </div>
                <div className="flex items-center space-x-2">
                    {!cargando && (
                        progreso === 0 ? (
                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
                                No Iniciado
                            </span>
                        ) : (progreso >= 10 && progreso <= 75 ? (
                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                                En Progreso
                            </span>
                        ) : (
                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                                Completado
                            </span>
                        ))
                    )}

                </div>
            </div>
            <div className="mb-4">
                <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-gray-700">Progreso</span>
                    <span className="text-sm font-medium text-gray-900">{!cargando && parseFloat(progreso).toFixed(0)}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                        className={`${progreso <= 10 ? 'bg-red-500' : (progreso <= 25 ? 'bg-blue-600' : (progreso <= 75 ? 'bg-yellow-500' : 'bg-green-600'))} h-2 rounded-full`}
                        style={{ width: `${progreso}%` }}
                    />
                </div>
            </div>
            <div className="flex items-center justify-between">
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
                            d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"
                        ></path>
                    </svg>
                    {completados} de {total} tareas
                </div>
                <Link className="inline-flex items-center px-3 py-1.5 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors" to={`/tareas/${slug}`}>Ver Tareas</Link>
            </div>
        </div>
    )
}

export default Proyecto