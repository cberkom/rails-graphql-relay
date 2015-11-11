MutationType = GraphQL::ObjectType.define do
  name 'Mutation Type'

  field :EditList, field: ListMutations::Edit.field
  field :DestroyList, field: ListMutations::Destroy.field
  field :CreateList, field: ListMutations::Create.field

  field :CreateItem, field: ItemMutations::Create.field
  field :DestroyItem, field: ItemMutations::Destroy.field
  field :EditItem, field: ItemMutations::Edit.field
end
