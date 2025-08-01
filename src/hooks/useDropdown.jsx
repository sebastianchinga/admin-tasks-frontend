import { useState } from "react";

const useDropdown = () => {
    const [dropdown, setDropdown] = useState(false);

    const abrirDropdown = () => {
        setDropdown(!dropdown);
    }

    return {
        abrirDropdown,
        dropdown
    }
}

export default useDropdown