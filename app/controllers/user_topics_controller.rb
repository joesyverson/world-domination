class UserTopicsController < ApplicationController

  def create
    UserTopic.create(user_id: params[:user_id], topic_id: params[:topic_id])
  end

end
