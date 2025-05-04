export const downloadFile = (fileName: string, fileData: string) => {
    const link = document.createElement('a');
    link.href = fileData;
    link.download = fileName;
    link.click();
}