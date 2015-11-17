require "execjs"
class ApplicationController < ActionController::Base
  # protect_from_forgery with: :null_session

  def start
    # render html: "<script>#{get_script}</script>".html_safe
    render html: get_js
  end

  def get_js
    context = ExecJS.compile get_script
    binding.pry
    context.call <<-javascript.html_safe
      global.renderToString("#{request.path}")
    javascript
  end

  def get_script
    Babel::Transpiler.transform Rails.root.join('app/assets/javascripts/server.es6')
  end
end
