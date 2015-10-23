import Relay from 'react-relay';

export default class AddListMutation extends Relay.Mutation {
    getMutation() {
        return Relay.QL`mutation{addList}`;
    }

    getFatQuery() {
        return Relay.QL`
      fragment on AddListPayload {
        ListEdge
      }
    `;
    }

    getConfigs() {
        return [
            {
                type: 'RANGE_ADD',
                connectionName: 'lists',
                edgeName: 'ListEdge',
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
        const {name} = this.props;

        return {
            ListEdge: {
                node: {
                    complete: false,
                    name
                }
            }
        };
    }
}
