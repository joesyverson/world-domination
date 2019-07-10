class UsersController < ApplicationController

  def index
    users = User.all
    render json: users, only: [:id, :user_name, :pic]
  end

  def show
    user = User.find_by(id: params[:id])
    topics = user.topics
    new_followers = user.getFollowers(topics)
    render json: {id: user.id, user_name: user.user_name,  pic: user.pic, topics: topics, followers: new_followers}
  end

end
