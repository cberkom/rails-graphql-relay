class EditWidgetTableName < ActiveRecord::Migration
 def self.up
    rename_table :widgets, :lists
  end

 def self.down
    rename_table :lists, :widgets
 end
end
