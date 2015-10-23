MutationType = GraphQL::ObjectType.define do
  name 'Mutation Type'

  field :EditList, field: ListMutations::Edit.field
  field :DestroyList, field: ListMutations::Destroy.field
end
