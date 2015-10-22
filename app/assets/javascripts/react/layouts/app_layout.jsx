import React from 'react';

export const Component = React.createClass({
    render() {
        return (
            <div className="App">
                {this.props.children}
            </div>
        )
    }
});
