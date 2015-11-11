import React from 'react';
import keycode from 'keycode';

export default class Modal extends React.Component {
    render() {
        return (
            <div data-react-component="modal">
                <div className="modal-wrapper">
                    <div className="modal-content">
                        {this.props.children}
                    </div>
                </div>
            </div>
        );
    }
}
