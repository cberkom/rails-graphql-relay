# ...and a query root
QueryType = GraphQL::ObjectType.define do
  name "Query"
  description "The query root of this schema"

  field :node, field: NodeIdentification.field

  field :viewer, UserType do
    resolve -> (obj, args, ctx) { User.first }
  end
end
