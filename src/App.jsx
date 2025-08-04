import { BrowserRouter, Route, Routes } from "react-router-dom"
import HomeLayout from "./layout/HomeLayout"
import Home from "./pages/Home"
import Registro from "./pages/auth/Registro"
import Login from "./pages/auth/Login"
import OlvidePassword from "./pages/auth/OlvidePassword"
import AdminLayout from "./layout/AdminLayout"
import Admin from "./pages/admin/Admin"
import { AuthProvider } from "./context/AuthContext"
import { TareaProvider } from "./context/TareaContext"
import ConfirmarCuenta from "./pages/auth/ConfirmarCuenta"
import CambiarPassword from "./pages/auth/CambiarPassword"
import Perfil from "./pages/profile/Perfil"

// import {} from ''
function App() {

  return (
    <>
      <BrowserRouter>
        <AuthProvider>
          <TareaProvider>
            <Routes>
              <Route path="/" element={<HomeLayout />}>
                <Route index element={<Home />} />
                <Route path="registrar" element={<Registro />} />
                <Route path="login" element={<Login />} />
                <Route path="olvide-password" element={<OlvidePassword />} />
                <Route path="confirmar-cuenta/:token" element={<ConfirmarCuenta />} />
                <Route path="olvide-password/:token" element={<CambiarPassword />} />
              </Route>

              <Route path="home" element={<AdminLayout />}>
                <Route index element={<Admin />} />
              </Route>

              <Route path="perfil" element={<AdminLayout />}>
                <Route index element={<Perfil />} />
              </Route>
            </Routes>
          </TareaProvider>
        </AuthProvider>
      </BrowserRouter>
    </>
  )
}

export default App
