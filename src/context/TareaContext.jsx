import { createContext, useEffect, useState } from "react";
import useAuth from "../hooks/useAuth";
import clienteAxios from "../config/axios";

const TareaContext = createContext();

export const TareaProvider = ({ children }) => {

    const [tareas, setTareas] = useState([]);
    const [filtro, setFiltro] = useState('');
    const { auth } = useAuth();

    useEffect(() => {
        const obtenerTareas = async () => {
            try {
                const token = localStorage.getItem('token');
                if (!token) return;
                const config = {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`
                    }
                }

                const { data } = await clienteAxios.get('/tareas/', config);
                setTareas(data);
            } catch (error) {
                setTareas([]);
            }
        }

        obtenerTareas();
    }, [auth])

    useEffect(() => {
        const filtrarTareas = async () => {
            // Obtener token
            const token = localStorage.getItem('token');
            if (!token) return;
            const config = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                }
            }

            if (filtro == '1') {
                try {
                    const { data } = await clienteAxios.get(`/tareas/filtrar/${filtro}`, config);
                    setTareas(data)
                } catch (error) {
                    setTareas([])
                }
            } else if (filtro == '0') {
                try {
                    const { data } = await clienteAxios.get(`/tareas/filtrar/${filtro}`, config);
                    setTareas(data)
                } catch (error) {
                    setTareas([])
                }
            } else {
                try {
                    const { data } = await clienteAxios.get('/tareas', config);
                    setTareas(data);
                } catch (error) {
                    setTareas([]);
                }
            }
        }

        filtrarTareas()
    }, [filtro])

    const cambiarEstado = async (tarea) => {
        const { id } = tarea
        const token = localStorage.getItem('token');
        if (!token) return;
        const config = {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            }
        }

        try {
            const { data } = await clienteAxios.put(`/tareas/cambiar-estado/${id}`, { tarea }, config);
            setTareas(prew => prew.map(tareaPrevia => tareaPrevia.id === data.id ? data : tareaPrevia))
        } catch (error) {
            console.log(error);
        }
    }

    const guardarTarea = async (tarea) => {
        const token = localStorage.getItem('token');
        if (!token) return;
        const config = {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            }
        }

        try {
            const { data } = await clienteAxios.post('/tareas/', tarea, config);
            setTareas([data, ...tareas]);
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <TareaContext.Provider value={{
            tareas,
            filtro,
            setFiltro,
            cambiarEstado,
            guardarTarea
        }}>
            {children}
        </TareaContext.Provider>
    )
}

export default TareaContext;