export class ResponseCard {

    constructor() {
        this.cardElement = document.getElementById('response-card');
        this.titleElement = document.getElementById('response-title');
        this.contentElement = document.getElementById('response-content');
        this.canvasElement = document.getElementById('response-canvas');
    }

    clear() {
        this.contentElement.innerHTML = '';
        this.titleElement.innerText = '';
    }

    hide() {
        this.cardElement.classList.add('d-none');
        this.clear();
    }

    show() {
        this.clear();
        this.cardElement.classList.remove('d-none');
    }

    setTitle(title) {
        this.titleElement.innerText = title;
    }

    addResponseLine(line) {
        this.contentElement.innerHTML += `<p>${line}</p>`;
    }
}
