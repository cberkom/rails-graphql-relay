import Relay from 'react-relay';

export default class extends Relay.Mutation  {
    /*
        This method should return a GraphQL operation that represents
        the mutation to be performed.
     */
    getMutation() {
        return Relay.QL`mutation{CreateList}`;
    }

    /*
        Use this method to prepare the variables that will be used as input to the mutation
     */
    getVariables() {
        return {
            name: this.props.name
        };
    }

    /*
        A 'fat query' is one that represents every field in your data model that could change
        as a result of the mutation
     */
    getFatQuery() {
        return Relay.QL`
          fragment on CreateListPayload {
            listEdge,
            root {
                lists
            }
        }
        `;
    }

    /*
        These configs advise Relay how to handle the payload returned by the server.

     */
    getConfigs() {
        return [
            {
                type: 'RANGE_ADD',
                parentName: 'root',
                parentID: this.props.root.id,
                connectionName: 'lists',
                edgeName: 'listEdge',
                rangeBehaviors: {
                    '': 'append',
                    'order(-id)': 'prepend'
                }
            }
        ];
    }



    getOptimisticResponse() {
        const {root, name} = this.props;

        return {
            root: {
                id: root.id
            },
            listEdge: {
                node: {
                    name: this.props.name
                }
            }
        };
    }
}
