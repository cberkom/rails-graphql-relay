module ItemMutations
  Create = GraphQL::Relay::Mutation.define do
    name "CreateItem"

    input_field :list_id, !types.ID
    input_field :name, !types.String

    return_field :itemEdge, ItemType.edge_type
    return_field :list, ListType

    resolve -> (inputs, ctx) {
      list = NodeIdentification.object_from_id_proc.call(inputs[:list_id])
      item = list.items.create({name: inputs[:name]})

      connection = GraphQL::Relay::RelationConnection.new(list, {})
      edge = GraphQL::Relay::Edge.new(item, connection)

      { list: list, itemEdge: edge }
    }
  end

  Edit = GraphQL::Relay::Mutation.define do
    name "EditItem"

    input_field :id, !types.ID
    input_field :name, !types.String

    return_field :item, ItemType

    resolve -> (inputs, ctx) {
      item = NodeIdentification.object_from_id_proc.call(inputs[:id])
      valid_inputs = inputs.instance_variable_get(:@values).select { |k, _| item.respond_to? "#{k}=" }.except('id')
      item.update(valid_inputs)
      { item: item }
    }
  end

  Destroy = GraphQL::Relay::Mutation.define do
    name "DestroyItem"

    input_field :id, !types.ID
    input_field :list_id, !types.ID

    return_field :deletedId, !types.ID
    return_field :list, ListType

    resolve -> (inputs, ctx) {
      list = NodeIdentification.object_from_id_proc.call(inputs[:list_id])
      item = NodeIdentification.object_from_id_proc.call(inputs[:id])
      item.destroy
      { list: list, deletedId: inputs[:id] }
    }
  end
end
