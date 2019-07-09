class User < ApplicationRecord
  has_many :user_topics
  has_many :topics, through: :user_topics

  def followers(index)
    self.topics[index].followers
  end
end
