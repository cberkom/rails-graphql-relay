import React from 'react';
import {Link} from 'react-router';

export const Component = React.createClass({
    render() {
        return (
            <div className="App">
                <Link to="/">Home</Link>
                {this.props.children}
            </div>
        )
    }
});

