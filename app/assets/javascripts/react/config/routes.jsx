import React from 'react';
import Relay from 'react-relay';
import ReactDOM from 'react-dom';
import {Router, Route, IndexRoute} from 'react-router';
import { createHistory } from 'history';

// Import the pages
import AppLayout from '../layouts/app_layout';
import HomePage from '../pages/home_page';
import UserPage from '../pages/user_page';
import ListPage from 'react/pages/list_page';
import ListsPage from 'react/pages/lists_page';
import ReactRouterRelay from 'react-router-relay';

// Import Queries
import CurrentUserQuery from '../queries/current_user_query';
import RootQuery from '../queries/root_query';
import NodeQuery from '../queries/node_query';

export default function(){
    ReactDOM.render(
        <Router
            createElement={ReactRouterRelay.createElement}
            history={createHistory()}>
            <Route path="/" component={AppLayout}>
                <IndexRoute component={HomePage} />
                <Route
                    name="lists"
                    path="lists"
                    component={ListsPage}
                    queries={RootQuery}
                >
                    <Route
                        name="list"
                        path=":id"
                        component={ListPage}
                        queries={NodeQuery}
                    />
                </Route>
            </Route>
        </Router>,
        document.getElementById('root')
    );
}
