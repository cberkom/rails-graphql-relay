class GraphQlController < ApplicationController

  def execute
    result = RelaySchema.execute(params[:query])
    render json: result
  end

end
