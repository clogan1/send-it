class SessionsController < ApplicationController
    # skip_before_action :authorize, only: :create
    
    # /login
    def create
        user = User.find_by(username: params[:username])
        if user&.authenticate(params[:password])
            session[:user_id] = user.id
            render json: user
        else
            render json: { errors: ["Invalid username and/or password"]}, status: :unauthorized
        end
    end


    # /logout
    def destroy
        session.delete :id
        head :no_content
    end

end
