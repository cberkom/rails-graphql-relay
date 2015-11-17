import Relay from 'react-relay';

export default class DestroyItemMutation extends Relay.Mutation {
    getMutation() {
        return Relay.QL`mutation{DestroyItem}`;
    }

    getFatQuery() {
        return Relay.QL`
           fragment on DestroyItemPayload {
            list {
                items
            },
            deletedId
           }
           `;
    }

    getConfigs() {
        return [
            {
                type: 'FIELDS_CHANGE',
                fieldIDs: {
                    list: this.props.list.id
                }
            },
            {
                type: 'NODE_DELETE',
                parentName: 'list',
                parentID: this.props.list.id,
                connectionName: 'items',
                deletedIDFieldName: 'deletedId'
            }
        ];
    }

    getVariables() {
        return {
            list_id: this.props.list.id,
            id: this.props.item.id
        };
    }

    getOptimisticResponse() {
        const {list, item} = this.props;
        const listPayload = {id: list.id};

        return {
            list: listPayload,
            deletedId: item.id
        };
    }
}
