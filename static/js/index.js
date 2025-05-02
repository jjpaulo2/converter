import { ApplicationPDF } from './files/pdf.js';
import { ImagePNG } from './files/png.js';
import { Loading } from './components/loading.js';
import { FileForm } from './components/form.js';

const responseCard = document.getElementById('response-card');
const responseTitle = document.getElementById('response-title');
const responseContent = document.getElementById('response-content');
const responseCanvas = document.getElementById('response-canvas');

const loading = new Loading();
const form = new FileForm();

const downloadFile = (fileName, fileData) => {
    const link = document.createElement('a');
    link.href = fileData;
    link.download = fileName;
    link.click();
}

const newSelectOption = (value, text) => {
    const option = document.createElement('option');
    option.value = value;
    option.text = text;
    return option;
}

const pdfActions = [
    newSelectOption('extract', 'Extrair texto do arquivo'),
];

const pngActions = [
    newSelectOption('to-jpeg', 'Converter para JPEG'),
    newSelectOption('to-webp', 'Converter para WEBP'),
];

form.fileInputElement.addEventListener('change', (event) => {
    loading.show();
    form.clearSelect();

    const file = form.getFileObject();

    if (!file) {
        responseCard.classList.add('d-none');
        responseContent.innerHTML = '';
        responseTitle.innerText = '';
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
        responseCard.classList.remove('d-none');
        responseContent.innerHTML = 'Formato de arquivo não suportado!';
        responseTitle.innerText = '';
    }

    loading.hide();
});

form.element.addEventListener('submit', async (event) => {
    loading.show();
    event.preventDefault();

    responseContent.innerHTML = '';
    responseTitle.innerText = '';
    responseCard.classList.remove('d-none');

    const file = form.getFileObject();

    if (file.type === 'application/pdf') {
        const pdf = new ApplicationPDF(file);
        responseTitle.innerText = pdf.getFileName();
        pdf.readLines((line) => {
            responseContent.innerHTML += `<p>${line}</p>`;
        });
    }
    
    else if (file.type === 'image/png') {
        const action = form.getAction();
        const png = new ImagePNG(file);

        if (action === 'to-webp') {
            png.toWEBP(responseCanvas, (imageData) => {
                downloadFile('convertido.webp', imageData);
            })
        }

        else if (action === 'to-jpeg') {
            png.toJPEG(responseCanvas, (imageData) => {
                downloadFile('convertido.jpeg', imageData);
            })
        }
    }

    loading.hide();
});

window.onload = () => {
    pdfjsLib.GlobalWorkerOptions.workerSrc = 'https://cdn.jsdelivr.net/npm/pdfjs-dist@5.2.133/build/pdf.worker.min.mjs';
}
