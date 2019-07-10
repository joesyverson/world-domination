class UserTopicsController < ApplicationController

  def create
    user_topic = UserTopic.create(user_id: params[:user_id], topic_id: params[:topic_id])
    render json: user_topic
  end

  def index
    user_topics = UserTopic.all
    render json: user_topics
  end

  def destroy
    user_topic = UserTopic.find_by(id: params[:id])
    user_topic.destroy
  end

end
