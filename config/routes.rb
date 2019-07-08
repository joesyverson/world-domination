Rails.application.routes.draw do
  resources :followers
  resources :follower_topics
  resources :topics
  resources :user_topics
  resources :users
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
