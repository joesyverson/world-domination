class UsersController < ApplicationController

  def index
    users = User.all
    render json: users, only: [:id, :user_name, :pic]
  end

  def show
    user = User.find_by(id: params[:id])
    topics = user.topics
    followers = topics.map {|topic| {followers: topic.followers, title: topic.title}}
    new_followers = followers.map do |f_hsh|
      {title: f_hsh[:title], followers_for_topic:
        f_hsh[:followers].map do |follower|
          follower = {id: follower.id, name: follower.name, pic: follower.pic, age: follower.age}
        end.uniq
      }
    end
    render json: {id: user.id, user_name: user.user_name,  pic: user.pic, topics: topics, followers: new_followers}
    # render json: followers
  end

end
