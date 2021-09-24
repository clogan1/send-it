class UserCardsController < ApplicationController

    def index
        render json: UserCard.all.order("created_at ASC")
    end

    def create
        user_card = UserCard.create!(user_card_params)
        render json: user_card, status: :created
    end

    def update
        if send_date_check
            user_card = send_date_check.update!(user_card_params)
            render json: user_card, status: :accepted
        else
            render json: {error: 'You cannot edit a card that has already been sent.'}
        end 
    end

    def destroy
        if send_date_check
            send_date_check.destroy 
            head :no_content
        else
            render json: {error: 'You cannot delete a card that has already been sent.'}
        end
    end

    private 

    def user_card_params
        params.permit(:user_id, :template_id, :recipient_name, :recipient_email, :message, :is_sent, :schedule_send)
    end

    def send_date_check
        user_card = UserCard.find(params[:id])
        return user_card unless user_card.schedule_send < DateTime.now
    end
end
