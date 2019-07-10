class TopicsController < ApplicationController

  def index
    topics = Topic.all
    render json: topics, only: [:id, :title]
  end

end
