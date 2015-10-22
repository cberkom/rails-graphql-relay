import React from 'react';
import Relay from 'react-relay';
import ReactDOM from 'react-dom';
import ReactRouterRelay from 'react-router-relay';
import {Router, Route, IndexRoute} from 'react-router';
import { createHistory } from 'history';

// Import the pages
import * as AppLayout from '../layouts/app_layout';
import * as HomePage from '../pages/home_page';
import * as UserPage from '../pages/user_page';
import * as WidgetPage from 'react/pages/widget_page';
import * as WidgetsPage from 'react/pages/widgets_page';

// A wrapper to create a Relay container
function createPageContainer(Component, props) {
    if (Relay.isContainer(Component)) {
        // Construct the RelayQueryConfig from the route and the router props.
        var {name, queries} = props.route;
        var {params} = props;
        return (
            <Relay.RootContainer
                Component={Component}
                renderFetched={(data) => <Component {...props} {...data} />}
                route={{name, params, queries}}
            />
        );
    } else {
        return <Component {...props}/>;
    }
}

export default function(){
    ReactDOM.render(
        <Router
            createElement={ReactRouterRelay.createElement}
            history={createHistory()}>
            <Route path="/" component={AppLayout.Component}>
                <IndexRoute component={HomePage.Component} />
                <Route
                    name="widgets"
                    path="widgets"
                    component={WidgetsPage.RelayContainer}
                    queries={WidgetsPage.Queries}
                    />
                <Route
                    name="widget"
                    path="widgets/:id"
                    component={WidgetPage.RelayContainer}
                    queries={WidgetPage.Queries}
                    prepareParams={WidgetPage.PrepareParams}
                />
            </Route>
        </Router>,
        document.getElementById('root')
    );
}
