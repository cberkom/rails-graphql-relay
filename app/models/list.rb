class List < ActiveRecord::Base
  belongs_to :user
  has_many :items, class_name: 'ListItem', dependent: :destroy

  def key?(*args)
    $args = args
    $c = caller
  end
end
