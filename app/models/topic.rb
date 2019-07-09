class Topic < ApplicationRecord
  has_many :user_topics
  has_many :users, through: :user_topics
  has_many :follower_topics
  has_many :followers, through: :follower_topics
end
