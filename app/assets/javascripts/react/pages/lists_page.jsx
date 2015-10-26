import React from 'react';
import Relay from 'react-relay';
import 'babel-core/polyfill';

import {Link} from 'react-router';
import * as ListComponent from 'react/components/list_component';
import ListNameInput from 'react/components/list_name_input_component';
import * as EditListMutation from 'react/mutations/edit_list_mutation';
import * as DestroyListMutation from 'react/mutations/destroy_list_mutation';
import CreateListMutation from 'react/mutations/create_list_mutation';

class ListList extends React.Component {

    handleSave = (name) => {
        Relay.Store.update(
            new CreateListMutation({name})
        );
    };

    renderLists() {
        var {lists} = this.props.root;
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
                    <ListNameInput
                    className="new-list"
                    autofocus
                    placeholder="What's your list called?"
                    onSave={this.handleSave}
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
    root: (Component) => Relay.QL`
        query {
          root {
            ${Component.getFragment('root')}
          }
        }
    `
};

export const RelayContainer = Relay.createContainer(ListList, {
    fragments: {
        root: () => Relay.QL`
            fragment on RootLevel {
                lists(first: 10) {
                    edges {
                        node {
                            id,
                            name
                        }
                    }
                }
            }
        `,


    }
});


