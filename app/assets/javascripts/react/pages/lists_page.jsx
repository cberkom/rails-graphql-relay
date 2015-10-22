import React from 'react';
import Relay from 'react-relay';
import 'babel-core/polyfill';

import {Link} from 'react-router';

class ListListItem extends React.Component {
    render() {
        return (
            <li>
                <Link to={`/lists/${this.props.list.id}`}>{this.props.list.name}</Link>
            </li>
        )
    }
}

class ListList extends React.Component {
    render() {
        var {lists} = this.props;
        var listListItems = lists.edges.map(edge =>
            <ListListItem key={edge.node.id} list={edge.node}/>
        );

        return (
            <div>
                <h1>Lists</h1>
                <ul>
                    {listListItems}
                </ul>
            </div>
        );
    }
}

export const Queries = {
    lists: (Component) => Relay.QL`
        query {
          lists {
            ${Component.getFragment('lists')},
          }
        }
    `
};

export const RelayContainer = Relay.createContainer(ListList, {
    fragments: {
        lists: () => Relay.QL`
            fragment on ListConnection {
                edges {
                    node {
                        id,
                        name,
                    }
                }
            }
        `
    }
});
