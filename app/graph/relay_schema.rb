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

def RelaySchema.prettify(str)
  indent_count = 0
  indent_char = ' ' * 4
  str.chars.each_with_object('') do |char, string|
    case char
    when '{'
      indent_count += 1
      string << ' ' unless string[-1] == ' '
      string << char << "\n" << (indent_char * indent_count)
    when '}'
      indent_count -= 1
      string << "\n" unless string[-2..-1] == "}\n"
      string << (indent_char * indent_count)
      string << char
      string << "\n"
    when ','
      if string[-2..-1] == "}\n"
        string[-2..-1] = "},"
      else
        string << char
      end
      string << "\n"
      string << (indent_char * indent_count)
    when ' '
      string << char unless string[-1] == "\n"
    else
      string << char
    end
  end
end
