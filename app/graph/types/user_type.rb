UserType = GraphQL::ObjectType.define do
  name 'User'
  description 'A person who uses our app'

  interfaces [NodeIdentification.interface]

  field :id, field: GraphQL::Relay::GlobalIdField.new('User')
  field :first_name, types.String
  field :last_name, types.String
  field :email, types.String

  connection :lists, ListType.connection_type do
    resolve ->(user, args, ctx){
      user.lists
    }
  end
end
