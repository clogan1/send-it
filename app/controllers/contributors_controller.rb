class ContributorsController < ApplicationController

    def index
        render json: Contributor.all
    end

    def create
        if create_sent_check
            new_contrib = Contributor.create!(contributor_params)
            render json: new_contrib, status: :created
        else
            render json: {error: 'You cannot add to a card that has already been sent.'}
        end
    end

    def updated
        if sent_card_check
            contrib = sent_card_check.update!(contributor_params)
            render json: contrib, status: :created
        else
            render json: {error: 'You cannot edit a card that has already been sent.'}
        end
    end

    private

    def contributor_params
        params.permit(:user_id, :user_card_id, :message, :email)
    end

    def create_sent_check
        user_card = UserCard.find(params[:user_card_id])
        return true unless user_card.schedule_send < DateTime.now
    end

    def sent_card_check
        contributor = Contributor.find(params[:id])
        user_card = UserCard.find(contributor.user_card_id)
        return contributor unless user_card.schedule_send < DateTime.now
    end
end
