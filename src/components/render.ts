export class Render {

    public element: HTMLElement;

    constructor(id: string = 'render') {
        this.element = document.getElementById(id) as HTMLElement;
    }

    clear(): void {
        this.element.innerHTML = '';
    }

    hide(): void {
        this.element.classList.add('d-none');
    }

    show(): void {
        this.element.classList.remove('d-none');
    }

    addElement(elementHTML: string): void {
        this.element.innerHTML += elementHTML;
    }
}