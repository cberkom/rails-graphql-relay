import 'babel-core/polyfill';

import App from './components/App';
import AppHomeRoute from './routes/AppHomeRoute';
import React from 'react';
import ReactDOM from 'react-dom';
import Relay from 'react-relay';


/*
    We need a function to fire up our app.
    ReactDOM.render() instantiates the root component, starts the framework,
    and injects the markup into a raw DOM element (the second argument).
 */

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
