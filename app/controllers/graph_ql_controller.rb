class GraphQlController < ApplicationController

  def execute
    puts '-' * 100, RelaySchema.prettify(params[:query]), '-' * 100
    result = RelaySchema.execute(params[:query], debug: true, variables: params[:variables])
    render json: result
  end

end
