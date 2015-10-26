import Relay from 'react-relay';

export default class EditListMutation extends Relay.Mutation {
    getMutation() {
        return Relay.QL`mutation{EditList}`;
    }

    getFatQuery() {
        return Relay.QL`
          fragment on EditListPayload {
            list {
                name
            }
        }
        `;
    }

    getConfigs() {
        return [{
            type: 'FIELDS_CHANGE',
            fieldIDs: {
                list: this.props.list.id
            }
        }];
    }

    getVariables() {
        return {
            id: this.props.list.id,
            name: this.props.name
        };
    }

    getOptimisticResponse() {
        return {
            list: {
                id: this.props.list.id,
                name: this.props.name
            }
        };
    }
}
