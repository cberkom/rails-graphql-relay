import Relay from 'react-relay';

export default class CreateListMutation extends Relay.Mutation  {

    getMutation() {
        return Relay.QL`mutation{CreateList}`;
    }

    getFatQuery() {
        return Relay.QL`
          fragment on CreateListPayload {
            root {
                lists
            },
            listEdge
        }
        `;
    }

    getConfigs() {
        return [
            {
                type: 'FIELDS_CHANGE',
                fieldIDs: {
                    root: this.props.root.id
                }
            },
            {
                type: 'RANGE_ADD',
                parentName: 'root',
                parentID: this.props.root.id,
                connectionName: 'lists',
                edgeName: 'listEdge',
                rangeBehaviors: {
                    '': 'append',
                    'orderby(newest)' : 'prepend'
                }
            },
            {
                type: 'REQUIRED_CHILDREN',
                children: [Relay.QL`
                    fragment on CreateListPayload {
                        listEdge
                    }
                 `],
            }
        ];
    }

    getVariables() {
        return {
            name: this.props.name
        };
    }

    getOptimisticResponse() {
        const {root, name} = this.props;

        return {
            root: {
                id: root.id
            },
            listEdge: {
                node: {
                    name: name
                }
            }
        };
    }
}
