import React from 'react';
import Relay from 'react-relay';
import {Link} from 'react-router';
import classNames from 'classnames';

import DestroyListMutation from 'react/mutations/destroy_list_mutation';
import EditListMutation from 'react/mutations/edit_list_mutation';

import TextInput from './text_input_component';

class List extends React.Component {
    static propTypes = {
        root: React.PropTypes.object.isRequired,
        list: React.PropTypes.object.isRequired
    };

    constructor(props, context) {
        super(props, context);

        this.state = {
            isEditing: false,
            modalOpen: false
        };
    }

    onDestroyClick = () => {
        this.removeList();
    };

    onEditClick = () => {
        this.setEditMode(true);
    };

    onCancelClick = () => {
        this.setEditMode(false);
    };

    handleSave = (name) => {
        const {list} = this.props;

        this.setEditMode(false);
        Relay.Store.update(
            new EditListMutation({list, name})
        );
    };

    setEditMode(isEditing) {
        this.setState({isEditing});
    }

    removeList() {
        const {root, list} = this.props;
        Relay.Store.update(
            new DestroyListMutation({root, list})
        );
    }

    renderTextInput() {
        if (!this.state.isEditing) {
            return null;
        }

        return (
            <TextInput
                className="edit"
                initialValue={this.props.list.name}
                onCanvel={this.onCancelClick}
                onDelete={this.onDestroyClick}
                onSave={this.handleSave}
            />
        );
    }


    render() {
        const {list} = this.props;
        const {isEditing} = this.state;

        return (
            <li className={classNames({editing: isEditing})}>
                <div className="view">
                    <Link to={`/lists/${list.id}`}>{list.name}</Link>
                    <button className="destroy" onClick={this.onDestroyClick}/>
                    <button className="edit" onClick={this.onEditClick}>
                        <svg xmlns="http://www.w3.org/2000/svg" version="1.1" width="15" height="15" data-icon="pencil" viewBox="0 0 8 8">
                            <path d="M6 0l-1 1 2 2 1-1-2-2zm-2 2l-4 4v2h2l4-4-2-2z"/>
                        </svg>
                    </button>
                </div>
                {this.renderTextInput()}
            </li>

        );
    }
}



export default Relay.createContainer(List, {
    initialVariables: {
        isEditing: false
    },
    fragments: {
        root: () => Relay.QL`
            fragment on RootLevel {
                id
            }
        `,
        list: () => Relay.QL`
            fragment on List {
                id,
                name
            }
        `
    }
});
