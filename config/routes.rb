Rails.application.routes.draw do
  
  resources :contributors, only: [:create, :update]
  resources :user_cards, only: [:create, :update, :destroy,:show] do
    resources :contributors, only: [:index]
  end
  resources :templates, only: [:index, :create, :show]
  resources :categories, only: [:index, :show]
  resources :users, only: [:show, :create, :update] do
    resources :user_cards, only: [:index]
  end

  post '/signup', to: 'users#create'
  post '/login', to: 'sessions#create'
  delete '/logout', to: 'sessions#destroy'
  get '/me', to: 'users#show'
  get '/mycards', to: 'users#mycards'
  get '/mycontributions', to: 'users#mycontributors'
  patch '/sendcard/:id', to: 'user_cards#email_card'
  get '/enduserrole', to: 'roles#end_user_role'
  # Routing logic: fallback requests for React Router.
  # Leave this here to help deploy your app later!
  get "*path", to: "fallback#index", constraints: ->(req) { !req.xhr? && req.format.html? }
end
