import React from 'react';
import Relay from 'react-relay';
import ExecutionEnvironment from 'exenv';
import 'babel-core/polyfill';
import $ from 'jquery';
var visible = require('visible-element')($);

import {Link} from 'react-router';

import ListComponent from 'react/components/list_component';
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
        var lastList = $(".list li").last();
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
                <ListComponent
                    key={node.id}
                    list={node}
                    root={root}
                />
        );
    }

    //renderModal(){
    //    if (this.props.children){
    //        <Modal>
    //            {this.props.children}
    //        </Modal>
    //    }
    //}

    render() {
        return (
            <section className="lists">
                <div>
                    <h1>Todo Lists</h1>
                    <TextInput
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
                            ${ListComponent.getFragment('list')}
                        }
                    }
                }
            }
        `
    }
});
export default Container


