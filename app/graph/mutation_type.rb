MutationType = GraphQL::ObjectType.define do
  name 'Mutation Type'

  field :destoryList, field: DestroyListMutation.field
  field :editList, field: EditListMutation.field
end
