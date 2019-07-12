Rails.application.routes.draw do
  resources :followers
  resources :follower_topics
  resources :topics
  resources :user_topics
  resources :users
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html

  post '/users/getfollowers', to: "users#seed_followers"
end
