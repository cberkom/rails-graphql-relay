class GraphQlController < ApplicationController

  def execute
    puts '-' * 100, params[:query], '-' * 100
    binding.pry
    result = RelaySchema.execute(params[:query], debug: true, variables: params[:variables])
    render json: result
  end

end
