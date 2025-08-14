import { useEffect, useState } from "react";
import { useParams } from 'react-router-dom';
import Alerta from "../../components/Alerta";
import clienteAxios from "../../config/axios";

const CambiarPassword = () => {
  const [password, setPassword] = useState('');
  const [passwordConfirmar, setPasswordConfirmar] = useState('');
  const [alerta, setAlerta] = useState({});
  const [cargando, setCargando] = useState(true);
  const [confirmar, setConfirmar] = useState(false);
  const { token } = useParams();

  useEffect(() => {
    const verificarToken = async () => {
      try {
        const { data } = await clienteAxios.get(`/usuarios/olvide-password/${token}`);
        setConfirmar(true);
      } catch (error) {
        setAlerta({
          msg: error.response.data.msg,
          error: true
        })
      }
      setCargando(false);
    }
    verificarToken();
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault();

    if ([password, passwordConfirmar].includes("")) {
      setAlerta({
        msg: 'Completa los campos',
        error: true
      })
      return;
    }

    if (password !== passwordConfirmar) {
      setAlerta({
        msg: 'Los passwords no coinciden',
        error: true
      })
      return;
    }

    try {
      const { data } = await clienteAxios.put(`/usuarios/olvide-password/${token}`, { password });
      setAlerta({
        msg: data.msg,
        error: false
      })
      setPassword('')
      setPasswordConfirmar('')
    } catch (error) {
      setAlerta({
        msg: error.response.data.msg,
        error: true
      })
    }
  }

  const { msg } = alerta;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center min-h-[calc(100vh-200px)]">
      {/* Left Side - Information */}
      <div className="space-y-8">
        <div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Crea tu nueva contraseña
          </h1>
          <p className="text-xl text-gray-600">
            Establece una contraseña segura para proteger tu cuenta. Asegúrate de
            que sea única y fácil de recordar para ti.
          </p>
        </div>
        {/* Password Requirements */}
        <div className="space-y-6">
          <h3 className="text-lg font-semibold text-gray-900">
            Requisitos de seguridad:
          </h3>
          <div className="space-y-4">
            <div className="flex items-start space-x-4" id="lengthReq">
              <div className="flex-shrink-0">
                <div className="w-6 h-6 bg-gray-200 rounded-full flex items-center justify-center">
                  <svg
                    className="w-4 h-4 text-gray-400 check-icon hidden"
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
              </div>
              <div>
                <p className="text-gray-600">Al menos 8 caracteres de longitud</p>
              </div>
            </div>
            <div className="flex items-start space-x-4" id="uppercaseReq">
              <div className="flex-shrink-0">
                <div className="w-6 h-6 bg-gray-200 rounded-full flex items-center justify-center">
                  <svg
                    className="w-4 h-4 text-gray-400 check-icon hidden"
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
              </div>
              <div>
                <p className="text-gray-600">Al menos una letra mayúscula (A-Z)</p>
              </div>
            </div>
            <div className="flex items-start space-x-4" id="lowercaseReq">
              <div className="flex-shrink-0">
                <div className="w-6 h-6 bg-gray-200 rounded-full flex items-center justify-center">
                  <svg
                    className="w-4 h-4 text-gray-400 check-icon hidden"
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
              </div>
              <div>
                <p className="text-gray-600">Al menos una letra minúscula (a-z)</p>
              </div>
            </div>
            <div className="flex items-start space-x-4" id="numberReq">
              <div className="flex-shrink-0">
                <div className="w-6 h-6 bg-gray-200 rounded-full flex items-center justify-center">
                  <svg
                    className="w-4 h-4 text-gray-400 check-icon hidden"
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
              </div>
              <div>
                <p className="text-gray-600">Al menos un número (0-9)</p>
              </div>
            </div>
            <div className="flex items-start space-x-4" id="specialReq">
              <div className="flex-shrink-0">
                <div className="w-6 h-6 bg-gray-200 rounded-full flex items-center justify-center">
                  <svg
                    className="w-4 h-4 text-gray-400 check-icon hidden"
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
              </div>
              <div>
                <p className="text-gray-600">
                  Al menos un carácter especial (!@#$%^&amp;*)
                </p>
              </div>
            </div>
          </div>
        </div>

      </div>
      {/* Right Side - Password Form */}
      <div className="bg-white rounded-lg shadow-lg border border-gray-200 p-8">
        {/* Form State */}
        <div id="formState">
          {!cargando && (
            <>
              <div className="text-center mb-8">
                {confirmar ? (
                  <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-green-100 mb-4">
                    <svg
                      className="h-8 w-8 text-green-600"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-3.586l4.293-4.293a1 1 0 011.414 0L9 12.414V11a6 6 0 017-5.937V5z"
                      ></path>
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
                <h2 className="text-2xl font-bold text-gray-900 mb-2">
                  Recupera tu cuenta
                </h2>
                <p className="text-gray-600">
                  {confirmar ? 'Crea una contraseña segura para tu cuenta' : 'Hubo un error en el enlace'}
                </p>
              </div>

              {confirmar && (
                <form id="passwordForm" className="space-y-6" onSubmit={handleSubmit}>
                  {/* New Password */}
                  <div>
                    <label
                      htmlFor="password"
                      className="block text-sm font-medium text-gray-700 mb-2"
                    >
                      Nueva contraseña
                    </label>
                    <div className="relative">
                      <input
                        type="password"
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                        id="password"
                        name="password"
                        className="w-full pr-12 pl-3 py-3 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-base"
                        placeholder="Ingresa tu nueva contraseña"
                      />
                      <button
                        type="button"
                        id="togglePassword"
                        className="absolute inset-y-0 right-0 pr-3 flex items-center"
                      >
                        <svg
                          id="eyeOpen"
                          className="h-5 w-5 text-gray-400 hover:text-gray-600"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                          />
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                          ></path>
                        </svg>
                      </button>
                    </div>

                  </div>
                  {/* Confirm Password */}
                  <div>
                    <label
                      htmlFor="confirmPassword"
                      className="block text-sm font-medium text-gray-700 mb-2"
                    >
                      Confirmar contraseña
                    </label>
                    <div className="relative">
                      <input
                        type="password"
                        value={passwordConfirmar}
                        onChange={e => setPasswordConfirmar(e.target.value)}
                        id="confirmPassword"
                        name="confirmPassword"
                        className="w-full pr-12 pl-3 py-3 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-base"
                        placeholder="Confirma tu nueva contraseña"
                      />
                      <button
                        type="button"
                        id="toggleConfirmPassword"
                        className="absolute inset-y-0 right-0 pr-3 flex items-center"
                      >
                        <svg
                          id="eyeOpen2"
                          className="h-5 w-5 text-gray-400 hover:text-gray-600"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                          />
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                          ></path>
                        </svg>
                        <svg
                          id="eyeClosed2"
                          className="hidden h-5 w-5 text-gray-400 hover:text-gray-600"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L21 21"
                          ></path>
                        </svg>
                      </button>
                    </div>

                  </div>
                  <button
                    type="submit"
                    id="submitBtn"
                    className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    disabled=""
                  >
                    <span id="submitBtnText">Establecer nueva contraseña</span>
                    <svg
                      id="submitLoadingIcon"
                      className="hidden animate-spin -mr-1 ml-3 h-5 w-5 text-white"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx={12}
                        cy={12}
                        r={10}
                        stroke="currentColor"
                        strokeWidth={4}
                      />
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                  </button>
                  {/* Message */}
                  {msg && <Alerta alerta={alerta} />}
                </form>
              )}

            </>

          )}
        </div>
      </div>
    </div>

  )
}

export default CambiarPassword