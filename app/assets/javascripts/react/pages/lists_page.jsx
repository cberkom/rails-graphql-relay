import React from 'react';
import Relay from 'react-relay';
import ExecutionEnvironment from 'exenv';
import 'babel-core/polyfill';
import $ from 'jquery';
var visible = require('visible-element')($);

import {Link} from 'react-router';

import List from 'react/components/list_component';
import Modal from 'react/components/modal_component';
import TextInput from 'react/components/text_input_component';

import EditListMutation from 'react/mutations/edit_list_mutation';
import DestroyListMutation from 'react/mutations/destroy_list_mutation';
import CreateListMutation from 'react/mutations/create_list_mutation';

class ListOfLists extends React.Component {

    componentDidMount() {
        var _this = this;
        if (ExecutionEnvironment.canUseDOM) {
            $(document).scroll('scroll', function () {
                _this._handleScrollLoad.call(_this)
            });
        }
        this._handleScrollLoad()
    }

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
                <List
                    key={node.id}
                    list={node}
                    root={root}
                />
        );
    }

    renderModal(){
        if (this.props.children){
            return(
                <Modal>
                    {this.props.children}
                </Modal>
            )
        }
    }

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


