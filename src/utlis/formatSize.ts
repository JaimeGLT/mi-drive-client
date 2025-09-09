export const formatSize = (size: bigint): string => {
  const bytes = Number(size); 
  return (bytes / (1024 * 1024)).toFixed(2) + " MB";
};
