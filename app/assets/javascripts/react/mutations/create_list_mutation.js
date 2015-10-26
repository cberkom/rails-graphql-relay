import Relay from 'react-relay';

export default class CreateListMutation extends Relay.Mutation  {

    getMutation() {
        return Relay.QL`mutation{CreateList}`;
    }

    getVariables() {
        return {
            name: this.props.name
        };
    }

    getFatQuery() {
        return Relay.QL`
          fragment on CreateListPayload {
            list
        }
        `;
    }

    getConfigs() {
        return [{
            type: 'FIELDS_CHANGE',
            fieldIDs: {
                list: this.props.list
            }
        }];
    }



    getOptimisticResponse() {
        const {name} = this.props.name;

        return {
            list: {
                name: name
            }
        };
    }
}
