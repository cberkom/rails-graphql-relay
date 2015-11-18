namespace :assets do
  task :precompile do
    RelaySchema.generate
  end
end