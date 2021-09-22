class UsersController < ApplicationController
    # skip_before_action :authorize, only: :create

    # delete before publishing
    def index
        render json: User.all
    end
    
    # /signup 
    def create
        user = User.create!(user_params)
        session[:user_id] = user.id
        render json: user, status: :created
    end

    # /me
    def show
        user = User.find_by(id: session[:user_id])
        render json: user, status: :created
    end


    # /users/:id
    def update
        user = User.find_by(id: session[:user_id])
        user.update!(user_params)
        render json: user, status: :accepted
    end
    
    private

    def user_params
        params.permit(:username, :email, :password, :password_confirmation, :avatar_url, :role_id)
    end
end
