class CreateFollowers < ActiveRecord::Migration[5.2]
  def change
    create_table :followers do |t|
      t.string :name
      t.string  :pic
      t.integer :age
      t.string :location

      t.timestamps
    end
  end
end
