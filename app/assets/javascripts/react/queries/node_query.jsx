import Relay from 'react-relay';

export default {
    node: (Component) => Relay.QL`
        query {
          node(id: $id) {
            ${Component.getFragment('node')},
          },
        }
    `,
};
