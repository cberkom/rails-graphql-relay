import React from 'react';
import Relay from 'react-relay';
import 'babel-core/polyfill';

import {Link} from 'react-router';

export class List extends React.Component {
    render() {
        var {list} = this.props;
        return (
            <div>
                <h1>List {list.name}</h1>
                <div>
                    {list.id}
                </div>
                <div>
                    <Link to="/">Home</Link>
                </div>
            </div>
        );
    }
}

export const Queries = {
    list: (Component) => Relay.QL`
        query {
          node(id: $id) {
            ${Component.getFragment('list')},
          },
        }
    `,
};

export const RelayContainer = Relay.createContainer(List, {
    fragments: {
        list: () => Relay.QL`
          fragment on List {
            id,
            name,
          }
        `,
    },
});
