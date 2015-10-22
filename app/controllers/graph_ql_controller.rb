class GraphQlController < ApplicationController

  AUTHORIZERS = {
    'jwt' => ->(token){ JWT.decode(token, Rails.applications.secrets.secret_key_base)[0] }
  }

  def execute
    puts params[:query]
    result = RelaySchema.execute(params[:query], context: { current_user: current_user })
    render json: result
  end

  private

  def current_user
    type, token = request.headers['Authentication'].to_s.split(' ')
    User.find_by(id: authorizer(type).call(token)['user_id']) || User.new
  end

  def authorizer(type)
    AUTHORIZERS[type] || Proc.new { Hash.new }
  end

end
