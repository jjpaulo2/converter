export class ImagePNG {

    private file: File;
    private reader: FileReader;

    constructor(
        file: File,
        reader: FileReader = new FileReader()
    ) {
        this.file = file;
        this.reader = reader;
    }

    toJPEG(canvas: HTMLCanvasElement, callback: (dataUrl: string) => void): void {
        const image = new Image();

        this.reader.readAsDataURL(this.file);
        this.reader.onload = async (event) => {

            if (!event.target || !event.target.result) {
                throw new Error('Error reading file!');
            }

            image.src = event.target.result.toString();
            image.onload = async () => {
                const img = image;
                canvas.width = img.width;
                canvas.height = img.height;

                const context = canvas.getContext('2d');

                if (!context) {
                    throw new Error('Error getting canvas context!');
                }

                context.fillStyle = '#fff';
                context.fillRect(0, 0, canvas.width, canvas.height);
                context.drawImage(image, 0, 0);

                callback(canvas.toDataURL('image/jpeg', 1.0));
            };
        }
    }

    toWEBP(canvas: HTMLCanvasElement, callback: (dataUrl: string) => void): void {
        const image = new Image();

        this.reader.readAsDataURL(this.file);
        this.reader.onload = async (event) => {

            if (!event.target || !event.target.result) {
                throw new Error('Error reading file!');
            }

            image.src = event.target.result.toString();
            image.onload = async () => {
                const img = image;
                canvas.width = img.width;
                canvas.height = img.height;

                const context = canvas.getContext('2d');

                if (!context) {
                    throw new Error('Error getting canvas context!');
                }

                context.fillStyle = '#fff';
                context.fillRect(0, 0, canvas.width, canvas.height);
                context.drawImage(image, 0, 0);

                callback(canvas.toDataURL('image/webp', 1.0));
            };
        }
    }

}