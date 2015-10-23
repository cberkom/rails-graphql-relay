import React from 'react';

export const Component = React.createClass({
    render() {
        return (
            <div className="App">
            Navigation Up in Here
                {this.props.children}
            </div>
        )
    }
});
