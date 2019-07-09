class FollowerTopic < ApplicationRecord
  belongs_to :follower
  belongs_to :topic
end
