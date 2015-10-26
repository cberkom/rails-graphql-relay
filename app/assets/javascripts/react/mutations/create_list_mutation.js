import Relay from 'react-relay';

export default class CreateListMutation extends Relay.Mutation {

    getMutation() {
        return Relay.QL`mutation{createList}`;
    }

    getFatQuery() {
        return Relay.QL`
          fragment on CreateListPayload {
            listEdge
        }
        `;
    }

    getConfigs() {
        return [
            {
                type: 'RANGE_ADD',
                connectionName: 'list',
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
            text: this.props.name
        };
    }

    getOptimisticResponse() {
        const {viewer, text} = this.props;

        return {
            listEdge: {
                node: {
                    complete: false,
                    name
                }
            }
        };
    }
}
