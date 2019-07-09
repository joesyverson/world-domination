class UsersController < ApplicationController

  def index
    users = User.all
    render json: users, only: [:user_name]
  end

end
