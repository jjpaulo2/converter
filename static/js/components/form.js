export class FileForm {

    constructor() {
        this.element = document.getElementById('file-form');
        this.fileInputElement = document.getElementById('file');
        this.actionSelectElement = document.getElementById('action');
        this.runButtonElement = document.getElementById('run-action');
    }

    getFileObject() {
        return this.fileInputElement.files[0];
    }

    clearSelect() {
        this.actionSelectElement.innerHTML = '<option selected>---</option>';
        this.actionSelectElement.disabled = true;
        this.runButtonElement.disabled = true;
    }

    populateSelect(options) {
        this.actionSelectElement.innerHTML = '';
        this.actionSelectElement.disabled = false;
        this.runButtonElement.disabled = false;
        options.forEach(value => {
            this.actionSelectElement.add(value);
        });
    }

    getAction() {
        return this.actionSelectElement.value;
    }

}