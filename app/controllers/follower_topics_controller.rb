class FollowerTopicsController < ApplicationController

  def index
    follower_topics = FollowerTopic.all
    render json: follower_topics
  end

  def create
    follower_topics = FollowerTopic.makeMany
    render json: follower_topics
  end

  def destroy
    follower_topics = FollowerTopic.all
    follower_topics.destroy_all
  end

end
