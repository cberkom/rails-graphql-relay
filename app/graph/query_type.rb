# ...and a query root
QueryType = GraphQL::ObjectType.define do
  name "Query"
  description "The query root of this schema"

  field :node, field: NodeIdentification.field

  field :current_user, UserType do
    resolve -> (obj, args, ctx) do
      ctx.current_user
    end
  end

  connection :widgets, WidgetType.connection_type do
    resolve ->(object, args, ctx){
      Widget.all
    }
  end

  field :widget do
    type WidgetType
    argument :id, !types.Int
    resolve -> (obj, args, ctx){ Widget.find args[:id] }
  end

  connection :users, UserType.connection_type do
    resolve ->(object, args, ctx){
      User.all
    }
  end
end
