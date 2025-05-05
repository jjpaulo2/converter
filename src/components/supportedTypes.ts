export class SupportedTypes {

    private element: HTMLElement;

    constructor(id: string = 'supported-types') {
        this.element = document.getElementById(id) as HTMLElement;
    }

    render(types: string[]): void {
        this.element.innerHTML = '';
        types.forEach(item => {
            this.element.innerHTML += `<span class="badge text-bg-secondary me-2">${item.toUpperCase()}</span>`;
        });
    }

}