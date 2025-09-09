import { LogOut, Search, Upload, User, X } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";
import { uploadFileService } from "../services/uploadFileService";

interface UploadItem {
  file: File;
  uploading: boolean;
  progress: number;
}

interface navBarProps {
  title: string;
  searchTerm: string;
  setSearchTerm: (term: string) => void;
}

const NavBar = ({title, searchTerm, setSearchTerm}: navBarProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [uploads, setUploads] = useState<UploadItem[]>([]);
  const [ isProfileModalActive, setIsProfileModalActive ] = useState(false);

  // Maneja selección de archivos
  const handleFileSelect = (files: FileList | File[]) => {
    const selectedFiles = Array.from(files);
    const newUploads = selectedFiles.map((file) => ({
      file,
      uploading: true,
      progress: 0,
    }));
    setUploads((prev) => [...prev, ...newUploads]);
    newUploads.forEach((item) => uploadFile(item));
  };

  // Subida de archivo individual
  const uploadFile = async (item: UploadItem) => {
    const formData = new FormData();
    formData.append("file", item.file);

    try {
      await uploadFileService(item.file);
      location.reload();
      toast.success(`Archivo "${item.file.name}" subido correctamente`);
    } catch (error) {
      toast.error(`Error al subir "${item.file.name}"`);
    } finally {
      // Quitar el archivo de la lista de uploads
      setUploads((prev) => prev.filter((u) => u.file !== item.file));
    }
  };


  // Drag & drop
  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    handleFileSelect(e.dataTransfer.files);
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  const token = localStorage.getItem("token");
  let payload = null;
  if(token) {
    const payloadBase64 = token?.split('.')[1];
    const payloadJson = atob(payloadBase64);
    payload = JSON.parse(payloadJson);
  }
  
  return (
    <nav className="bg-white border-b border-gray-200 w-full">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex h-16 items-center">
  
        <div className="min-w-[22%] font-bold text-[#737373] text-xl">{title}</div>


        <div className="hidden md:flex w-full mx-2 mr-5 items-center rounded-lg border-none focus-within:outline-1 focus-within:outline-[#00b0c3] shadow-sm p-1 px-3 text-sm">
          <Search className="h-4 w-4" />
          <input
            type="search"
            placeholder="Buscar archivos"
            className="w-full px-2 py-1 focus:outline-none"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        {/* Botones */}
        <div className="md:flex gap-5 hidden items-center">
          <div
            className="flex items-center bg-[#00b0c3] font-semibold text-white p-1 px-4 gap-2 rounded-md cursor-pointer"
            onClick={() => {!token ? toast.error("Debes iniciar sesión") : setIsOpen(true)}}
          >
            <Upload className="h-4 w-4" strokeWidth={3} />
            <span>Subir</span>
          </div>
          <div className="relative">
  <div
    className="flex items-center justify-center border-[0.25px] border-gray-300 px-3 py-2 rounded-md cursor-pointer hover:bg-black hover:text-white transition-colors"
    onClick={() => setIsProfileModalActive(!isProfileModalActive)}
  >
    <User className="h-4 w-4" />
  </div>

      {(isProfileModalActive) && (
        <div
          className="absolute left-1/2 transform -translate-x-1/2 mt-2 w-30  bg-white border border-gray-200 rounded-md shadow-lg z-50"
        >
          {
            localStorage.getItem("token") != null ?
            <>
              <div className="px-4 py-2 text-gray-700 font-semibold text-sm">
                {payload.sub}
              </div>
              <hr />
              <button
                className="w-full flex items-center gap-2 px-4 py-2 text-gray-700 hover:bg-gray-100 text-xs"
                onClick={() => {
                  localStorage.removeItem("token"); 
                  window.location.href = "/login"; 
                }}
              >
                <LogOut className="h-4 w-4" />
                Cerrar sesión
              </button>
            </> :
            <>
              <button
                className="w-full flex items-center gap-2 px-4 py-2 text-gray-700 hover:bg-gray-100 text-xs"
                onClick={() => {
                  window.location.href = "/login"; 
                }}
              >
                <LogOut className="h-4 w-4" />
                Iniciar sesión
              </button>
            </>
          }
        </div>
      )}
    </div>

        </div>

      </div>

      {/* Modal de subida */}
      {isOpen && (
        <div className="fixed inset-0 bg-black/50 z-50 flex justify-center items-center">
          <div className="bg-white rounded-lg p-6 w-96 max-w-full shadow-lg relative">
            <button
              className="absolute top-2 right-2 p-1 rounded-full hover:bg-gray-200"
              onClick={() => setIsOpen(false)}
            >
              <X className="h-5 w-5" />
            </button>

            <h3 className="text-lg font-bold mb-2 text-left text-gray-700">
              Subir archivos
            </h3>
            <p className="mb-4 text-sm text-gray-500 text-left">
              Arrastra y suelta archivos aquí o haz clic para seleccionar
            </p>

            {/* Dropzone */}
            <div
              className="border-2 border-dashed border-gray-400 rounded-lg p-6 hover:border-[#00b0c3] transition-colors cursor-pointer min-h-[150px] flex flex-col justify-center items-center"
              onDrop={handleDrop}
              onDragOver={handleDragOver}
              onClick={() =>
                document.getElementById("fileInput")?.click()
              }
            >
              {uploads.length === 0 && (
                <>
                  <Upload className="h-12 w-12 text-gray-400 mb-2" />
                  <p className="font-semibold text-gray-600">
                    Arrastra archivos aquí
                  </p>
                  <p className="text-sm text-gray-400">
                    o haz click para seleccionar
                  </p>
                </>
              )}

              {uploads.map((item, index) => (
                <div key={index} className="w-full mt-2 text-left">
                  <p className="text-gray-700 text-sm truncate">
                    {item.file.name}
                  </p>
                  {item.uploading && (
                    <div className="h-2 bg-gray-200 rounded-full mt-1 overflow-hidden">
                      <div
                        className="h-2 bg-[#00b0c3] rounded-full"
                        style={{ width: `${item.progress}%` }}
                      />
                    </div>
                  )}
                </div>
              ))}

              <input
                id="fileInput"
                type="file"
                className="hidden"
                onChange={(e) => e.target.files && handleFileSelect(e.target.files)}
              />
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default NavBar;
