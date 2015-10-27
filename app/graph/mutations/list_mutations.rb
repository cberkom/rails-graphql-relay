module ListMutations
  Create = GraphQL::Relay::Mutation.define do
    name "CreateList"

    input_field :name, !types.String

    return_field :listEdge, ListType.edge_type
    return_field :root, RootLevelType

    resolve -> (inputs, ctx) {
      root = RootLevel::STATIC
      list = List.create({name: inputs[:name]})

      connection = GraphQL::Relay::RelationConnection.new(root, {})
      edge = GraphQL::Relay::Edge.new(list, connection)

      { root: root, listEdge: edge }
    }
  end

  Edit = GraphQL::Relay::Mutation.define do
    name "EditList"

    input_field :id, !types.ID
    input_field :name, !types.String

    return_field :list, ListType

    resolve -> (inputs, ctx) {
      list = NodeIdentification.object_from_id_proc.call(inputs[:id])
      valid_inputs = inputs.instance_variable_get(:@values).select { |k, _| list.respond_to? "#{k}=" }.except('id')
      list.update(valid_inputs)
      { list: list }
    }
  end

  Destroy = GraphQL::Relay::Mutation.define do
    name "DestroyList"

    input_field :id, !types.ID
    return_field :deletedId, !types.ID
    return_field :root, RootLevelType

    resolve -> (inputs, ctx) {
      list = NodeIdentification.object_from_id_proc.call(inputs[:id])
      list.destroy
      { root: RootLevel::STATIC, deletedId: inputs[:id] }
    }
  end
end
