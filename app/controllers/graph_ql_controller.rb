class GraphQlController < ApplicationController

  def execute
    puts params[:query]
    result = RelaySchema.execute(params[:query], debug: true, variables: params[:variables])
    render json: result
  end

end
