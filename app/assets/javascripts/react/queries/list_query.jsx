import Relay from 'react-relay';
/*
 Fragments, mutations and queries must be specified with ES6 template literals tagged with Relay.QL
 To execute the code, Relay needs access to the schema The Relay.QL expressions are transpiled into
 Javascript descriptions using the babel-relay-plugin. This schema information allows Relay to understand
 things like field arguments, which fields are connections or lists, and how to efficiently refetch records
 from the server.
 */
export default {
    list: (Component) => Relay.QL`
        query {
          node(id: $id) {
            ${Component.getFragment('list')},
          },
        }
    `,
};
