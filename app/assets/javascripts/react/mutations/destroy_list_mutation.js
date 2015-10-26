import Relay from 'react-relay';

export default class DestroyListMutation extends Relay.Mutation {

    getMutation() {
        debugger;
        return Relay.QL`mutation{DestroyList}`;
    }

    getFatQuery() {
        debugger;
        return Relay.QL`
            fragment on DestroyListPayload {
                list
        }
    `;
    }

    getConfigs() {
        debugger;
        return [{
            type: 'NODE_DELETE',
            connectionName: 'lists',
            deletedIDFieldName: 'list'
        }];
    }

    getVariables() {
        debugger;
        return {
            id: this.props.list.id
        };
    }

    getOptimisticResponse() {
        debugger;
        const {list} = this.props;

        return {
            deletedId: this.props.list.id
        };
    }
}
