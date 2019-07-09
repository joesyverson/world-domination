class Follower < ApplicationRecord
  has_many :follower_topics
  has_many :topics, through: :follower_topics
end
