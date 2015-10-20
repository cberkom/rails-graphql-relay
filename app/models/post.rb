class Post
  include ActiveModel::Model

  attr_accessor :id

  def self.find(id)
    new(id: id)
  end
end
