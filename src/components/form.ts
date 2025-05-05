import { getElement } from "../utils/elements";
import { getFileExtension } from "../utils/files";
import { Alert } from "./alert";
import { FileDrag } from "./fileDrag";
import { Loading } from "./loading";
import { Render } from "./render";
import { ACTIONS } from "../actions";


export class FileForm {

    private render: Render;
    private loading: Loading;
    private fileDrag: FileDrag;
    private alert: Alert;

    private fileInputElement: HTMLInputElement;
    private fileDragElement: HTMLDivElement;

    constructor(
        render: Render,
        loading: Loading,
        fileDrag: FileDrag,
        alert: Alert,
        fileInputId: string = 'file',
        fileDragId: string = 'file-drag',
    ) {
        this.render = render;
        this.loading = loading;
        this.fileDrag = fileDrag;
        this.alert = alert;

        this.fileInputElement = getElement(fileInputId) as HTMLInputElement;
        this.fileDragElement = getElement(fileDragId) as HTMLDivElement;
    }

    getFileObject(): File {
        if (!this.fileInputElement.files) {
            throw new Error('No file selected!');
        }
        return this.fileInputElement.files[0];
    }

    renderActions(file: File): void {
        const fileExtension = getFileExtension(file);

        if (fileExtension in ACTIONS) {
            for (const action of ACTIONS[fileExtension]) {
                this.render.addElement(action.getHTML());
                action.setEventListener(file, this.loading, this.render);
            }
            this.render.show();
        }
    
        else {
            this.alert.error(`Formato de arquivo (.${fileExtension}) não suportado!`);
        }
    }

    setupEventListeners(): void {

        this.fileDragElement.addEventListener('click', (event: MouseEvent) => {
            event.preventDefault();
            event.stopPropagation();
            this.fileInputElement.click();
        });

        this.fileDragElement.addEventListener('dragover', (event: DragEvent) => {
            event.preventDefault();
            event.stopPropagation();
        });
        
        this.fileDragElement.addEventListener('drop', (event: DragEvent) => {
            event.preventDefault();
            event.stopPropagation();

            const files = event.dataTransfer?.files;

            if (files && files.length) {
                this.fileInputElement.files = files;
                this.fileInputElement.dispatchEvent(new Event('change'));
            }
        });

        this.fileInputElement.addEventListener('change', (event: Event) => {
            event.preventDefault();
            event.stopPropagation();
            
            this.loading.show();
            this.render.clear();
            
            const file = this.getFileObject();
            
            if (!file) {
                this.loading.hide();
                return;
            }
            
            this.fileDrag.render(file);
            this.renderActions(file);
            this.loading.hide();
        });
    }

}