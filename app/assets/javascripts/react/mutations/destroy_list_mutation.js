import Relay from 'react-relay';

export default class extends Relay.Mutation {
    getMutation() {
        return Relay.QL`mutation{DestroyList}`;
    }

    getFatQuery() {
        return Relay.QL`
           fragment on DestroyListPayload {
            root {
              lists
            },
            deletedId
           }
           `;
    }

    getConfigs() {
        return [{
            type: 'NODE_DELETE',
            parentName: 'root',
            parentID: this.props.root.id,
            connectionName: 'lists',
            deletedIDFieldName: 'deletedId'
        }];
    }

    getVariables() {
        return {
            id: this.props.list.id
        };
    }

    getOptimisticResponse() {
        const {root, list} = this.props;
        const rootPayload = {id: root.id};

        return {
            deletedId: list.id
        };
    }
}
