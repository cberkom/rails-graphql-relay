import React from 'react';
import Relay from 'react-relay';
import 'babel-core/polyfill';

import {Link} from 'react-router';
import * as ListComponent from 'react/components/ListComponent';
import ListNameInputComponent from 'react/components/ListNameInputComponent';
import * as EditListMutation from 'react/mutations/EditListMutation';
import AddListMutation from 'react/mutations/AddListMutation';

class ListList extends React.Component {

    onNewListSave = (name) => {
        Relay.Store.update(
            new AddListMutation({name})
        );
    };

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
            <section className="lists">
            <div>
                <h1>Todo Lists</h1>
                <ListNameInputComponent
                    className="new-list"
                    placeholder="What's the name of your list?"
                    autofocus
                    onSave={this.onNewListSave}
                    />
                <ul className="list">
                    {this.renderLists()}
                </ul>
            </div>
            </section>
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
