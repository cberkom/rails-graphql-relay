import createBrowserHistory from 'history/lib/createBrowserHistory';
import IsomorphicRelay from 'isomorphic-relay';
import IsomorphicRouter from 'isomorphic-relay-router';
import React from 'react';
import Relay from 'react-relay';
import ReactDOM from 'react-dom';
import routes from './react/config/routes';
import $ from 'jquery';

$(document).ready(() => {
    const data = JSON.parse(document.getElementById('preloadedData').textContent);
    IsomorphicRelay.injectPreparedData(data);
    ReactDOM.render(
        <IsomorphicRouter.Router routes={routes} history={createBrowserHistory()}/>,
        document.getElementById('root')
    );
});
