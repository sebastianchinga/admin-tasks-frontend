import { useEffect, useState } from "react"
import Proyecto from "../../components/Proyecto"
import clienteAxios from "../../config/axios";
import useAuth from "../../hooks/useAuth";
import useModal from "../../hooks/useModal";
import useDropdown from "../../hooks/useDropdown";
import { useNavigate } from "react-router-dom";

const Projects = () => {
  // Custom hooks
  const { modal, abrirModal, cerrarModal } = useModal();
  const { auth } = useAuth();
  const navigate = useNavigate();

  // States
  const [proyectos, setProyectos] = useState([]);
  const [titulo, setTitulo] = useState('')
  const [slug, setSlug] = useState('')
  const [descripcion, setDescripcion] = useState('')
  const [alerta, setAlerta] = useState({})

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
        const { data } = await clienteAxios.get('proyectos/', config)
        setProyectos(data);
      } catch (error) {
        setProyectos([]);
      }
    }
    obtenerProyectos()
  }, [auth])

  useEffect(() => {
    setSlug(titulo.split(' ').map(e => e.toLocaleLowerCase()).join("-"))
  }, [titulo])

  const handleSubmit = async (e) => {
    e.preventDefault();

    if ([titulo, slug, descripcion].includes("")) {
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
      const { data } = await clienteAxios.post('/proyectos', { titulo, slug, descripcion }, config);
      setProyectos([data, ...proyectos]);
    } catch (error) {
      setAlerta({
        msg: error.response.data.msg,
        error: true
      })
    }
    setTitulo('')
    setSlug('')
    setDescripcion('')
    cerrarModal()
  }

  const eliminarProyecto = async proyecto => {
    const { id } = proyecto;

    const token = localStorage.getItem('token');
    if (!token) return;

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      }
    }

    try {
      const { data } = await clienteAxios.delete(`/proyectos/eliminar-proyecto/${id}`, config);
      setProyectos(prew => prew.filter(p => p.id !== id));
    } catch (error) {
      console.log(error);
    }
  }

  const { msg } = alerta

  return (
    <>
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8">
        {/* Texto */}
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Mis Proyectos</h1>
          <p className="text-gray-600">
            Gestiona y supervisa todos tus proyectos activos
          </p>
        </div>
        {/* Botón para agregar proyecto */}
        <div className="mt-4 sm:mt-0">
          <button onClick={abrirModal} id="openProjectModalBtn" className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors">
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
            Nuevo Proyecto
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
                    d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
                  ></path>
                </svg>
              </div>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Total Proyectos</p>
              <p className="text-2xl font-bold text-gray-900">{proyectos.length}</p>
            </div>
          </div>
        </div>
      </div>
      {/* Filters and Search */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
        <div className="flex items-center space-x-4 mb-4 sm:mb-0">
          <select className="px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
            <option>Todos los proyectos</option>
            <option>En progreso</option>
            <option>Completados</option>
            <option>Pausados</option>
          </select>
          <select className="px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
            <option>Ordenar por fecha</option>
            <option>Ordenar por nombre</option>
            <option>Ordenar por progreso</option>
          </select>
        </div>
        <div className="relative">
          <input
            type="text"
            placeholder="Buscar proyectos..."
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
      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Project Card  */}
        {proyectos.map(proyecto => (
          <Proyecto key={proyecto.id} proyecto={proyecto} onDelete={eliminarProyecto} />
        ))}

      </div>
      {/* Modal for New Project */}
      <div id="projectModal" className={`${!modal && 'hidden'} fixed inset-0 z-50 overflow-y-auto`}>
        {/* Modal Overlay */}
        <div
          onClick={cerrarModal}
          id="projectModalOverlay"
          className="fixed inset-0 bg-black/50 bg-opacity-50 transition-opacity"
        />
        {/* Modal Content */}
        <div className="flex min-h-full items-center justify-center p-4">
          <div className="relative bg-white rounded-lg shadow-xl max-w-lg w-full mx-auto">
            {/* Modal Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <h3
                id="projectModalTitle"
                className="text-lg font-semibold text-gray-900"
              >
                Nuevo Proyecto
              </h3>
              <button
                onClick={cerrarModal}
                id="closeProjectModalBtn"
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
            {/* Modal Body */}
            <form id="projectForm" className="p-6" onSubmit={handleSubmit}>
              <div className="space-y-6">
                {/* Project Title */}
                <div>
                  <label
                    htmlFor="projectTitle"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Título del Proyecto *
                  </label>
                  <input
                    value={titulo}
                    onChange={e => setTitulo(e.target.value)}
                    type="text"
                    id="projectTitle"
                    name="projectTitle"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Ej: Rediseño de Website"
                  />
                </div>
                {/* Project Slug */}
                <div>
                  <label
                    htmlFor="projectSlug"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Slug del Proyecto
                  </label>
                  <input
                    value={slug}
                    type="text"
                    id="projectSlug"
                    name="projectSlug"
                    disabled=""
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm bg-gray-100 text-gray-500 cursor-not-allowed"
                    placeholder="rediseno-de-website"
                  />
                  <p className="mt-1 text-xs text-gray-500">
                    Se genera automáticamente basado en el título
                  </p>
                </div>
                {/* Description */}
                <div>
                  <label
                    htmlFor="projectDescription"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Descripción
                  </label>
                  <textarea
                    value={descripcion}
                    onChange={e => setDescripcion(e.target.value)}
                    id="projectDescription"
                    name="projectDescription"
                    rows={4}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none"
                    placeholder="Describe brevemente el objetivo y alcance del proyecto..."
                  />
                </div>
              </div>
              {/* Modal Footer */}
              <div className="flex items-center justify-end space-x-3 mt-6 pt-6 border-t border-gray-200">
                <button
                  onClick={cerrarModal}
                  type="button"
                  id="cancelProjectBtn"
                  className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  id="saveProjectBtn"
                  className="px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
                >
                  Crear Proyecto
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>

    </>

  )
}

export default Projects