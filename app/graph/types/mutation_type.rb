MutationType = GraphQL::ObjectType.define do
  name 'Mutation Type'

  field :editList, field: EditListMutation.field
end
