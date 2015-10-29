import React from 'react';
import Relay from 'react-relay';

class User extends React.Component {
    render() {
        return (
            <div data-react-page="user">TODO!</div>
        );
    }
}

export default Relay.createContainer(User, {
    fragments: {
        node: () => Relay.QL`
            fragment on User {
                first_name,
                last_name,
                email
            }
        `
    }
});
