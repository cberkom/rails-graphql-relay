import Relay from 'react-relay';

export default class DestroyListMutation extends Relay.Mutation {
    static fragments = {
            // WIDGET: Mark complete as optional.
            list: () => Relay.QL`
                fragment on List {
                    id
                }
            `,
    };

    getMutation() {
        return Relay.QL`mutation{DestroyList}`;
    }

    getFatQuery() {
        return Relay.QL`
            fragment on DestroyListPayload {
            list,
        }
    `;
    }

    getConfigs() {
        return [{
            type: 'NODE_DELETE',
            connectionName: 'lists',
            deletedIDFieldName: 'DestroyListId'
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
            deletedId: this.props.list.id
        };
    }
}
