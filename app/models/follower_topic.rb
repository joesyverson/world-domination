class FollowerTopic < ApplicationRecord
  belongs_to :follower
  belongs_to :topic

  def self.makeMany
    follower_topics = []
    followers = Follower.all
    topics = Topic.all
    max = rand(10..99)
    for i in 0..max
      followerId = followers.sample(1)[0].id
      topicId = topics.sample(1)[0].id
      follower_topics << FollowerTopic.create(topic_id: topicId, follower_id: followerId)
    end
    follower_topics
  end

end
