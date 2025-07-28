import { useState } from "react";

const useModal = () => {
    const [modal, setModal] = useState(false);

    const abrirModal = () => {
        setModal(true);
        document.body.style.overflow = 'hidden'
    }

    const cerrarModal = () => {
        setModal(false);
        document.body.style.overflow = 'auto'
    }
    return {
        abrirModal,
        cerrarModal,
        modal
    }
}

export default useModal