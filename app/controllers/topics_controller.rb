class TopicsController < ApplicationController

  def index
    topics = Topic.all
    render json: topics, only: [:title]
  end

end
