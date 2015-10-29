import React from 'react';
import Relay from 'react-relay';
import {Link} from 'react-router';
import classNames from 'classnames';

import DestroyListMutation from 'react/mutations/destroy_list_mutation';
import EditListMutation from 'react/mutations/edit_list_mutation';

import TextInput from './text_input_component';
import Button from './button_component';

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
                onCancel={this.onCancelClick}
                onDelete={this.onDestroyClick}
                onSave={this.handleSave}
            />
        );
    }


    render() {
        const {list} = this.props;
        const {isEditing} = this.state;

        return (
            <li data-react-component="list" className={classNames({editing: isEditing})}>
                <div className="view">
                    <Link to={`/lists/${list.id}`}>{list.name}</Link>
                    <Button className="destroy" onClick={this.onDestroyClick}/>
                    <Button className="edit" onClick={this.onEditClick}/>
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
        list: () => Relay.QL`
            fragment on List {
                id,
                name
            }
        `
    }
});
