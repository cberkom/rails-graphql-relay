class GraphQlController < ApplicationController

  def execute
    puts params[:query]
    result = RelaySchema.execute(params[:query], debug: true)
    render json: result
  end

end
