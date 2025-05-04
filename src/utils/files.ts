export const getFileExtension = (file: File): string => {
    return file.type.split('/')[1];
}