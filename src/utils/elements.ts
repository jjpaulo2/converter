export const getElement = (id: string): HTMLElement => {
    const element = document.getElementById(id);
    if (!element) {
        throw new Error(`Element with id ${id} not found!`);
    }
    return element;
};

export const getNewSelectOption = (value: string, text: string) => {
    const option = document.createElement('option');
    option.value = value;
    option.text = text;
    return option;
}

export const getNewElementHTML = (tag: string, innerHTML: string, properties: Record<string, string>): string => {
    let tag_properties = '';
    for (const [key, value] of Object.entries(properties)) {
        tag_properties += ` ${key}="${value}"`;
    }
    return `<${tag}${tag_properties}>${innerHTML}</${tag}>`;
}