ListType = GraphQL::ObjectType.define do
  name 'List'
  description 'A shiny list'

  interfaces [NodeIdentification.interface]

  field :id, field: GraphQL::Relay::GlobalIdField.new('List')
  field :name, types.String

  connection :items, ListItemType.connection_type do
    resolve ->(list, args, ctx){
      list.items
    }
  end
end


