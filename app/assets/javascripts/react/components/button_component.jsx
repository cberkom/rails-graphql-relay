import React from 'react';
import keycode from 'keycode';

export default class TextInput extends React.Component {
    render() {
        return (
            <button data-react-component="button" {...this.props}>
                {this.props.children}
            </button>
        );
    }
}
