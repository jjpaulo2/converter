import type { Loading } from "./loading";
import type { Render } from "./render";


export class Action {

    private id: string;
    private text: string;
    private callback: (file: File, render: Render) => void;

    constructor(id: string, text: string, callback: (file: File, render: Render) => void) {
        this.id = id;
        this.text = text;
        this.callback = callback;
    }

    getHTML(): string {
        return `<button class="btn btn-primary me-3" id="${this.id}">${this.text}</button>`;
    }
    
    setEventListener(file: File, loading: Loading, render: Render): void {
        const element = document.getElementById(this.id);
    
        if (element) {
            element.addEventListener('click', (event: Event) => {
                event.preventDefault();
                event.stopPropagation();
                loading.show();
                this.callback(file, render);
                loading.hide();
            });
        }

        else {
            throw new Error(`Element with id ${this.id} not found!`);
        }
    }

}