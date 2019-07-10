class FollowersController < ApplicationController

  def index
    followers = Follower.all
    followers.users
    render json: followers
  end

end
