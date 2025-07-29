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
            if (filtro == '1') {
                console.log('Mostrando las tareas completadas');
            } else if (filtro == '0') {
                console.log('Mostrando las tareas pendientes');
            } else {
                console.log('Mostrando todas las tareas');
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
        if (tarea.id) {
            console.log('Editando');
        } else {
            console.log('Guardando tarea');
            
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