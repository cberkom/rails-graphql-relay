ListItemType = GraphQL::ObjectType.define do
  name 'List Item'
  description 'A list item'

  interfaces [NodeIdentification.interface]

  field :id, field: GraphQL::Relay::GlobalIdField.new('ListItem')
  field :name, types.String
  field :body, types.String
end
