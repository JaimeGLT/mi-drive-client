import { Download, EllipsisVertical, Globe, LockKeyhole, SquarePen, Star, Trash2, X } from "lucide-react";
import { formatSize } from "../utlis/formatSize";
import { formatRelativeTime } from "../utlis/formatTime";
import { useState, useRef, useEffect } from "react";
import { useUpdate } from "../hooks/userUpdate";
import toast from "react-hot-toast";
import { useLocation } from "react-router-dom";
import axiosClient from "../utlis/axiosCustom";
import { getPrettyIcon } from "../utlis/fileIcon";

interface fileCard {
  name: string;
  date: string;
  size: bigint;
  id: string;
  s3Key: string;
  extension: string;
  visibility?: any;
  onUpdate?: any;
  onDelete?: any;
}

const FileCard = ({ name, date, size, id, extension, visibility, onUpdate, onDelete }: fileCard) => {
    const sizeFormated = formatSize(size);
    const formatedTime = formatRelativeTime(date);
    const nameTooLong = name.length > 20 ? name.slice(0, 20) + "..." : name;
    
    const [isOpenMenu, setIsOpenMenu] = useState<boolean>(false);
    const [isOpenEdit, setIsOpenEdit] = useState<boolean>(false);
    const [editName, setEditName] = useState<string>(name);
    const [editVisibility, setEditVisibility] = useState<string>(visibility);
    const menuRef = useRef<HTMLDivElement>(null);

    const { error, loading, updateRequest } = useUpdate();

    const { pathname } = useLocation();
    const token = localStorage.getItem("token");

    // Cerrar menú si se hace clic fuera
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
        if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
            setIsOpenMenu(false);
        }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const handleEditSubmit = async () => {
        try {
            const requestData = {
                originalName: editName,
                visibility: editVisibility
            };
            
            const response = await updateRequest("/file/update/" + id, requestData);
            
            if (response) {
                // Cerrar el modal y el menú
                onUpdate();
                setIsOpenEdit(false);
                setIsOpenMenu(false);
                toast.success("Archivo actualizado correctamente");
            }
        } catch (error) {
            console.log("Error al actualizar:", error);
        }
    };

    const handleEditCancel = () => {
        // Restaurar valores originales
        setEditName(name);
        setEditVisibility(visibility);
        setIsOpenEdit(false);
    };

    const handleDownload = async () => {
        try {
            const response = await axiosClient.get(`/file/download/${id}`, {
            responseType: 'blob', 
            });

            // Crear un objeto blob y link para descargar
            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', name); 
            document.body.appendChild(link);
            link.click();
            link.remove();

            toast.success("Descarga iniciada");
            setIsOpenMenu(false);
        } catch (error) {
            console.error(error);
            toast.error("Ocurrió un problema al descargar el archivo");
        }
    };


    const handleDestacado = async () => {
        try {
            await axiosClient.post("/favorites/"+id);
            toast.success("Archivo añadido correctamente");
        } catch (error) {
            toast.error("Error al añadir el archivo")
            
        }
    }

    return (
        <>
            <div className="relative flex flex-col gap-2 border-[0.25px] border-gray-300 rounded-xl max-w-48 p-5 px-4 items-center group hover:shadow-lg">
                <div className="flex flex-col justify-center items-center w-full gap-2">
                    { visibility == "PUBLIC" ?   
                        <span className="absolute left-2 top-2 flex items-center gap-1 text-[10px] bg-[#E6F7F9] text-[#00b0c3] font-medium px-2 py-0.5 rounded-full shadow-sm">
                            <Globe className="h-[10px] w-[10px]"/> Público
                        </span>
                    :
                        <span className="absolute left-2 top-2 flex items-center gap-1 text-[10px] bg-gray-700 text-white font-medium px-2 py-0.5 rounded-full shadow-sm">
                            <LockKeyhole className="h-[10px] w-[10px]"/> Privado
                        </span>
                    }
                    <p className="text-[#1534e4] pt-4">{getPrettyIcon(extension, name)}</p>
                    <p className="text-[#737373] font-semibold text-sm">{nameTooLong}</p>
                </div>

                <div className="flex flex-row justify-between items-center mb-6 w-full">
                    <p className="text-xs text-center text-[#737373]">{formatedTime}</p>
                    <p className="text-xs text-center bg-[#141212] font-medium text-white px-2 py-1 rounded">{sizeFormated}</p>
                </div>

                {/* Botón de menú */}
                <div
                    className="mb-4 cursor-pointer hover:text-white hover:bg-[#141212] opacity-0 group-hover:opacity-100 transition-opacity duration-200 border-[0.25px] rounded w-8 h-7 flex justify-center items-center relative"
                    onClick={() => setIsOpenMenu(!isOpenMenu)}
                >
                    <EllipsisVertical className="h-5 w-5" />

                    
                    {isOpenMenu && (
                    <div
                        ref={menuRef}
                        className="absolute right-0 top-full mt-2 w-36 bg-white border-[0.25px] border-gray-300 rounded shadow-lg flex flex-col z-50"
                    >
                        {
                            (pathname != "/" && pathname != "/destacados") &&
                            <button 
                                className="flex gap-3 rounded mt-1 mx-1 items-center justify-start text-left text-sm px-4 py-2 hover:bg-[#141212] hover:text-white text-black"
                                onClick={() => {
                                    setIsOpenEdit(true);
                                    setIsOpenMenu(false);
                                }}
                            >
                                <SquarePen className="w-[0.875rem] h-[0.875rem]"/>Editar
                            </button>
                        }
                        <button className="flex gap-3 rounded mt-1 mx-1 items-center justify-start text-left text-sm px-4 py-2 hover:bg-[#141212] hover:text-white text-black"
                            onClick={() => {
                                handleDownload();
                                setIsOpenMenu(false);
                            }}
                        >
                            <Download className="w-[0.875rem] h-[0.875rem]"/>Descargar
                        </button>
                        {
                        (pathname != "/destacados" && pathname != "/mi-drive" && pathname != "/recientes") &&
                        <button className="flex gap-3 rounded mx-1 items-center justify-start text-left text-sm px-4 py-2 hover:bg-[#141212] hover:text-white text-black"
                            onClick={() => {
                                !token ? toast.error("Primero debes iniciar sesión") :
                               handleDestacado();
                                setIsOpenMenu(false);
                            }}
                        >
                            <Star className="w-[0.875rem] h-[0.875rem]"/> Destacar
                        </button>
                        }
                        {
                            (pathname != "/" && pathname != "/recientes") &&
                            <>
                                <hr className="text-gray-300"/>
                                <button className="flex gap-3 rounded mx-1 mb-1 items-center justify-start text-left text-sm px-4 py-2 font-semibold hover:bg-[#141212] text-red-600 hover:text-white"
                                    onClick={() => onDelete(id)}
                                >
                                    <Trash2 className="w-[0.875rem] h-[0.875rem]"/> Eliminar
                                </button>
                            </>

                        }
                    </div>
                    )}
                </div>
            </div>

            {/* Modal de edición */}
            {isOpenEdit && (
                <div className="fixed inset-0 bg-black/50 z-50 flex justify-center items-center p-4">
                    <div className="bg-white rounded-lg p-6 w-full max-w-md shadow-lg relative">
                        {/* Botón cerrar */}
                        <button
                            className="absolute top-3 right-3 p-1 rounded-full hover:bg-gray-200 transition-colors"
                            onClick={handleEditCancel}
                        >
                            <X className="h-5 w-5" />
                        </button>

                        {/* Título */}
                        <h3 className="text-xl font-bold mb-6 text-gray-800">
                            Editar archivo
                        </h3>

                        {/* Formulario */}
                        <div className="space-y-4">
                            {/* Campo nombre */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Nombre del archivo
                                </label>
                                <input
                                    type="text"
                                    value={editName}
                                    onChange={(e) => setEditName(e.target.value)}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#00b0c3] focus:border-transparent"
                                    placeholder="Ingresa el nuevo nombre"
                                />
                            </div>

                            {/* Campo visibilidad */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Visibilidad
                                </label>
                                <select
                                    value={editVisibility}
                                    onChange={(e) => setEditVisibility(e.target.value)}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#00b0c3] focus:border-transparent"
                                >
                                    <option value="PRIVATE">🔒 Privado</option>
                                    <option value="PUBLIC">🌍 Público</option>
                                </select>
                                <p className="text-xs text-gray-500 mt-1">
                                    {editVisibility === 'PUBLIC' 
                                        ? 'Cualquier persona puede ver este archivo' 
                                        : 'Solo tú puedes ver este archivo'
                                    }
                                </p>
                            </div>
                        </div>

                        {/* Botones */}
                        <div className="flex gap-3 mt-6 justify-end">
                            <button
                                onClick={handleEditCancel}
                                className="px-4 py-2 text-gray-600 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
                                disabled={loading}
                            >
                                Cancelar
                            </button>
                            <button
                                onClick={handleEditSubmit}
                                disabled={loading || !editName.trim()}
                                className="px-4 py-2 bg-[#00b0c3] text-white rounded-md hover:bg-[#009bb0] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {loading ? 'Guardando...' : 'Guardar cambios'}
                            </button>
                        </div>

                        {/* Error message */}
                        {error && (
                            <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-md">
                                <p className="text-sm text-red-600">
                                    Error al actualizar el archivo. Inténtalo de nuevo.
                                </p>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </>
    );
};

export default FileCard;