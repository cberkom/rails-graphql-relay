import React from 'react';
import Relay from 'react-relay';
import ReactDOM from 'react-dom';
import {Router, Route, IndexRoute} from 'react-router';
import { createHistory } from 'history';

// Import the pages
import * as AppLayout from '../layouts/app_layout';
import * as HomePage from '../pages/home_page';
import * as UserPage from '../pages/user_page';
import * as ListsPage from 'react/pages/lists_page';
import * as ListPage from 'react/pages/list_page';


// A wrapper to create a Relay container
createPageContainer(Component, props) => {
    if (Relay.isContainer(Component)) {
        // Construct the RelayQueryConfig from the route and the router props.
        var {name, queries} = props.route;
        var {params} = props;
        return (
            <Relay.RootContainer
                Component: {Component}
                renderFetched: {(data) => <Component {...props} {...data} />}
                route: {{name, params, queries}}
            />
        );
    } else {
        return <Component {...props}/>;
    }
}

let mountNode = document.getElementById('root');

export default () {
    ReactDOM.render(
        <Router createElement: {createPageContainer}
                history: {createHistory()}>
            <Route path: "/" component: {AppLayout.Component}>
                <IndexRoute component: {HomePage.Component} />
                <Route
                    name: "lists"
                    path: "lists"
                    component: {ListsPage.RelayContainer}
                    queries: {ListsPage.Queries}
                />
                <Route
                    name: "list"
                    queryParams: {['count']}
                    path: "lists/:id"
                    component: {ListPage.RelayContainer}
                    queries: {ListPage.Queries}
                />
            </Route>
        </Router>,
        mountNode
    );
}
