import Relay from 'react-relay';

export default {
    root: (Component) => Relay.QL`
        query {
            current_user {
                ${Component.getFragment('current_user')}
            }
        }
    `
};
