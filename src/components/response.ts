import { getElement } from "../utils/elements";


export class ResponseCard {

    private title: string;

    constructor(title: string) {
        this.title = title;
        
    }

    render(): string {
        return `
            <div class="card mt-3">
                <div class="card-body">
                    <h6 class="card-subtitle mb-2 text-body-secondary">${this.title}</h6>
                    <p class="card-text" id="response-card-text"></p>
                </div>
            </div>
        `;
    }

    addContentParagraph(text: string): void {
        const body = getElement('response-card-text');

        if (body) {
            body.innerHTML += `<p>${text}</p>`;
        }
    }

}
