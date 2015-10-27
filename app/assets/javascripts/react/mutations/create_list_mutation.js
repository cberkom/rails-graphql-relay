import Relay from 'react-relay';

export default class CreateListMutation extends Relay.Mutation  {

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
                    'status(any)': 'append',
                    'status(active)': 'append',
                    'status(completed)': null
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
                    name
                }
            }
        };
    }
}
