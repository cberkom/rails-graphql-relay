NodeIdentification = GraphQL::Relay::GlobalNodeIdentification.define do
  object_from_id -> (id) do
    type, id = NodeIdentification.from_global_id(id)
    TODO_DATA[type_name][id]
    type.constantize.find(id)
  end

  type_from_object -> (object) do
    (object.class.name + 'Type').constantize
  end
end
