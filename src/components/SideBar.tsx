import { Clock, Folder, Globe, Star } from "lucide-react"
import { useLocation, useNavigate } from "react-router-dom"
import LogoIcon from "../assets/LogIcon"
import toast from "react-hot-toast";

const SideBar = () => {
    const { pathname } = useLocation();
    const navigate = useNavigate();
    
    const token = localStorage.getItem("token");

  return (
    <div className='w-[25%] border-r-[0.25px] sticky max-w-64 border-r-gray-300 text-sm text-[#737373] font-semibold h-screen min-w-[180px]'>   
        
        {/* Header con logo y nombre de la app */}
        <div className="flex items-center justify-center gap-3 mt-3 mb-2">
            <LogoIcon className="h-20 w-20" />
            {/* <h1 className="text-lg font-bold text-[#0288D1]">Mi Drive</h1> */}
        </div>

        <div className={`${pathname == "/mi-drive" ? "bg-[#00b0c3] text-white" : ""} flex items-center px-2 py-1.5 rounded-md gap-4 hover:text-white hover:bg-[#00b0c3] cursor-pointer mt-4 mx-2`}
            onClick={() => {!token ? toast.error("Primero debes iniciar sesión") : navigate("/mi-drive")}}
        >
            <Folder className="h-[1rem] w-[1rem] "/>
            <h3>Mi Drive</h3>
        </div>
        <div className={`${pathname == "/recientes" ? "bg-[#00b0c3] text-white" : ""} flex items-center px-2 py-1.5 rounded-md gap-4 hover:text-white hover:bg-[#00b0c3] cursor-pointer my-2 mx-2`}
            onClick={() => {!token ? toast.error("Primero debes iniciar sesión") :navigate("/recientes")}}
        >
            <Clock className="h-[1rem] w-[1rem] "/>
            <h3>Recientes</h3>
        </div>
        <div className={`${pathname == "/destacados" ? "bg-[#00b0c3] text-white" : ""} flex items-center px-2 py-1.5 rounded-md gap-4 hover:text-white hover:bg-[#00b0c3] cursor-pointer my-2 mx-2`}
            onClick={() => {!token ? toast.error("Primero debes iniciar sesión") :navigate("/destacados")}}
        >
            <Star className="h-[1rem] w-[1rem] "/>
            <h3>Destacados</h3>
        </div>
        <div className={`${pathname == "/" ? "bg-[#00b0c3] text-white" : ""} flex items-center px-2 py-1.5 rounded-md gap-4 hover:text-white hover:bg-[#00b0c3] cursor-pointer my-2 mx-2`}
            onClick={() => navigate("/")}
        >
            <Globe className="h-[1rem] w-[1rem] "/>
            <h3>Documentos públicos</h3>
        </div>
    </div>
  )
}

export default SideBar