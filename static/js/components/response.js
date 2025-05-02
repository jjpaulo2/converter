export class ResponseCard {

    constructor() {
        this.responseCard = document.getElementById('response-card');
        this.responseTitle = document.getElementById('response-title');
        this.responseContent = document.getElementById('response-content');
        this.responseCanvas = document.getElementById('response-canvas');
    }

    clear() {
        this.responseContent.innerHTML = '';
        this.responseTitle.innerText = '';
    }

    hide() {
        this.responseCard.classList.add('d-none');
        this.clear();
    }

    show() {
        this.clear();
        this.responseCard.classList.remove('d-none');
    }

    setTitle(title) {
        this.responseTitle.innerText = title;
    }

    addResponseLine(line) {
        this.responseContent.innerHTML += `<p>${line}</p>`;
    }
}
