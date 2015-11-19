require "execjs"
class ApplicationController < ActionController::Base
  # protect_from_forgery with: :null_session

  def start
    result = compile
    (result['headers'] || {}).each do |h, value|
      headers[h] = value
    end
    @scripts = result['scripts'] || []
    @body    = result['body'].try(:html_safe)
    render status: result['status']
  end

  private

  def compile
    error, output, exit_status = nil
    server                     = Rails.root.join('app/assets/javascripts/server.js')
    Open3.popen3(%{node #{server} --path "#{request.path}" --host #{request_hostname}}) { |i, o, e, t|
      i.close
      output      = o.read
      error       = e.read
      exit_status = t.value
    }
    raise error if exit_status.exitstatus > 0
    log, json = output.split('<-><-><-><-><-><-><-><-><->')
    puts log
    JSON.load(json)
  end

  def request_hostname
    URI.parse(request.url).tap { |u| u.path = '' }.to_s
  end
end
