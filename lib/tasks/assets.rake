namespace :graphql do
  task :generate_schema do
    RelaySchema.generate
  end
end

Rake::Task['assets:precompile'].enhance ['graphql:generate_schema']