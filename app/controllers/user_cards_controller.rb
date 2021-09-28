class UserCardsController < ApplicationController

    def index
        render json: UserCard.all.order("created_at DESC")
    end

    def create
        user_card = UserCard.create!(user_card_params)
        # template_url = user_card.template.art_url
        #     if user_card
        #       CardMailer.send_card(user_card, template_url).deliver_later(wait_until: user_card.schedule_send)
        #     end
        render json: user_card, status: :created

    end

    def update
        # if send_date_check
        #     user_card = send_date_check.update!(user_card_params)
        #     render json: user_card, status: :accepted
        # else
        #      render json: {error: 'You cannot edit a card that has already been sent.'}
        # end 
        user_card = UserCard.find(params[:id])
        user_card.update!(user_card_params)
        render json: user_card, status: :accepted
    end
    
    def email_card
        user_card = UserCard.find(params[:id])
        user_card.update!(user_card_params)
        template_url = user_card.template.art_url
        sending_user = User.find(user_card.user_id)
        CardMailer.send_card(user_card, template_url, sending_user).deliver_now
        render json: user_card, status: :accepted
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
