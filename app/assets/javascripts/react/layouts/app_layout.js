import React from 'react';
import {Link} from 'react-router';

export default React.createClass({
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
