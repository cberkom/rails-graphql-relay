import 'babel-core/polyfill';

import App from './components/App';
import AppHomeRoute from './routes/AppHomeRoute';
import React from 'react';
import ReactDOM from 'react-dom';
import Relay from 'react-relay';

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
