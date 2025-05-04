import { getNewElementHTML } from "../utils/elements";
import { getFileExtension } from "../utils/files";

export class FileDrag {

    private element: HTMLElement;
    private icons: Record<string, string> = {
        'pdf': 'bi-file-earmark-pdf',
        'png': 'bi-file-earmark-image',
        'jpeg': 'bi-file-earmark-image',
        'webp': 'bi-file-earmark-image',
    }

    constructor(id: string = 'file-drag') {
        this.element = document.getElementById(id) as HTMLElement;
    }

    private getTitle(file: File | null): string {
        return getNewElementHTML('p', file?.name || 'Arraste um arquivo pra cá', {'id': 'file-name'});
    }

    private getIcon(file: File | null): string {
        let icon = 'bi-file-earmark-arrow-up';
        if (file) {
            const extension = getFileExtension(file);
            icon = this.icons[extension] || icon; 
        }
        return getNewElementHTML('i', '', {'id': 'file-icon', 'class': `bi ${icon} fs-1`});
    }

    render(file: File | null): void {
        this.element.innerHTML = this.getIcon(file) + this.getTitle(file);
    }
}