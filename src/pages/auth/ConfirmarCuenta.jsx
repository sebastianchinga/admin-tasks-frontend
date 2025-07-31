import { useEffect } from "react";
import { useState } from "react"
import clienteAxios from "../../config/axios";
import { Link, useParams } from "react-router-dom";

const ConfirmarCuenta = () => {
  const [cargando, setCargando] = useState(true);
  const [confirmar, setConfirmar] = useState(false);
  const { token } = useParams();
  const [alerta, setAlerta] = useState({});

  useEffect(() => {
    const confirmarCuenta = async () => {
      try {
        const { data } = await clienteAxios.get(`/usuarios/confirmar/${token}`);
        setConfirmar(true);
        setAlerta({
          msg: data.msg
        })
      } catch (error) {
        setAlerta({
          msg: 'Este enlace no es válido',
        })
      }
      setCargando(false);
    }
    confirmarCuenta()
  }, [])

  const { msg } = alerta

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center min-h-[calc(100vh-200px)]">
      {!cargando && (
        <>
          {/* Left Side - Welcome Message */}
          <div className="space-y-8">
            {confirmar ? (
              <>
                <div>
                  <h1 className="text-4xl font-bold text-gray-900 mb-4">¡Tu cuenta está confirmada!</h1>
                  <p className="text-xl text-gray-600">
                    Bienvenido a TaskManager. Tu cuenta ha sido activada exitosamente y ya puedes disfrutar de todas
                    las funcionalidades.
                  </p>
                </div>

                {/* <!-- Confirmation Steps --> */}
                <div className="space-y-6">
                  <div className="flex items-start space-x-4">
                    <div className="flex-shrink-0">
                      <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                        <svg className="w-5 h-5 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                          <path fill-rule="evenodd"
                            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                            clip-rule="evenodd"></path>
                        </svg>
                      </div>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">Cuenta confirmada exitosamente</h3>
                      <p className="text-gray-600">Tu email ha sido verificado correctamente</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <div className="flex-shrink-0">
                      <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                        <svg className="w-5 h-5 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                          <path fill-rule="evenodd"
                            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                            clip-rule="evenodd"></path>
                        </svg>
                      </div>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">Acceso completo activado</h3>
                      <p className="text-gray-600">Todas las funcionalidades están disponibles</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <div className="flex-shrink-0">
                      <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                        <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor"
                          viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="M13 10V3L4 14h7v7l9-11h-7z"></path>
                        </svg>
                      </div>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">¡Comienza ahora!</h3>
                      <p className="text-gray-600">Inicia sesión y crea tu primer proyecto</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <div className="flex-shrink-0">
                      <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                        <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor"
                          viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                        </svg>
                      </div>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">Organiza y aumenta tu productividad</h3>
                      <p className="text-gray-600">Gestiona tareas, proyectos y colabora con tu equipo</p>
                    </div>
                  </div>
                </div>
              </>
            ) : (
              <>
                <div>
                  <h1 className="text-4xl font-bold text-gray-900 mb-4">
                    No pudimos confirmar tu cuenta
                  </h1>
                  <p className="text-xl text-gray-600">
                    Ha ocurrido un problema durante el proceso de confirmación. No te
                    preocupes, podemos solucionarlo fácilmente.
                  </p>
                </div>
                {/* Common Issues */}
                <div className="space-y-6">
                  <div className="flex items-start space-x-4">
                    <div className="flex-shrink-0">
                      <div className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center">
                        <svg
                          className="w-5 h-5 text-red-600"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                          />
                        </svg>
                      </div>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">Enlace expirado</h3>
                      <p className="text-gray-600">
                        Los enlaces de confirmación expiran después de 24 horas por seguridad
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-4">
                    <div className="flex-shrink-0">
                      <div className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center">
                        <svg
                          className="w-5 h-5 text-red-600"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                          />
                        </svg>
                      </div>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">
                        Enlace ya utilizado
                      </h3>
                      <p className="text-gray-600">
                        Cada enlace de confirmación solo puede usarse una vez
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-4">
                    <div className="flex-shrink-0">
                      <div className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center">
                        <svg
                          className="w-5 h-5 text-red-600"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                          />
                        </svg>
                      </div>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">Enlace dañado</h3>
                      <p className="text-gray-600">
                        El enlace puede haberse cortado o modificado accidentalmente
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-4">
                    <div className="flex-shrink-0">
                      <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
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
                            d="M13 10V3L4 14h7v7l9-11h-7"
                          />
                        </svg>
                      </div>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">Solución rápida</h3>
                      <p className="text-gray-600">
                        Solicita un nuevo enlace de confirmación y listo
                      </p>
                    </div>
                  </div>
                </div>
              </>

            )}

          </div>
          {/* Right Side - Login Form */}
          <div className="bg-white rounded-lg shadow-lg border border-gray-200 p-8">
            {/* <!-- Success State  --> */}
            <div id="successState" className="text-center">
              {confirmar ? (
                <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-green-100 mb-6">
                  <svg className="h-8 w-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7">
                    </path>
                  </svg>
                </div>
              ) : (
                <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-red-100 mb-4">
                  <svg
                    className="h-8 w-8 text-red-600"
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
                </div>

              )}
              <h2 className="text-2xl font-bold text-gray-900 mb-2">¡{msg}!</h2>

              {confirmar && (
                <>
                  <p className="text-gray-600 mb-6">
                    Tu cuenta ha sido activada exitosamente. Ya puedes acceder a todas las funcionalidades de
                    TaskManager.
                  </p>
                  <div className="space-y-3">
                    <Link to="/login" className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors">Iniciar sesión</Link>
                  </div>
                </>
              )}

            </div>
          </div>
        </>
      )}
    </div >
  )
}

export default ConfirmarCuenta