import { Action } from "./components/action";
import { Render } from "./components/render";
import { ResponseCard } from "./components/response";
import { ApplicationPDF } from "./files/pdf";
import { ImagePNG } from "./files/png";
import { downloadFile } from "./utils/download";


export const ACTIONS: Record<string, Action[]> = {
    'pdf': [
        new Action('pdf-extract-text', 'Extrair texto', (file: File, render: Render) => {
            const response = new ResponseCard(file.name);
            render.addElement(response.render());
            new ApplicationPDF(file).readLines((text: string) => {
                response.addContentParagraph(text);
            });
        }),
    ],
    'png': [
        new Action('png-to-jpeg', 'Converter para JPEG', (file: File) => {
            const canvas = document.createElement('canvas');
            const filename = file.name.replace('.png', '.jpeg');

            new ImagePNG(file).toJPEG(canvas, (url: string) => {
                downloadFile(filename, url);
            });
        }),
        new Action('png-to-webp', 'Converter para WEBP', (file: File) => {
            const canvas = document.createElement('canvas');
            const filename = file.name.replace('.png', '.webp');

            new ImagePNG(file).toWEBP(canvas, (url: string) => {
                downloadFile(filename, url);
            });
        }),
    ],
};