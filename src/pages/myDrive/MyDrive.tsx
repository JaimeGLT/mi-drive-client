import { useEffect, useState } from "react"
import PageComponent from "../../components/PageComponent"
import { useGet } from "../../hooks/useGet"
import { ArrowBigUpDash } from "lucide-react";
import FileCard from "../../components/FileCard";
import axiosClient from "../../utlis/axiosCustom";
import toast from "react-hot-toast";
import NoElements from "../../components/NoElements";
import NavBar from "../../components/NavBar";

const MyDrive = () => {

    const { getRequest, loading, response } = useGet();
    const [searchTerm, setSearchTerm] = useState("");

    useEffect(() => {
        getRequest("/file/my-files");
    }, [])  
    const filteredFiles = response.filter((item: any) =>
        item.originalName.toLowerCase().includes(searchTerm.toLowerCase())
    );
    const refreshFiles = () => {
        getRequest("/file/my-files");
    };

    const onDelete = async (id: string) => {
        try {
            await axiosClient.delete("/file/delete/"+id)
            refreshFiles()
            toast.success("Archivo eliminado con éxito")
        } catch (error) {
            toast.error("Hubo un error al eliminar el archivo")
        }
    }
    
    return (
    <>
      <NavBar title="Mi Drive" searchTerm={searchTerm} setSearchTerm={setSearchTerm} />

      <PageComponent title="Mi Drive" elements={filteredFiles.length}>
        {loading ? (
          <p>Cargando documentos...</p>
        ) : !filteredFiles.length ? (
          <NoElements
            IconElement={ArrowBigUpDash}
            message="No se encontraron archivos"
          />
        ) : (
          <div className="w-full grid grid-cols-[repeat(auto-fit,minmax(180px,1fr))] gap-4">
            {filteredFiles.map((item: any) => (
              <FileCard
                key={item.id}
                id={item.id}
                name={item.originalName}
                date={item.updatedAt || item.createdAt}
                extension={item.mimeType}
                s3Key={item.s3Key}
                size={item.size}
                visibility={item.visibility}
                onDelete={onDelete}
                onUpdate={refreshFiles}
              />
            ))}
          </div>
        )}
      </PageComponent>
    </>
    )
}

export default MyDrive