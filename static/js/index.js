const form = document.getElementById('file-form');
const fileInput = document.getElementById('file');
const actionsSelect = document.getElementById('action');
const runActionButton = document.getElementById('run-action');

const responseCard = document.getElementById('response-card');
const responseTitle = document.getElementById('response-title');
const responseContent = document.getElementById('response-content');

const getFileObject = (target) => {
    return target.files[0];
}

const newSelectOption = (value, text) => {
    const option = document.createElement('option');
    option.value = value;
    option.text = text;
    return option;
}

const pdfActions = [
    newSelectOption('extract', 'Extrair texto do arquivo'),
];

fileInput.addEventListener('change', (event) => {
    const file = getFileObject(event.target);
    actionsSelect.innerHTML = '';
    
    if (file.type === 'application/pdf') {
        actionsSelect.disabled = false;
        runActionButton.disabled = false;
        pdfActions.forEach(action => {
            actionsSelect.add(action);
        });
    } 
});

form.addEventListener('submit', (event) => {
    event.preventDefault();

    responseContent.innerHTML = '';
    responseTitle.innerText = '';
    responseCard.classList.remove('d-none');
    
    const file = getFileObject(event.target[0]);
    const reader = new FileReader();
    
    reader.onload = async (event) => {
        const pdf = await pdfjsLib.getDocument(event.target.result).promise;

        responseTitle.innerText = file.name;
        
        for (let pageIndex = 0; pageIndex < pdf.numPages; pageIndex++) {
            const page = await pdf.getPage(pageIndex + 1);
            const content = await page.getTextContent();
            const text = content.items.map(item => item.str).join(' ');
            responseContent.innerHTML += `<p>${text}</p>`;
        }
    }

    reader.readAsArrayBuffer(file);
});

window.onload = () => {
    pdfjsLib.GlobalWorkerOptions.workerSrc = 'https://cdn.jsdelivr.net/npm/pdfjs-dist@5.2.133/build/pdf.worker.min.mjs';
}
