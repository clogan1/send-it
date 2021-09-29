class RolesController < ApplicationController

    def end_user_role
        role = Role.find_by(name: "End User")
        render json: role
    end
   
end
