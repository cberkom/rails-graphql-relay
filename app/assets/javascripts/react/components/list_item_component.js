import React from 'react';
import Relay from 'react-relay';
import {Link} from 'react-router';
import classNames from 'classnames';


export class ListItem extends React.Component {

    render() {
        return (
           <li> Item </li>
        );
    }
}



export const RelayContainer = Relay.createContainer(ListItem, {
    fragments: {
        list_item: () => Relay.QL`
        fragment on ListItem {
            id,
            name
        }
        `
    }
});
