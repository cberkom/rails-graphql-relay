import Relay from 'react-relay';

export default class RemoveListMutation extends Relay.Mutation {
    static fragments = {
            // WIDGET: Mark complete as optional.
            list: () => Relay.QL`
            fragment on List {
                id
            }
            `,
    };

    getMutation() {
    console.log('mutation')
    debugger;
        return Relay.QL`mutation{removeList}`;
    }

    getFatQuery() {
    console.log('fat query');
    debugger;
        return Relay.QL`
          fragment on RemoveListPayload {
           list,
        }
        `;
    }

    getConfigs() {
    console.log('configs');
    debugger;
        return [{
            type: 'NODE_DELETE',
            connectionName: 'lists',
            deletedIDFieldName: 'destroyListId'
        }];
    }

    getVariables() {
    console.log('varibales');
    debugger;
        return {
            id: this.props.list.id
        };
    }

    getOptimisticResponse() {
    console.log('response');
    debugger;
        const {list} = this.props;

        return {
            deletedId: this.props.list.id
        };
    }
}
