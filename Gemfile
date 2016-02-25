source 'https://rubygems.org'

ruby File.read(File.expand_path '../.ruby-version', __FILE__).strip.sub /\-p[0-9]+$/, ''

gem 'rails', '4.2.4'
gem 'sass-rails', '~> 5.0'
gem 'uglifier', '>= 1.3.0'
gem 'jquery-rails'
gem 'puma'
gem 'pry-rails'
gem 'pg'
gem 'faker'
gem 'bootstrap-sass'

gem 'sprockets-es6'
gem 'browserify-rails'
gem 'graphql'
gem 'graphql-relay'
gem 'graphql-formatter'

group :doc do
  gem 'sdoc', '~> 0.4.0'
end

group :production do
  gem 'rails_12factor'
end

group :development, :test do
  gem 'sqlite3'
  gem 'pry-byebug'
end

group :development do
  gem 'web-console', '~> 2.0'
end

