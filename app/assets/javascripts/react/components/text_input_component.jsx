import React from 'react';
import keycode from 'keycode';

export default class TextInput extends React.Component {
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

    renderCancel() {
        if (this.props.className === "edit"){
            return (
                <button className="cancel" onClick={this.props.onCancel}>
                    <svg xmlns="http://www.w3.org/2000/svg" version="1.1" width="15" height="15" data-icon="action-undo" data-container-transform="translate(0 1)" viewBox="0 0 8 8">
                        <path d="M4.5 1c-1.93 0-3.5 1.57-3.5 3.5v.5h-1l2 2 2-2h-1v-.5c0-1.38 1.12-2.5 2.5-2.5s2.5 1.12 2.5 2.5c0-1.93-1.57-3.5-3.5-3.5z"/>
                    </svg>
                </button>
            )
        } else {
            return null;
        }

    }

    render() {
        return (
            <div className="inputWrapper">
                <input
                {...this.props}
                onKeyDown={this.onKeyDown}
                onChange={this.onChange}
                value={this.state.name}
                />
                {this.renderCancel()}
            </div>
        );
    }
}
