import { getNewElementHTML } from "../utils/elements";
import { Render } from "./render";


export class Alert {

    private render: Render;

    constructor(render: Render) {
        this.render = render;
    }

    private getCloseButton(): string {
        return '<button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>';
    }

    private getElement(type: string, message: string): string {
        return getNewElementHTML(
            'div',
            message + this.getCloseButton(),
            {
                'class': `alert alert-${type} alert-dismissible fade show`
            }
        );
    }

    private show(type: string, message: string): void {
        this.render.clear();
        this.render.addElement(this.getElement(type, message));
        this.render.show();
    }

    error(message: string): void {
        this.show('danger', message);
    }

    info(message: string): void {
        this.show('info', message);
    }
}