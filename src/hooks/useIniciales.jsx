const useIniciales = () => {
    const obtenerIniciales = (nombre) => {
        const resultado = nombre.split(" ");
        const iniciales = [];
        for (let index = 0; index < resultado.length; index++) {
            iniciales.push(resultado[index].charAt(0));
        }
        return iniciales.join("")
    }

    return {
        obtenerIniciales
    }
}

export default useIniciales