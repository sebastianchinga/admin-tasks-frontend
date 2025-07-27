import { BrowserRouter, Route, Routes } from "react-router-dom"
import HomeLayout from "./layout/HomeLayout"
import Home from "./pages/Home"
import Registro from "./pages/auth/Registro"

// import {} from ''
function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomeLayout />}>
            <Route index element={<Home />} />
            <Route path="registrar" element={<Registro />} />
          </Route>

          <Route>

          </Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
