import Relay from 'react-relay';

export default class DestroyListMutation extends Relay.Mutation {
    getMutation() {
        return Relay.QL`mutation{DestroyList}`;
    }

    getFatQuery() {
        return Relay.QL`
           fragment on DestroyListPayload {
            deletedId
           }
           `;
    }

    getConfigs() {
        return [{
            type: 'RANGE_DELETE',
            connectionName: 'lists',
            parentId: 'root',
            parentName: 'root',
            deletedIDFieldName: 'deletedId'
        }];
    }

    getVariables() {
        return {
            id: this.props.list.id
        };
    }

    getOptimisticResponse() {
        const {list} = this.props;

        return {
            deletedId: list.id
        };
    }
}
