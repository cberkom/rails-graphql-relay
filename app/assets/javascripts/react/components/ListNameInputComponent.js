import React from 'react';
import keycode from 'keycode';

export default class ListEdit extends React.Component {
    static propTypes = {
        initialValue: React.PropTypes.string,
        onCancel: React.PropTypes.func,
        onSave: React.PropTypes.func.isRequired
    };

    constructor(props, context) {
        super(props, context);

        this.state = {
            isEditing: false,
            name: this.props.initialValue || ''
        };
    }

    onKeyDown = (e) => {
        if (this.props.onCancel && e.keyCode === keycode.codes.esc) {
            this.props.onCancel();
        } else if (e.keyCode === keycode.codes.enter) {
            this.commitChanges();
        }
    };

    onChange = (e) => {
        this.setState({name: e.target.value});
    };

    commitChanges() {
        const newText = this.state.name.trim();
        if (this.props.onDelete && !newText) {
            this.props.onDelete();
        } else if (this.props.onCancel && newText === this.props.initialValue) {
            this.props.onCancel();
        } else if (newText) {
            this.props.onSave(newText);
            this.setState({name: ''});
        }
    }

    render() {
        return (
            <input
            {...this.props}
            onKeyDown={this.onKeyDown}
            onChange={this.onChange}
            value={this.state.name}
            />
        );
    }
}
