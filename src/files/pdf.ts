import { getDocument, GlobalWorkerOptions } from 'pdfjs-dist';
import { BaseFile } from './_base';


GlobalWorkerOptions.workerSrc = 'static/js/pdf.worker.min.mjs';


export class ApplicationPDF extends BaseFile {

    readLines(callback: (text: string) => void): void {
        console.log('[PDF.js] Reading file text content...');

        this.reader.readAsArrayBuffer(this.file);
        this.reader.onload = async (event) => {

            if (!event.target || !event.target.result) {
                throw new Error('File reading failed!');
            }

            const pdf = await getDocument(event.target.result).promise;
            
            for (let pageIndex = 0; pageIndex < pdf.numPages; pageIndex++) {
                const page = await pdf.getPage(pageIndex + 1);
                const content = await page.getTextContent();
                const textLines = content.items.map(item => {
                    if ('str' in item) {
                        return item.str;
                    }
                    return '';
                });
                const text = textLines.join(' ');
                callback(text);
            }

            console.log('[PDF.js] File text content read successfully!');
        }
    }
}