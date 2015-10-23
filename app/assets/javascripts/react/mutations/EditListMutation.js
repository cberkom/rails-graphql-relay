import Relay from 'react-relay';

export default class EditListMutation extends Relay.Mutation {
    //static fragments = {
    //    list: () => Relay.QL`
    //      fragment on List {
    //        id,
    //        name
    //    }
    //     `
    //};

    getMutation() {
        return Relay.QL`mutation{editList}`;
    }

    getFatQuery() {
        return Relay.QL`
          fragment on EditListPayload {
            list {
                id,
                name
            }
        }
        `;
    }

    getConfigs() {
        debugger;
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
