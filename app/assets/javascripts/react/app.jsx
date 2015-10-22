import 'babel-core/polyfill';

import App from './components/App';
import AppHomeRoute from './routes/AppHomeRoute';
import React from 'react';
import ReactDOM from 'react-dom';
import Relay from 'react-relay';
import $ from 'jquery';

var StartApp = () => {
    ReactDOM.render(
        <Relay.RootContainer
            Component={App}
            route={new AppHomeRoute()}
            />,
        document.getElementById('root')
    );
};

function getSessionToken(){
    $.get('/session.json').done((payload) => {
        Relay.injectNetworkLayer(
            new Relay.DefaultNetworkLayer('/graphql', {
                headers: {
                    'X-CSRF-Token': payload.csrf,
                    'Authorization': 'Bearer ' + payload.jwt
                }
            })
        );
    });
}

getSessionToken();
module.exports = StartApp;
