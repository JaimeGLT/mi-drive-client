// src/utils/getPrettyIcon.tsx
import pdfIcon from "../assets/pdf.svg";
import wordIcon from "../assets/word.svg";
import excelIcon from "../assets/excel.svg";
import powerpointIcon from "../assets/powerpoint.svg";
import imageIcon from "../assets/image.svg";
import videoIcon from "../assets/video.svg";
import audioIcon from "../assets/audio.svg";
import zipIcon from "../assets/zip.svg";
import fileIcon from "../assets/file.svg";
import creativeIcon from "../assets/creative.svg"; 

export const getPrettyIcon = (mimeType: string, fileName: string) => {
  const name = fileName.toLowerCase();

  const style = "w-10 h-10 p-1 rounded-md flex items-center justify-center";

  if (mimeType === "application/pdf" || name.endsWith(".pdf")) 
    return <div className={`${style} bg-red-100`}><img src={pdfIcon} className="w-8 h-8" /></div>;

  if (mimeType.includes("word") || name.endsWith(".doc") || name.endsWith(".docx")) 
    return <div className={`${style} bg-blue-100`}><img src={wordIcon} className="w-8 h-8" /></div>;

  if (mimeType.includes("excel") || name.endsWith(".xls") || name.endsWith(".xlsx")) 
    return <div className={`${style} bg-green-100`}><img src={excelIcon} className="w-8 h-8" /></div>;

  if (mimeType.includes("powerpoint") || name.endsWith(".ppt") || name.endsWith(".pptx")) 
    return <div className={`${style} bg-orange-100`}><img src={powerpointIcon} className="w-8 h-8" /></div>;

  if (name.endsWith(".ai") || name.endsWith(".psd") || name.endsWith(".aep") || name.endsWith(".prproj") || name.endsWith(".indd")) 
    return <div className={`${style} bg-purple-100`}><img src={creativeIcon} className="w-8 h-8" /></div>;

  // Multimedia
  if (mimeType.startsWith("image/")) 
    return <div className={`${style} bg-blue-50`}><img src={imageIcon} className="w-8 h-8" /></div>;
  if (mimeType.startsWith("video/")) 
    return <div className={`${style} bg-purple-50`}><img src={videoIcon} className="w-8 h-8" /></div>;
  if (mimeType.startsWith("audio/")) 
    return <div className={`${style} bg-green-50`}><img src={audioIcon} className="w-8 h-8" /></div>;

  if (mimeType.includes("zip") || name.endsWith(".zip") || name.endsWith(".rar")) 
    return <div className={`${style} bg-yellow-100`}><img src={zipIcon} className="w-8 h-8" /></div>;

  // Genérico
  return <div className={`${style} bg-gray-100`}><img src={fileIcon} className="w-8 h-8" /></div>;
};

