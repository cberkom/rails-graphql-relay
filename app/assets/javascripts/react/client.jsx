import 'babel-core/polyfill';

import React from 'react';
import Router from 'react-router';
import ReactDOM from 'react-dom';

import routes from 'config/routes';
import App from './components/App';
import AppHomeRoute from './routes/AppHomeRoute';

var StartApp = () => {
    ReactDOM.render(
        <Relay.RootContainer
            Component={App}
            route={new AppHomeRoute()}
            />,
        document.getElementById('root')
    );
};

module.exports = StartApp;