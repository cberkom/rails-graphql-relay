import React from 'react';
import {Link} from 'react-router';

export default React.createClass({
    render() {
        const {children} = this.props;
        return (
            <div data-react-layout="app">
                <div className="nav-bar">
                    <div className="nav-links">
                        <Link to="/">Home</Link>
                        <Link to="/lists">Lists</Link>
                    </div>
                </div>
                {children}
            </div>
        )
    }
});
