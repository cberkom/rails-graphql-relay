import React from 'react';
import Relay from 'react-relay';
import {Link} from 'react-router';

import Nav from '../components/nav_component';

class AppLayout extends React.Component {
    static propTypes = {
        root: React.PropTypes.object.isRequired
    };
    render() {
        const {root, children} = this.props;
        return (
            <div data-react-layout="app">
                <Nav root={root} />
                {children}
            </div>
        )
    }
}

export default Relay.createContainer(AppLayout, {
    fragments: {
        root: () => Relay.QL`
      fragment on RootLevel {
        ${Nav.getFragment('root')}
      }
    `
    }
});
