import React from 'react';
import Relay from 'react-relay';
import {Link} from 'react-router';
import classNames from 'classnames';

import DestroyListMutation from 'react/mutations/DestroyListMutation';
import EditListMutation from 'react/mutations/EditListMutation';

import ListNameInput from './ListNameInputComponent';


export class List extends React.Component {
    static propTypes = {
        list: React.PropTypes.object.isRequired
    };
    constructor(props, context) {
        super(props, context);

        this.state = {
            isEditing: false
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

    onSaveClick = () => {
        const {list} = this.props;

        this.setEditMode(false);
        Relay.Store.update(
            new EditListMutation({list, name})
        );
        debugger;
    };

    setEditMode(isEditing) {
        this.setState({isEditing});
    }

    removeList() {
        const {list} = this.props;
        Relay.Store.update(
            new DestroyListMutation({list})
        );
    }

    renderListNameInput() {
        if (!this.state.isEditing) {
            return null;
        }

        return (
            <ListNameInput
                className="edit"
                initialValue={this.props.list.name}
                onCanvel={this.onCancelClick}
                onDelete={this.onDestroyClick}
                onSave={this.onSaveClick}
            />
        );
    }
    render() {
        const {name} = this.props.name;
        const {isEditing} = this.state;

        return (
            <li className={classNames({
                editing: isEditing})
            }>
                <div className="view">
                    <Link to={`/lists/${this.props.list.id}`}>{this.props.list.name}</Link>
                    <button className="destroy"
                        onClick={this.onDestroyClick}
                   />

                    <button className="edit"
                        onClick={this.onEditClick}
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" version="1.1" width="15" height="15" data-icon="pencil" viewBox="0 0 8 8">
                            <path d="M6 0l-1 1 2 2 1-1-2-2zm-2 2l-4 4v2h2l4-4-2-2z"/>
                        </svg>
                    </button>
                </div>
                {this.renderListNameInput()}
            </li>
        );
    }
}



export const RelayContainer = Relay.createContainer(List, {
    initialVariables: {
        isEditing: false
    },
    fragments: {
        list: () => Relay.QL`
        fragment on List {
            id,
            name,
            ${DestroyListMutation.getFragment('list')},
            ${EditListMutation.getFragment('list')}
        }
        `
    }
});