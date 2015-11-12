import React from 'react';
import Relay from 'react-relay';
import {IndexLink, Link} from 'react-router';

import List from 'react/components/list_component';
class Nav extends React.Component {
    static propTypes = {
        root: React.PropTypes.object.isRequired
    };

    render() {
        return (
            <div className="nav-bar">
                <div className="nav-links">
                    <IndexLink to="/" activeClassName="selected">Home</IndexLink>
                    <Link to="/lists" activeClassName="selected">Lists</Link>
                </div>
            </div>
        );
    }
}

export default Relay.createContainer(Nav, {
    prepareVariables() {
        return {
            limit: Number.MAX_SAFE_INTEGER || 9007199254740991
        };
    },

    fragments: {
        root: () => Relay.QL`
            fragment on RootLevel {
                id,
                lists(first: $limit) {
                    edges {
                        node {
                            id,
                            ${List.getFragment('list')}
                        }
                    }
                }
            }
        `
    }
});
