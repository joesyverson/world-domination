class CreateFollowerTopics < ActiveRecord::Migration[5.2]
  def change
    create_table :follower_topics do |t|
      t.integer :topic_id
      t.integer :follower_id

      t.timestamps
    end
  end
end
