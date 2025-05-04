import { getElement } from "../utils/elements";


export class Loading {

    private element: HTMLElement;

    constructor(id: string = 'loading') {
        this.element = getElement(id);
    }

    show(): void {
        this.element.classList.remove('d-none');
    }

    hide(): void {
        this.element.classList.add('d-none');
    }

}