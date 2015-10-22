WidgetType = GraphQL::ObjectType.define do
  name 'Widget'
  description 'A shiny widget'

  field :id, types.Int
  field :name, types.String
end
