export class ImagePNG {

    constructor(file) {
        this.file = file;
        this.reader = new FileReader();
    }

    toJPEG(canvas, callback) {
        const image = new Image();

        this.reader.readAsDataURL(this.file);
        this.reader.onload = async (event) => {

            image.src = event.target.result;
            image.onload = async () => {
                const img = image;
                canvas.width = img.width;
                canvas.height = img.height;

                const context = canvas.getContext('2d');
                context.fillStyle = '#fff';
                context.fillRect(0, 0, canvas.width, canvas.height);
                context.drawImage(image, 0, 0);

                callback(canvas.toDataURL('image/jpeg', 1.0));
            };
        }
    }

    toWEBP(canvas, callback) {
        const image = new Image();

        this.reader.readAsDataURL(this.file);
        this.reader.onload = async (event) => {

            image.src = event.target.result;
            image.onload = async () => {
                const img = image;
                canvas.width = img.width;
                canvas.height = img.height;

                const context = canvas.getContext('2d');
                context.fillStyle = '#fff';
                context.fillRect(0, 0, canvas.width, canvas.height);
                context.drawImage(image, 0, 0);

                callback(canvas.toDataURL('image/webp', 1.0));
            };
        }
    }

}