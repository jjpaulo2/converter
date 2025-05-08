export class BaseFile {

    protected file: File;
    protected reader: FileReader;

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

}