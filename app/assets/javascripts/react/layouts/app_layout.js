import React from 'react';
import {Link} from 'react-router';

export const Component = React.createClass({
    render() {
        const {children} = this.props;
        return (
            <div className="App">
                <Link to="/">Home</Link>
                {children}
            </div>
        )
    }
});

