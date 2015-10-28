import ReactDOM from 'react-dom';
import Routes from 'react/config/routes.js';
import $ from 'jquery';

window.$ = $;
$(document).ready(() => ReactDOM.render(Routes, document.getElementById('root')));
