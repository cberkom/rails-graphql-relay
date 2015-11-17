import * as promise from 'es6-promise';
import React from 'react';
import Relay from 'react-relay';
import ExecutionEnvironment from 'exenv';
import $ from 'jquery';

import {Link} from 'react-router';

import List from '../components/list_component';
import Modal from '../components/modal_component';
import TextInput from '../components/text_input_component';

import EditListMutation from '../mutations/edit_list_mutation';
import DestroyListMutation from '../mutations/destroy_list_mutation';
import CreateListMutation from '../mutations/create_list_mutation';

promise.polyfill();

var visible = require('visible-element')($);

class ListOfLists extends React.Component {
    /*
     componentDidMount is invoked once on the client, immediately following the initial render.
     At this point in the application lifecycle you can access any underlying DOM representation.
     The componentDidMount() method of child components is invoked before the parent components.
     */
    componentDidMount() {
        var _this = this;
        if (ExecutionEnvironment.canUseDOM) {
            $(document).scroll('scroll', function () {
                _this._handleScrollLoad.call(_this)
            });
        }
        this._handleScrollLoad()
    }

    /*
     Invoked immediately after the component's updates are flushed to DOM. You can use this to
     operate on the DOM when the component has been updated.
     */
    componentDidUpdate(prevProps) {
        if (prevProps.root.lists.edges != this.props.root.lists.edges) {
            this._handleScrollLoad()
        }
    }

    _lastListItemVisible() {
        var lastList = $('[data-react-page="lists"] > .content-body li[data-react-component="list"]').last()
        return lastList[0] && visible.inViewport(lastList);
    }

    _loadMore() {
        this.props.relay.setVariables({
            count: this.props.relay.variables.count + 10
        });
    }

    _handleScrollLoad() {
        if (this._lastListItemVisible()) {
            this._loadMore();
        }
    }

    handleSave = (name) => {
        const {root} = this.props;

        Relay.Store.update(
            new CreateListMutation({root, name})
        );
    };


    renderLists() {
        const {root} = this.props;

        return root.lists.edges.map(({node}) =>
            <List key={node.id} list={node} root={root}/>
        );
    }

    renderModal() {
        if (this.props.children) {
            return (
                <Modal>
                    {this.props.children}
                </Modal>
            )
        }
    }

    /*
     Render is what get's output into the DOM. Note that native HTML element names start with lowercase letters
     where custom React class names begin with an uppercase letter.
     */
    render() {
        return (
            <div data-react-page="lists">
                {this.renderModal()}
                <section className="content-body">
                    <div>
                        <h1>Todo Lists</h1>
                        <TextInput
                            className="new-list"
                            autofocus
                            placeholder="What's your list called?"
                            onSave={this.handleSave}
                        />
                        <ul className="list-of-lists">
                            {this.renderLists()}
                        </ul>
                    </div>
                </section>
            </div>
        );
    }
}

/*
 The Relay Container holds schema information that allows Relay to understand things like field arguments,
 which fields are connections or lists, and how to efficiently refetch records from the server.

 Note that you can pass get a child's fragment by calling it from with in the Relay.QL
 */

const Container = Relay.createContainer(ListOfLists, {
    initialVariables: {
        count: 10,
        order: "-id"
    },
    fragments: {
        root: () => Relay.QL`
            fragment on RootLevel {
                id,
                lists(first: $count, order: $order) {
                    edges {
                        node {
                            id,
                            ${List.getFragment('list')}
                        }
                    }
                }
            }
        `
    }
});
export default Container


