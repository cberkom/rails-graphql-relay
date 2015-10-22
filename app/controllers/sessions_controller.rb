class SessionsController < ApplicationController
  protect_from_forgery with: :exception

  def create
    self.current_user = User.find_by(params[:id])
  end

  def destroy
    reset_session
    head :ok
  end

  def show
    respond_to do |format|
      format.json do
        payload = { user_id: current_user.id }
        JWT.encode(payload)
      end
    end
  end

  private

  def current_user=(user)
    session[:user_id] = user.id
  end

  def current_user
    User.find_by(id: session[:user_id]) || User.new
  end

end