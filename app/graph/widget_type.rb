WidgetType = GraphQL::ObjectType.define do
  name 'Widget'
  description 'A shiny widget'

  interfaces [NodeIdentification.interface]

  field :id, field: GraphQL::Relay::GlobalIdField.new('Widget')
  field :name, types.String
end
