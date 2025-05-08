import { FFmpeg } from '@ffmpeg/ffmpeg';
import { fetchFile, toBlobURL } from '@ffmpeg/util';
import { BaseFile } from './_base';


export class GeneralMedia extends BaseFile {

    private ffmpeg: FFmpeg;

    constructor(
        file: File,
        reader: FileReader = new FileReader()
    ) {
        super(file, reader);
        this.ffmpeg = new FFmpeg();
    }

    async load() {
        this.ffmpeg.on('log', ({ message }) => {
            console.log(message);
        });
        await this.ffmpeg.load({
            coreURL: await toBlobURL(`static/js/ffmpeg-core.js`, 'text/javascript'),
            wasmURL: await toBlobURL(`static/js/ffmpeg-core.wasm`, 'application/wasm'),
            workerURL: await toBlobURL(`static/js/ffmpeg-core.worker.js`, 'text/javascript'),
        });
    }

    async transcodeTo(format: string) {
        this.ffmpeg.writeFile(this.getFileName(), await this.file.arrayBuffer());
    }

}