import Relay from 'react-relay';

export default class EditListMutation extends Relay.Mutation {
    static fragments = {
        list: () => Relay.QL`
          fragment on List {
            id
        }
         `
    };

    getMutation() {
        console.log('mutation');
        return Relay.QL`mutation{editList}`;
    }

    getFatQuery() {
        console.log('fat query');
        return Relay.QL`
          fragment on EditListPayload {
            list {
                name
            }
        }
        `;
    }

    getConfigs() {
        console.log('configs');
        return [{
            type: 'FIELDS_CHANGE',
            fieldIDs: {
                list: this.props.list.id
            }
        }];
    }

    getVariables() {
        console.log('variables');
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
