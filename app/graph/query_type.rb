# ...and a query root
QueryType = GraphQL::ObjectType.define do
  name "Query"
  description "The query root of this schema"

  field :node, field: NodeIdentification.field

  field :viewer, UserType do
    resolve -> (obj, args, ctx) { User.first }
  end

  connection :widgets, WidgetType.connection_type do
    resolve ->(object, args, ctx){
      Widget.all
    }
  end

  connection :users, UserType.connection_type do
    resolve ->(object, args, ctx){
      User.all
    }
  end
end
