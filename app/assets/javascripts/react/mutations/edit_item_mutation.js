import Relay from 'react-relay';

export default class EditItemMutation extends Relay.Mutation {
    getMutation() {
        return Relay.QL`mutation{EditItem}`;
    }

    getFatQuery() {
        return Relay.QL`
          fragment on EditItemPayload {
            item {
                id,
                name
            }
        }
        `;
    }

    getConfigs() {
        return [{
            type: 'FIELDS_CHANGE',
            fieldIDs: {
                item: this.props.item.id
            }
        }];
    }

    getVariables() {
        return {
            id: this.props.item.id,
            name: this.props.name
        };
    }

    getOptimisticResponse() {
        return {
            item: {
                id: this.props.item.id,
                name: this.props.name
            }
        };
    }
}
