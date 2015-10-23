ListType = GraphQL::ObjectType.define do
  name 'List'
  description 'A shiny list'

  interfaces [NodeIdentification.interface]

  field :id, field: GraphQL::Relay::GlobalIdField.new('List')
  field :name, types.String
end

EditListMutation = GraphQL::Relay::Mutation.define do
  name "EditList"

  input_field :listName, !types.String

  return_field :list, ListType

  resolve -> (inputs, ctx) {
 
  }
end
