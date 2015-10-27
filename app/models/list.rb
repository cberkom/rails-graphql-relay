class List < ActiveRecord::Base
  belongs_to :user
  has_many :items, class_name: 'ListItem'

  def key?(*args)
    $args = args
    $c = caller
  end
end
