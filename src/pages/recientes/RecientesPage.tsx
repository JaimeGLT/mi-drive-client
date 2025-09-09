import { useEffect, useState } from "react";
import { useGet } from "../../hooks/useGet";
import PageComponent from "../../components/PageComponent";
import FileCard from "../../components/FileCard";
import NoElements from "../../components/NoElements";
import { ClockFading } from "lucide-react";
import NavBar from "../../components/NavBar";

interface FileItem {
    id: string;
    s3Key: string;
    originalName: string;
    mimeType: string;
    size: bigint; 
    createdAt: string;
    updatedAt: string | null;
    visibility: string;
}

interface OrganizedFiles {
    hoy: FileItem[];
    estaSemana: FileItem[];
    masDeUnaSemana: FileItem[];
    masDeUnMes: FileItem[];
    masDeUnAno: FileItem[];
}

const RecientesPage = () => {
    const { getRequest, loading, response } = useGet();
    const [searchTerm, setSearchTerm] = useState("");
    const [organizedFiles, setOrganizedFiles] = useState<OrganizedFiles>({
        hoy: [],
        estaSemana: [],
        masDeUnaSemana: [],
        masDeUnMes: [],
        masDeUnAno: []
    });

    // Función para organizar archivos por fecha
    const organizeFilesByDate = (files: FileItem[]): OrganizedFiles => {
        const now = new Date();
        const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
        const thisWeekStart = new Date(today);
        thisWeekStart.setDate(today.getDate() - today.getDay());
        const lastMonth = new Date(today);
        lastMonth.setMonth(today.getMonth() - 1);
        const lastYear = new Date(today);
        lastYear.setFullYear(today.getFullYear() - 1);

        const organized: OrganizedFiles = {
            hoy: [],
            estaSemana: [],
            masDeUnaSemana: [],
            masDeUnMes: [],
            masDeUnAno: []
        };

        files.forEach(file => {
            const fileDate = new Date(file.updatedAt || file.createdAt);

            if (fileDate >= today) {
                organized.hoy.push(file);
            } else if (fileDate >= thisWeekStart) {
                organized.estaSemana.push(file);
            } else if (fileDate >= lastMonth) {
                organized.masDeUnaSemana.push(file);
            } else if (fileDate >= lastYear) {
                organized.masDeUnMes.push(file);
            } else {
                organized.masDeUnAno.push(file);
            }
        });

        // Ordenar cada categoría por fecha (más reciente primero)
        Object.keys(organized).forEach(key => {
            organized[key as keyof OrganizedFiles].sort((a, b) => {
                const dateA = new Date(a.updatedAt || a.createdAt);
                const dateB = new Date(b.updatedAt || b.createdAt);
                return dateB.getTime() - dateA.getTime();
            });
        });

        return organized;
    };

    const refreshFiles = () => {
        getRequest("/file/recent");
    };

    useEffect(() => {
        getRequest("/file/recent");

    }, []);

    useEffect(() => {
        if (response && Array.isArray(response)) {
            const organized = organizeFilesByDate(response);
            setOrganizedFiles(organized);
        }
    }, [response])
    const filteredFiles = response.filter((item: any) =>
        item.originalName.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // Componente para renderizar una sección de archivos
    const FileSection = ({ title, files }: { title: string; files: FileItem[] }) => {
        if (files.length === 0) return null;

        return (
            <>

                <div className="mb-6">
                    <h3 className="text-lg font-medium mb-3 text-gray-700">{title}</h3>
                    <div className="grid grid-cols-[repeat(auto-fit,minmax(180px,1fr))] gap-4">
                        {filteredFiles.map((item, index) => (
                            <FileCard
                                key={index}
                                id={item.id}
                                name={item.originalName}
                                date={item.updatedAt || item.createdAt}
                                extension={item.mimeType}
                                s3Key={item.s3Key}
                                size={item.size}
                                visibility={item.visibility}
                                onUpdate={refreshFiles}
                            />
                        ))}
                    </div>
                </div>
            </>
        );
    };

    // Calcular el total de archivos
    const totalFiles = Object.values(organizedFiles).reduce(
        (total, files) => total + files.length,
        0
    );

    return (
        <>
            <NavBar title="Archivos recientes" searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
            <PageComponent title="Archivos recientes" elements={totalFiles}>
                <div className="w-full">
                    {loading ? (
                        <p className="text-center py-8">Cargando documentos...</p>
                    ) : totalFiles === 0 ? (
                        <NoElements
                            IconElement={ClockFading}
                            message="No has modificado ni subido documentos recientemente..."
                        />
                    ) : (
                        <div className="space-y-6">
                            <FileSection title="Hoy" files={organizedFiles.hoy} />
                            <FileSection title="Esta semana" files={organizedFiles.estaSemana} />
                            <FileSection title="Hace más de una semana" files={organizedFiles.masDeUnaSemana} />
                            <FileSection title="Hace más de un mes" files={organizedFiles.masDeUnMes} />
                            <FileSection title="Hace más de un año" files={organizedFiles.masDeUnAno} />
                        </div>
                    )}
                </div>
            </PageComponent>
        </>
    );
};

export default RecientesPage;
