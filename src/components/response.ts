import { getElement } from "../utils/elements";


export class ResponseCard {

    public cardElement: HTMLElement;
    public titleElement: HTMLElement;
    public contentElement: HTMLElement;
    public canvasElement: HTMLCanvasElement;

    constructor(
        cardId: string = 'response-card',
        titleId: string = 'response-title',
        contentId: string = 'response-content',
        canvasId: string = 'response-canvas'
    ) {
        this.cardElement = getElement(cardId);
        this.titleElement = getElement(titleId);
        this.contentElement = getElement(contentId);
        this.canvasElement = getElement(canvasId) as HTMLCanvasElement;
    }

    clear(): void {
        this.contentElement.innerHTML = '';
        this.titleElement.innerText = '';
    }

    hide(): void {
        this.cardElement.classList.add('d-none');
        this.clear();
    }

    show(): void {
        this.clear();
        this.cardElement.classList.remove('d-none');
    }

    setTitle(title: string): void {
        this.titleElement.innerText = title;
    }

    addResponseLine(line: string): void {
        this.contentElement.innerHTML += `<p>${line}</p>`;
    }

}
