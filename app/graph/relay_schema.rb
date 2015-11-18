RelaySchema = GraphQL::Schema.new(query: QueryType, mutation: MutationType)

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

def RelaySchema.generate
  path   = Rails.root.join('app/assets/javascripts/relay/schema.json')
  result = JSON.pretty_generate(RelaySchema.explain)
  File.write(path, result) unless File.exists?(path) && File.read(path) == result
end
