import { Router, match, RoutingContext } from 'react-router';
import React from 'react';
import ReactDOM from 'react-dom';
import { renderToString } from 'react-dom/server';


import routes from 'config/routes';
import App from './components/App';
import AppHomeRoute from './routes/AppHomeRoute';

serve((req, res) => {
    // Note that req.url here should be the full URL path from
    // the original request, including the query string.
    match({ routes, location: req.url }, (error, redirectLocation, renderProps) => {
        if (error) {
            res.status(500).send(error.message)
        } else if (redirectLocation) {
            res.redirect(302, redirectLocation.pathname + redirectLocation.search)
        } else if (renderProps) {
            res.status(200).send(renderToString(
                    <Relay.RootContainer
                        Component={App}
                        route={new AppHomeRoute()}
                    /> ))
        } else {
            res.status(404).send('Not found')
        }
    })
})


