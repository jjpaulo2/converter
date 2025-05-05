import { Loading } from './components/loading';
import { FileForm } from './components/form';
import { GlobalWorkerOptions } from 'pdfjs-dist';
import { Alert } from './components/alert';
import { Render } from './components/render';
import { FileDrag } from './components/fileDrag';
import { SupportedTypes } from './components/supportedTypes';
import { ACTIONS } from './actions';

const loading = new Loading();
const render = new Render();
const alert = new Alert(render);
const fileDrag = new FileDrag();
const form = new FileForm(render, loading, fileDrag, alert);
const supportedTypes = new SupportedTypes();

window.onload = () => {
    fileDrag.render(null);
    supportedTypes.render(Object.keys(ACTIONS));
    form.setupEventListeners();

    GlobalWorkerOptions.workerSrc = 'static/js/pdf.worker.min.mjs';
}