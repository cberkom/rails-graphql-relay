class Page extends React.Component {
    render() {
        return (
            <div>
                <h1>List list</h1>
                <ul>
                    {this.props.viewer.lists.edges.map(edge =>
                            <li>{edge.node.name} (ID: {edge.node.id})</li>
                    )}
                </ul>
            </div>
        );
    }
}

module.exports = {
    page: Page,
    queries: Queries
};