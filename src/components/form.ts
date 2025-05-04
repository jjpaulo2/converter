import { getElement } from "../utils/elements";


export class FileForm {

    public element: HTMLFormElement;
    public fileInputElement: HTMLInputElement;
    public actionSelectElement: HTMLSelectElement;
    public runButtonElement: HTMLButtonElement;

    constructor(
        elementId: string = 'file-form',
        fileInputId: string = 'file',
        actionSelectId: string = 'action',
        runButtonId: string = 'run-action'
    ) {
        this.element = getElement(elementId) as HTMLFormElement;
        this.fileInputElement = getElement(fileInputId) as HTMLInputElement;
        this.actionSelectElement = getElement(actionSelectId) as HTMLSelectElement;
        this.runButtonElement = getElement(runButtonId) as HTMLButtonElement;
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

}