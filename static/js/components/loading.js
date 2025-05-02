export class Loading {
    constructor() {
        this.element = document.getElementById('loading');
    }
    show() {
        this.element.classList.remove('d-none');
    }
    hide() {
        this.element.classList.add('d-none');
    }
}