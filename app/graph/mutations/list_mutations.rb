module ListMutations
  Edit = GraphQL::Relay::Mutation.define do
    name "EditList"

    input_field :name, !types.String
    return_field :list, ListType

    resolve -> (inputs, ctx) {
      list = List.find(inputs[:id])
      list.update(inputs)
      { list: list }
    }
  end
end
