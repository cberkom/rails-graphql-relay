import React from 'react';
import Relay from 'react-relay';
import 'babel-core/polyfill';

import {Link} from 'react-router';
import * as ListItem from 'react/components/list_item_component';
import  ListNameInput from 'react/components/list_name_input_component';

class List extends React.Component {

    _handleScrollLoad() {
        this.props.setVariables({
            count: this.props.relay.variables.count + 10
        });
    }

    handleSave = (name) => {
        Relay.Store.update(
            new CreateItemMutation({name})
        );
    };


    renderListItems() {
        var {list} = this.props;
        return list.items.edges.map(({node}) =>
                <ListItem
                    key={node.id}
                    item={node}
                    name={node.name}
                    body={node.body}
                    />
        );
    }

    render() {
        var {list} = this.props;
        return (
            <section className="lists">
                <div>
                    <h1>{list.name}</h1>
                    <ListNameInput
                        className="new-list"
                        autofocus
                        placeholder="What do you have to do?"
                        onSave={this.handleSave}
                        />
                    <ul className="list">
                        {this.renderListItems()}
                    </ul>
                </div>
            </section>
        );
    }
}

const Container = Relay.createContainer(List, {
    initialVariables: {
        count: 10
    },
    fragments: {
        list: () => Relay.QL`
          fragment on List {
            id,
            name,
            items(first: $count) {
              edges {
                node {
                   id,
                   name,
                   body
                }
              }
            },
          }
        `
    }
});

export default Container;
