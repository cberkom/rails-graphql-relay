import React from 'react';
import {Route, IndexRoute} from 'react-router';
import createHistory from 'history';
import IsomorphicRelay from 'isomorphic-relay';
import IsomorphicRouter from 'isomorphic-relay-router';
import ReactRouterRelay from 'react-router-relay';

// Import the pages
import AppLayout from '../layouts/app_layout';
import HomePage from '../pages/home_page';
import UserPage from '../pages/user_page';
import ListPage from '../pages/list_page';
import ListsPage from '../pages/lists_page';

// Import Queries
import CurrentUserQuery from '../queries/current_user_query';
import RootQuery from '../queries/root_query';
import ListQuery from '../queries/list_query';

// Define the routes here
export default [
    {
        path: '/',
        component: AppLayout,
        queries: RootQuery,
        indexRoute: {
            component: HomePage
        },
        childRoutes: [
            {
                name: 'lists',
                path: 'lists',
                component: ListsPage,
                queries: RootQuery,
                childRoutes: {
                    name: 'list',
                    path: ':id',
                    component: ListPage,
                    queries: ListQuery
                }
            }
        ]
    }
];
