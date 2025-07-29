import { useContext } from "react";
import TareaContext from "../context/TareaContext";

const useTarea = () => useContext(TareaContext);

export default useTarea;