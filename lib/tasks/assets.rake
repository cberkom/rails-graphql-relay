namespace :graphql do
  task :generate_schema do
    puts 'Generating Relay Schema...'
    RelaySchema.generate
  end

  task :remove_schema do
    RelaySchema.remove
  end
end

Rake::Task['assets:precompile'].enhance ['graphql:generate_schema']
Rake::Task['assets:clobber'].enhance ['graphql:remove_schema']