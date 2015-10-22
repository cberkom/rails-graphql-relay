import React from 'react';
import Relay from 'react-relay';
import 'babel-core/polyfill';

import {Link} from 'react-router';

class WidgetListItem extends React.Component {
    render() {
        return (
            <li>
                <Link to={`/widgets/${this.props.widget.id}`}>{this.props.widget.name}</Link>
            </li>
        )
    }
}

class WidgetList extends React.Component {
    render() {
        var {widgets} = this.props;
        var widgetListItems = widgets.edges.map(edge =>
            <WidgetListItem key={edge.node.id} widget={edge.node}/>
        );

        return (
            <div>
                <h1>Widgets</h1>
                <ul>
                    {widgetListItems}
                </ul>
            </div>
        );
    }
}

export const Queries = {
    widgets: (Component) => Relay.QL`
        query {
          widgets {
            ${Component.getFragment('widgets')},
          }
        }
    `
};

export const RelayContainer = Relay.createContainer(WidgetList, {
    fragments: {
        widgets: () => Relay.QL`
            fragment on WidgetConnection {
                edges {
                    node {
                        id,
                        name,
                    }
                }
            }
        `
    }
});
