RootLevelType = GraphQL::ObjectType.define do
  name 'RootLevel'
  description 'Unassociated root object queries'

  connection :lists, ListType.connection_type do
    resolve ->(object, args, ctx){
      List.all
    }
  end

  connection :users, UserType.connection_type do
    resolve ->(object, args, ctx){
      User.all
    }
  end
end