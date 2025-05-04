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

    getElement(tag: string, innerHTML: string, properties: Record<string, string>): string {
        let tag_properties = '';
        for (const [key, value] of Object.entries(properties)) {
            tag_properties += ` ${key}="${value}"`;
        }
        return `<${tag}${tag_properties}>${innerHTML}</${tag}>`;
    }

    addElement(elementHtml: string): void {
        this.element.innerHTML += elementHtml;
    }
}