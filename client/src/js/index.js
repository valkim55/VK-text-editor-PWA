import { Workbox } from 'workbox-window';
// not including header import because it's already imported into Editor - dependency graph
import Editor from './editor';
import './database';
// import images
import logo from '../images/logo.png';
import '../css/style.css';
// import bootstrap
import { Tooltip, Toast, Popover} from 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

window.addEventListener('load', function() {
    this.document.getElementById('logo').src = logo;
    console.log('this is an entry point');
})

const main = document.querySelector('#main');
main.innerHTML = '';

const loadSpinner = () => {
  const spinner = document.createElement('div');
  spinner.classList.add('spinner');
  spinner.innerHTML = `
  <div class="loading-container">
  <div class="loading-spinner" />
  </div>
  `;
  main.appendChild(spinner);
};

const editor = new Editor();

if (typeof editor === 'undefined') {
  loadSpinner();
}

// Check if service workers are supported
if ('serviceWorker' in navigator) {
  // register workbox service worker
  const workboxSW = new Workbox('/src-sw.js');
  workboxSW.register();
  console.log('SW registered');
} else {
  console.error('Service workers are not supported in this browser.');
}
