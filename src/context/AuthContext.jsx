import { createContext, useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom'
import clienteAxios from "../config/axios";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {

    const navigate = useNavigate();
    const [auth, setAuth] = useState({});
    const [cargando, setCargando] = useState(true);

    useEffect(() => {
        const autenticar = async () => {
            const token = localStorage.getItem('token');
            if (!token) {
                setCargando(false);
            }

            const config = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                }
            }

            try {
                const { data } = await clienteAxios.get('/usuarios/perfil', config);
                setAuth(data);
            } catch (error) {
                setAuth({});
            }

            setCargando(false);
        }
        autenticar();
    }, [])

    const cerrarSesion = () => {
        localStorage.removeItem('token');
        navigate('/');
    }

    return (
        <AuthContext.Provider value={{
            auth,
            cargando,
            setAuth,
            cerrarSesion
        }}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContext;