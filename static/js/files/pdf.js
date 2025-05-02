export class ApplicationPDF {

    constructor(file) {
        this.file = file;
        this.reader = new FileReader();
    }

    getFileName() {
        return this.file.name;
    }
    
    readLines(callback) {
        this.reader.readAsArrayBuffer(this.file);
        this.reader.onload = async (event) => {
            const pdf = await pdfjsLib.getDocument(event.target.result).promise;
            
            for (let pageIndex = 0; pageIndex < pdf.numPages; pageIndex++) {
                const page = await pdf.getPage(pageIndex + 1);
                const content = await page.getTextContent();
                const text = content.items.map(item => item.str).join(' ');
                callback(text);
            }
        }
    }
}