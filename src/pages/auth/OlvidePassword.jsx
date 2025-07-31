import { useState } from "react"
import clienteAxios from "../../config/axios";
import Alerta from "../../components/Alerta";

const OlvidePassword = () => {

  const [email, setEmail] = useState('');
  const [alerta, setAlerta] = useState({});

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (email.trim() === '') {
      setAlerta({
        msg: 'Completa los campos',
        error: true
      })
      return;
    }

    try {
      const { data } = await clienteAxios.post('/usuarios/olvide-password', { email });
      setAlerta({
        msg: data.msg
      })
      setEmail('')
    } catch (error) {
      setAlerta({
        msg: error.response.data.msg,
        error: true
      })
    }
  }
  const { msg } = alerta
  return (
    <>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center min-h-[calc(100vh-200px)]">
        {/* Left Side - Information */}
        <div className="space-y-8">
          <div>
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              ¿Olvidaste tu contraseña?
            </h1>
            <p className="text-xl text-gray-600">
              No te preocupes, te ayudamos a recuperar el acceso a tu cuenta de manera
              segura.
            </p>
          </div>
          {/* Process Steps */}
          <div className="space-y-6">
            <div className="flex items-start space-x-4">
              <div className="flex-shrink-0">
                <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                  <span className="text-sm font-semibold text-blue-600">1</span>
                </div>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900">
                  Ingresa tu email
                </h3>
                <p className="text-gray-600">
                  Proporciona la dirección de correo asociada a tu cuenta
                </p>
              </div>
            </div>
            <div className="flex items-start space-x-4">
              <div className="flex-shrink-0">
                <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                  <span className="text-sm font-semibold text-blue-600">2</span>
                </div>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900">
                  Revisa tu bandeja
                </h3>
                <p className="text-gray-600">
                  Te enviaremos un enlace seguro para restablecer tu contraseña
                </p>
              </div>
            </div>
            <div className="flex items-start space-x-4">
              <div className="flex-shrink-0">
                <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                  <span className="text-sm font-semibold text-blue-600">3</span>
                </div>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900">
                  Crea nueva contraseña
                </h3>
                <p className="text-gray-600">
                  Sigue el enlace y establece una nueva contraseña segura
                </p>
              </div>
            </div>
            <div className="flex items-start space-x-4">
              <div className="flex-shrink-0">
                <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                  <svg
                    className="w-5 h-5 text-green-600"
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
                <h3 className="text-lg font-semibold text-gray-900">
                  ¡Listo para continuar!
                </h3>
                <p className="text-gray-600">
                  Accede nuevamente a tu cuenta con tu nueva contraseña
                </p>
              </div>
            </div>
          </div>

        </div>
        {/* Right Side - Reset Form */}
        <div className="bg-white rounded-lg shadow-lg border border-gray-200 p-8">

          {/* Form State (Default) */}
          <div id="formState">
            <div className="text-center mb-8">
              <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-blue-100 mb-4">
                <svg
                  className="h-8 w-8 text-blue-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"
                  ></path>
                </svg>
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                Recuperar contraseña
              </h2>
              <p className="text-gray-600">
                Ingresa tu correo electrónico para recibir las instrucciones
              </p>
            </div>
            <form id="resetForm" className="space-y-6" onSubmit={handleSubmit}>
              {/* Email Field */}
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Correo electrónico
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  id="email"
                  name="email"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="tu@email.com"
                />
                <p className="mt-1 text-sm text-gray-500">
                  Debe ser el mismo correo que usaste para registrarte
                </p>
              </div>
              {/* Submit Button */}
              <button
                type="submit"
                id="resetBtn"
                className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <span id="resetBtnText">Enviar instrucciones</span>
                <svg
                  id="loadingIcon"
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
              {/* Error Message */}
              {msg && <Alerta alerta={alerta} />}
              {/* Back to Login */}
              <div className="text-center">
                <p className="text-sm text-gray-600">
                  ¿Recordaste tu contraseña?
                  <a
                    href="login.html"
                    className="font-medium text-blue-600 hover:text-blue-500 underline"
                  >
                    Volver al inicio de sesión
                  </a>
                </p>
              </div>
            </form>

          </div>
        </div>
      </div>

    </>
  )
}

export default OlvidePassword