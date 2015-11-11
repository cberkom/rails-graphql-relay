import React from 'react';
import Relay from 'react-relay';

class UserList extends React.Component {
    render() {
        return (
            <div data-react-page="user_lists">TODO!</div>
        );
    }
}

export default Relay.createContainer(UserList, {
    initialVariables: {
        count: 10
    },
    fragments: {
        node: () => Relay.QL`
            fragment on User {
                lists
            }
        `
    }
});
