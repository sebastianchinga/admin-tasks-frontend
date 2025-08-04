import { useState } from "react";

const useModalPerfil = () => {

    
    const [modalPerfil, setModalPerfil] = useState(false);

    const mostrarPerfil = () => {
        setModalPerfil(true);
        document.body.style.overflow = 'hidden';
    }

    const cerrarModalPerfil = () => {
        setModalPerfil(false);
        document.body.style.overflow = 'auto';
    }

    

    return {
        modalPerfil,
        cerrarModalPerfil,
        mostrarPerfil
    }
}

export default useModalPerfil