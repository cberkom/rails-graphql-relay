RelaySchema = GraphQL::Schema.new(query: QueryType)

def RelaySchema.explain
  Rails.cache.fetch checksum do
    RelaySchema.execute GraphQL::Introspection::INTROSPECTION_QUERY
  end
end

def RelaySchema.checksum
  files   = Dir["app/graph/**/*.rb"].reject { |f| File.directory?(f) }
  content = files.map { |f| File.read(f) }.join
  Digest::SHA256.hexdigest(content).to_s
end
