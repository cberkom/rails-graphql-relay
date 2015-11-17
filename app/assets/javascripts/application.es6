import ReactDOM from 'react-dom';
import Routes from './react/config/routes.es6';
import $ from 'jquery';

window.$ = $;
$(document).ready(() => ReactDOM.render(Routes, document.getElementById('root')));
