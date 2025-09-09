import { useEffect, useState } from "react";
import { useGet } from "../../hooks/useGet";
import PageComponent from "../../components/PageComponent";
import FileCard from "../../components/FileCard";
import axiosClient from "../../utlis/axiosCustom";
import toast from "react-hot-toast";
import NoElements from "../../components/NoElements";
import { Crown } from "lucide-react";
import NavBar from "../../components/NavBar";

const DestacadoPage = () => {

    const { getRequest, response, loading } = useGet();
    const [searchTerm, setSearchTerm] = useState("");
    
    useEffect(() => {
        getRequest("/favorites")
    }, [])

    const refreshFiles = () => {
        getRequest("/favorites");
    };

    const onDelete = async (id: string) => {
        try {
            await axiosClient.delete("/favorites/"+id);
            refreshFiles();
            toast.success("Archivo eliminado con éxito")
        } catch (error) {
            toast.error("Error al eliminar el archivo")
            
        }
    }
    const filteredFiles = response.filter((item: any) =>
        item.originalName.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <>
            <NavBar title="Destacados" searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
            <PageComponent title="Destacados" elements={response.length}>
                <div className="w-full grid grid-cols-[repeat(auto-fit,minmax(180px,1fr))] gap-4">
                    {
                        loading ? <p>Cargando documentos...</p>
                        : !response.length ? <NoElements IconElement={Crown} message="Todavía no se han añadido archivos..."/>
                        : filteredFiles.map(item => (
                            <FileCard 
                                id={item?.id}
                                key={item?.id}
                                name={item?.originalName}
                                date={item?.updatedAt ? item?.updatedAt : item?.createdAt}
                                extension={item?.mimeType}
                                s3Key={item?.s3Key}
                                size={item?.size}
                                visibility={item?.visibility}
                                onDelete={onDelete}
                                onUpdate={refreshFiles}
                            />
                        ))
                    }
                </div>
            </PageComponent>
        </>
    )
}

export default DestacadoPage;