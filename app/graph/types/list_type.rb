ListType = GraphQL::ObjectType.define do
  name 'List'
  description 'A shiny list'

  interfaces [NodeIdentification.interface]

  field :id, field: GraphQL::Relay::GlobalIdField.new('List')
  field :name, types.String
end
<<<<<<< HEAD:app/graph/list_type.rb

EditListMutation = GraphQL::Relay::Mutation.define do
  name "EditList"

  input_field :listName, !types.String

  return_field :list, ListType

  resolve -> (inputs, ctx) {
    list = ListType
    {list: list}
  }
end


AddListMutation = GraphQL::Relay::Mutation.define do
  name "AddList"

  input_field :listName, !types.String

  return_field :list, ListType

  resolve -> (inputs, ctx) {
    list = ListType
    {list: list}
  }
end
=======
>>>>>>> 8fd04c7ac80b73002b54cb407dad2f252ab739eb:app/graph/types/list_type.rb
