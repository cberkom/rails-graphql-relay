import React from 'react';
import Relay from 'react-relay';
import {Link} from 'react-router';
import classNames from 'classnames';


export class Component extends React.Component {
    static propTypes = {
        list: React.PropTypes.object.isRequired,
        item: React.PropTypes.object.isRequired
    };

    constructor(props, context) {
        super(props, context);

        this.state = {
          isEditing: false
        };
    }

    onDestroyClick = () => {
        this.removeItem();
    };

    onEditClick = () => {
      this.setEditMode(false);
    };

    handleSave = (name) => {
        const {item} = this.props;

        this.setEditMode(false);
        Relay.Store.update(
            new EditItemMutation({item, name})
        );
    };

    setEditMode(isEditing) {
        this.setState({isEditing});
    }

    removeItem() {
        const {root, item} = this.props;
        Relay.Store.update(
            new DestroyItemMutation({root, item})
        );
    }

    renderTextInput() {
        if (!this.state.isEditing) {
            return null
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
        const {name} = this.props.name;
        const {isEditing} = this.state;

        return (
           <li className={classNames>{this.props.name}</li>
        );
    }
}



export const RelayContainer = Relay.createContainer(Component, {
    fragments: {
        item: () => Relay.QL`
            fragment on Component {
                id,
                name
            }
        `
    }
});
