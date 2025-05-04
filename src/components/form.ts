import { getElement } from "../utils/elements";


export class FileForm {

    public element: HTMLFormElement;
    public fileInputElement: HTMLInputElement;
    public fileDragElement: HTMLDivElement;
    public actionsRowElement: HTMLDivElement;
    public actionSelectElement: HTMLSelectElement;
    public runButtonElement: HTMLButtonElement;

    constructor(
        elementId: string = 'file-form',
        fileInputId: string = 'file',
        fileDragId: string = 'file-drag',
        actionsRowId: string = 'action-row',
        actionSelectId: string = 'action',
        runButtonId: string = 'run-action'
    ) {
        this.element = getElement(elementId) as HTMLFormElement;
        this.fileInputElement = getElement(fileInputId) as HTMLInputElement;
        this.fileDragElement = getElement(fileDragId) as HTMLDivElement;
        this.actionsRowElement = getElement(actionsRowId) as HTMLDivElement;
        this.actionSelectElement = getElement(actionSelectId) as HTMLSelectElement;
        this.runButtonElement = getElement(runButtonId) as HTMLButtonElement;

        this.fileDragElement.addEventListener('click', (event: MouseEvent) => {
            event.preventDefault();
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
            console.log(this.fileInputElement.files);
        });
    }

    getFileObject(): File {
        if (!this.fileInputElement.files) {
            throw new Error('No file selected!');
        }
        return this.fileInputElement.files[0];
    }

    clearSelect(): void {
        this.actionSelectElement.innerHTML = '<option selected>---</option>';
        this.actionSelectElement.disabled = true;
        this.runButtonElement.disabled = true;
    }

    populateSelect(options: HTMLOptionElement[]): void {
        this.actionSelectElement.innerHTML = '';
        this.actionSelectElement.disabled = false;
        this.runButtonElement.disabled = false;
        options.forEach(value => {
            this.actionSelectElement.add(value);
        });
    }

    getAction(): string {
        return this.actionSelectElement.value;
    }

    hideActions(): void {
        this.actionsRowElement.classList.add('d-none');
    }

    showActions(): void {
        this.actionsRowElement.classList.remove('d-none');
    }

    setActionsVisibility(): void {
        if (this.fileInputElement.files) {
            this.showActions();
        }
        else {
            this.hideActions();
        }
    }

    onSubmit(callback: (file: File, action: string) => void): void {
        this.element.addEventListener('submit', (event: Event) => {
            event.preventDefault();
            callback(this.getFileObject(), this.getAction());
        });
    }

    onFileChange(callback: (file: File) => void): void {
        this.fileInputElement.addEventListener('change', (event: Event) => {
            event.preventDefault();
            this.setActionsVisibility();
            callback(this.getFileObject());
        });
    }

}