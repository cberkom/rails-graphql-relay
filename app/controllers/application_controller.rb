class ApplicationController < ActionController::Base
  protect_from_forgery with: :null_session

  def start
    # render the page
  end

end
