import Relay from 'react-relay';

export default class extends Relay.Mutation  {

    getMutation() {
        return Relay.QL`mutation{CreateItem}`;
    }

    getFatQuery() {
        return Relay.QL`
          fragment on CreateItemPayload {
            itemEdge
        }
        `;
    }

    getConfigs() {
        return [
            {
                type: 'RANGE_ADD',
                connectionName: 'item',
                edgeName: 'itemEdge',
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
        const {name} = this.props.name;

        return {
            itemEdge: {
                node: {
                    name
                }
            }
        };
    }
}
