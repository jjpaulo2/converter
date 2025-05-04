import { getDocument } from 'pdfjs-dist';


export class ApplicationPDF {

    private file: File;
    private reader: FileReader;

    constructor(
        file: File,
        reader: FileReader = new FileReader()
    ) {
        this.file = file;
        this.reader = reader;
    }

    getFileName(): string {
        return this.file.name;
    }
    
    readLines(callback: CallableFunction): void {
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
        }
    }
}