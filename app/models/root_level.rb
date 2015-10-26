class RootLevel < Struct.new :id
  STATIC = new(id: 'root').freeze
end