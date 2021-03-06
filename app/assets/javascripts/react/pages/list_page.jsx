import * as promise from 'es6-promise';
import React from 'react';
import Relay from 'react-relay';
import ScrollLoader from '../helpers/scroll_loader';
import {Link} from 'react-router';
import * as Item from '../components/item_component';
import  TextInput from '../components/text_input_component';
import CreateItemMutation from '../mutations/create_item_mutation';

promise.polyfill();

class List extends React.Component {
    handleSave = (name) => {
        const {list} = this.props;

        Relay.Store.update(
            new CreateItemMutation({list, name})
        );
    };

    renderItems() {
        var {list} = this.props;
        return list.items.edges.map(({node}) =>
            <Item.Component
                key={node.id}
                item={node}
                name={node.name}
                body={node.body}
                list={list}
            />
        );
    }

    render() {
        var {list} = this.props;
        return (
            <div data-react-page="list">
                <section className="inner">
                    <div className="modal-header">
                        <h2>{list.name}</h2>
                        <Link className="close" to={`/lists`}/>
                    </div>
                    <div className="content-body">
                        <TextInput
                            className="new-list"
                            autofocus
                            placeholder="What do you have to do?"
                            onSave={this.handleSave}
                        />
                        <ul className="list">
                            {this.renderItems()}
                        </ul>
                    </div>
                </section>
            </div>

        );
    }
}

const Container = Relay.createContainer(List, {
    initialVariables: {
        count: 1000
    },
    fragments: {
        list: () => Relay.QL`
          fragment on List {
            id,
            name,
            items(first: $count, order: "-id") {
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
