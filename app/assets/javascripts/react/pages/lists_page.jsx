import React from 'react';
import Relay from 'react-relay';
import 'babel-core/polyfill';

import {Link} from 'react-router';
import * as ListComponent from 'react/components/ListComponent';

class ListList extends React.Component {

    renderLists() {
        var {lists} = this.props;
        return lists.edges.map(({node}) =>
            <ListComponent.List
                key={node.id}
                list={node}
                name={node.name}
            />
        );
    }

    render() {
        return (
            <div>
                <h1>Todo Lists</h1>
                <ul className="list">
                    {this.renderLists()}
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
