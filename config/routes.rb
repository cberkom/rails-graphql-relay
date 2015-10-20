Rails.application.routes.draw do
  root to: 'application#start'
  post 'graphql' => 'graph_ql#execute'
end
