class CreateListItems < ActiveRecord::Migration
  def change
    create_table :list_items do |t|
      t.belongs_to :list, index: true, foreign_key: true
      t.string :name
      t.text :body

      t.timestamps null: false
    end
  end
end
