import React from 'react';
import Relay from 'react-relay';
import 'babel-core/polyfill';

import {Link} from 'react-router';

export class Widget extends React.Component {
    render() {
        var {widget} = this.props;
        return (
            <div>
                <h1>Widget {widget.name}</h1>
                <div>
                    {widget.id}
                </div>
                <div>
                    <Link to="/">Home</Link>
                </div>
            </div>
        );
    }
}

export const Queries = {
    widget: (Component) => Relay.QL`
            query {
                widget(id: $id) {
                    ${Component.getFragment('widget')},
                },
            }
        `
};

export const RelayContainer = Relay.createContainer(Widget, {
    fragments: {
        widget: () => Relay.QL`
            fragment on Widget {
                id,
                name,
            }
        `
    }
});

export const PrepareParams = (params, route) => {
    params.id = parseInt(params.id);
    return {...params};
};
