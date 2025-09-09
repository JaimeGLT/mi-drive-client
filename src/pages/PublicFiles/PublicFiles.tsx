import { useEffect, useState } from "react";
import { useGet } from "../../hooks/useGet";
import PageComponent from "../../components/PageComponent";
import FileCard from "../../components/FileCard";
import NoElements from "../../components/NoElements";
import { Rss } from "lucide-react";
import NavBar from "../../components/NavBar";

const PublicFiles = () => {

    const { getRequest, response, loading } = useGet();
    const [searchTerm, setSearchTerm] = useState("");
    
    useEffect(() => {
        getRequest("/file/public-files")
    }, [])

    const filteredFiles = response.filter((item: any) =>
        item.originalName.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <>
        <NavBar title="Documentos públicos" searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
        <PageComponent title="Documentos públicos" elements={response.length}>
            <div className="w-full grid grid-cols-[repeat(auto-fit,minmax(180px,1fr))] gap-4">
                {
                     loading ? <p>Cargando documentos...</p>
                    : !response.length ? <NoElements IconElement={Rss} message="Aún no hay documentos públicos..."/>
                    :
                    filteredFiles.map(item => (
                        <FileCard 
                            id={item?.id}
                            key={item?.id}
                            name={item?.originalName}
                            date={item?.updatedAt ? item?.updatedAt : item?.createdAt}
                            extension={item?.mimeType}
                            s3Key={item?.s3Key}
                            size={item?.size}
                            visibility={item?.visibility}
                        />
                    ))
                }
            </div>
        </PageComponent>
        </>
    )
}

export default PublicFiles;