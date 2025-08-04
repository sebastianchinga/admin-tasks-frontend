import { createContext, useEffect, useState } from "react";
import useAuth from "../hooks/useAuth";
import clienteAxios from "../config/axios";

const TareaContext = createContext();

export const TareaProvider = ({ children }) => {
    // States
    const [tareas, setTareas] = useState([]);
    const [tarea, setTarea] = useState({});
    const [filtro, setFiltro] = useState('');
    // Custom hook (Context auth)
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

    // Crear/editar una tarea
    const guardarTarea = async (tarea) => {
        // Obtener token
        const token = localStorage.getItem('token');
        // Si no hay token, deten la ejecucion
        if (!token) return;
        // Crear objeto de configuracion que tendrá el token
        const config = {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            }
        }
        // Si hay un id en tarea
        if (tarea.id) {
            // Actualiza la tarea
            try {
                const { data } = await clienteAxios.put(`/tareas/${tarea.id}`, tarea, config);
                setTareas(prew => prew.map(task => task.id === data.id ? data : task));
            } catch (error) {
                console.log(error);
            }
        } else {
            // Crea una nueva tarea
            try {
                const { data } = await clienteAxios.post('/tareas/', tarea, config);
                setTareas([data, ...tareas]);
            } catch (error) {
                console.log(error);
            }
        }


    }

    return (
        <TareaContext.Provider value={{
            tareas,
            tarea,
            filtro,
            setFiltro,
            cambiarEstado,
            guardarTarea,
            setTarea
        }}>
            {children}
        </TareaContext.Provider>
    )
}

export default TareaContext;