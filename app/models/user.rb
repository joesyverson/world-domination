class User < ApplicationRecord
  has_many :user_topics
  has_many :topics, through: :user_topics

  def followers(index)
    self.topics[index].followers
  end

  def getFollowers(topics)
    followers = topics.map {|topic| {followers: topic.followers, title: topic.title}}
    new_followers = followers.map do |f_hsh|
      {title: f_hsh[:title], followers_for_topic:
        f_hsh[:followers].map do |follower|
          follower = {id: follower.id, name: follower.name, pic: follower.pic, age: follower.age}
        end.uniq
      }
    end
  end

end
