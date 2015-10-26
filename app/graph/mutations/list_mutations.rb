module ListMutations
  Create = GraphQL::Relay::Mutation.define do
    name "CreateList"

    input_field :name, !types.String
    return_field :list, ListType

    resolve -> (inputs, ctx) {
      list = List.create({name: inputs[:name]})
      { list: list}
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

    resolve -> (inputs, ctx) {
      list = NodeIdentification.object_from_id_proc.call(inputs[:id])
      list.destroy
      { deletedId: inputs[:id] }
    }
  end
end
