import { ApplicationPDF } from './files/pdf';
import { ImagePNG } from './files/png';
import { Loading } from './components/loading';
import { FileForm } from './components/form';
import { ResponseCard } from './components/response';
import { getNewSelectOption } from './utils/elements';
import { downloadFile } from './utils/download';
import { GlobalWorkerOptions } from 'pdfjs-dist';

const loading = new Loading();
const form = new FileForm();
const response = new ResponseCard();

const pdfActions = [
    getNewSelectOption('extract', 'Extrair texto do arquivo'),
];

const pngActions = [
    getNewSelectOption('to-jpeg', 'Converter para JPEG'),
    getNewSelectOption('to-webp', 'Converter para WEBP'),
];

form.onFileChange((file: File) => {
    loading.show();
    form.clearSelect();

    if (!file) {
        response.hide();
        loading.hide();
        return;
    }
    
    if (file.type === 'application/pdf') {
        form.populateSelect(pdfActions);
    }
    
    else if (file.type === 'image/png') {
        form.populateSelect(pngActions);
    }

    else {
        response.show();
        response.addResponseLine('Formato de arquivo não suportado!');
    }

    loading.hide();
});

form.onSubmit((file: File, action: string) => {
    loading.show();
    response.show();

    if (file.type === 'application/pdf') {
        const pdf = new ApplicationPDF(file);
        response.setTitle(pdf.getFileName());
        pdf.readLines((line: string) => {
            response.addResponseLine(line);
        });
    }
    
    else if (file.type === 'image/png') {
        const png = new ImagePNG(file);

        if (action === 'to-webp') {
            png.toWEBP(response.canvasElement, (imageData: string) => {
                downloadFile('convertido.webp', imageData);
            })
        }

        else if (action === 'to-jpeg') {
            png.toJPEG(response.canvasElement, (imageData: string) => {
                downloadFile('convertido.jpeg', imageData);
            })
        }
    }

    loading.hide();
});

window.onload = () => {
    GlobalWorkerOptions.workerSrc = 'static/js/pdf.worker.min.mjs';
}