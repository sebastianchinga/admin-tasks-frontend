import { BrowserRouter, Route, Routes } from "react-router-dom"
import HomeLayout from "./layout/HomeLayout"
import Home from "./pages/Home"
import Registro from "./pages/auth/Registro"
import Login from "./pages/auth/Login"
import OlvidePassword from "./pages/auth/OlvidePassword"

// import {} from ''
function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomeLayout />}>
            <Route index element={<Home />} />
            <Route path="registrar" element={<Registro />} />
            <Route path="login" element={<Login />} />
            <Route path="olvide-password" element={<OlvidePassword />} />
          </Route>

          <Route>

          </Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
