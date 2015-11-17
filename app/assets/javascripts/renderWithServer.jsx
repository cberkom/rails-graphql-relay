import GraphQLStoreChangeEmitter from 'react-relay/lib/GraphQLStoreChangeEmitter';
import IsomorphicRouter from 'isomorphic-relay-router';
import React from 'react';
import ReactDOMServer from 'react-dom/server';
import Relay from 'react-relay';
import {match, RoutingContext} from 'react-router';
import CLI from 'commander';
import _ from 'lodash';

import routes from './react/config/routes';

CLI
    .option('-p, --path <s>', 'The current path.')
    .option('-h, --host <s>', 'The host of the GraphQL server.')
    .parse(process.argv);

console.log("'" + CLI.host + "'");
Relay.injectNetworkLayer(new Relay.DefaultNetworkLayer(CLI.host + '/graphql'));

GraphQLStoreChangeEmitter.injectBatchingStrategy(_.noop);

match({routes, location: CLI.path}, (error, redirectLocation, renderProps) => {
    var obj;

    if (error) {
        console.error(error);
        throw error;
    } else if (redirectLocation) {
        console.error('redirecting');
        obj = {
            status: 302,
            headers: {
                location: redirectLocation.pathname + redirectLocation.search
            },
            body: 'Redirecting'
        };
        console.log(JSON.stringify(obj));
    } else if (renderProps) {
        console.error('rendering');
        IsomorphicRouter.prepareData(renderProps).then(render).catch(() => { throw 'error' });
        console.error('done rendering');
    } else {
        console.error('not found');
        obj = {
            status: 404,
            body: 'Not Found'
        };
        console.log(JSON.stringify(obj));
    }

    function render(data) {
        console.log(data);
        const reactOutput = ReactDOMServer.renderToString(
            <IsomorphicRouter.RoutingContext {...renderProps} />
        );
        obj = {
            status: 200,
            scripts: [
                { id: 'preloadedData', type: 'application/json', _: data }
            ],
            body: reactOutput
        };
        console.log(JSON.stringify(obj));
    }
});

