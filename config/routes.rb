Rails.application.routes.draw do
  
  resources :contributors, only: [:create, :update, :index]
  resources :user_cards, only: [:create, :update, :destroy, :index] do
    resources :contributors, only: [:index]
  end
  resources :templates, only: [:index, :create]
  resources :categories, only: [:index, :show]
  resources :users, only: [:show, :create, :update, :index] do
    resources :user_cards, only: [:index]
    # resources :contributors, only: [:index]
  end

  post '/signup', to: 'users#create'
  post '/login', to: 'sessions#create'
  delete '/logout', to: 'sessions#destroy'
  get '/me', to: 'users#show'
  get '/mycards', to: 'users#mycards'
  patch '/sendcard/:id', to: 'user_cards#email_card'
  get '/enduserrole', to: 'roles#end_user_role'
  # resources :roles
  # Routing logic: fallback requests for React Router.
  # Leave this here to help deploy your app later!
  get "*path", to: "fallback#index", constraints: ->(req) { !req.xhr? && req.format.html? }
end
