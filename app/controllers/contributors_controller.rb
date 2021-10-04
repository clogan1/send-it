class ContributorsController < ApplicationController

    # for QA only
    # def index
    #     render json: Contributor.all
    # end

    def create
            user = User.find_by(email: params[:email])
            if user
                new_contrib = user.contributors.create!(contributor_params)
                CardMailer.notify_contributor(user).deliver_now
                render json: new_contrib, status: :created
            else 
                render json: {errors: ['There are no users with that email address.']}
            end
    end

    def update
        if sent_card_check
            contrib = Contributor.find(params[:id])
            contrib.update!(contributor_params)
            render json: contrib, status: :created
        else
            render json: {error: 'You cannot edit a card that has already been sent.'}
        end
    end

    private

    def contributor_params
        params.permit(:user_id, :user_card_id, :message, :email)
    end

    def sent_card_check
        contributor = Contributor.find(params[:id])
        user_card = UserCard.find(contributor.user_card_id)
        return contributor unless user_card.is_sent == true
    end
end
