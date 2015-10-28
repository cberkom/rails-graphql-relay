import Relay from 'react-relay';

export default class extends Relay.Mutation  {

    getMutation() {
        return Relay.QL`mutation{CreateList}`;
    }

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

    getVariables() {
        return {
            name: this.props.name
        };
    }

    getOptimisticResponse() {
        const {root, name} = this.props;

        return {
            listEdge: {
                node: {
                    name: this.props.name
                }
            }
        };
    }
}
