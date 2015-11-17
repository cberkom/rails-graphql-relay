require "execjs"
class ApplicationController < ActionController::Base
  # protect_from_forgery with: :null_session

  def start

    render
  end

  private

  def compile
    binding.pry
    `node #{Rails.root.join('app/assets/javascripts/server.js')} --path #{request.path}, --host #{}`
  end
end
