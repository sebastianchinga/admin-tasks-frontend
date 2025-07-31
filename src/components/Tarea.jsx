import useTarea from "../hooks/useTarea";

const Tarea = ({ tarea, fn }) => {
    const { titulo, descripcion, estado } = tarea;
    const { cambiarEstado } = useTarea();
    const { setTarea } = useTarea();

    const editando = (tarea) => {
        setTarea(tarea)
        fn()
    }

    return (
        <div
            className="task-card bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow"
            data-status="pending"
            data-task-id={1}
        >
            <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                        {titulo}
                    </h3>
                    <p className="text-sm text-gray-600 line-clamp-2">
                        {descripcion}
                    </p>
                </div>
                <div className="flex items-center space-x-2 ml-4">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-${estado ? 'green' : 'yellow'}-100 text-${estado ? 'green' : 'yellow'}-800`}>
                        {estado ? 'Completado' : 'Pendiente'}
                    </span>
                    <button
                        onClick={() => editando(tarea)}
                        className="inline-flex items-center px-2 py-1 text-xs font-medium text-gray-600 bg-gray-100 rounded hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
                    >
                        <svg
                            className="w-3 h-3 mr-1"
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
                        Editar
                    </button>
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
                            d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                        ></path>
                    </svg>
                    Vence: 25 Mar 2024
                </div>
                <button
                    onClick={() => cambiarEstado(tarea)}
                    className="inline-flex items-center px-3 py-1.5 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
                >
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
                            d="M5 13l4 4L19 7"
                        ></path>
                    </svg>
                    Completar
                </button>
            </div>
        </div>
    )
}

export default Tarea