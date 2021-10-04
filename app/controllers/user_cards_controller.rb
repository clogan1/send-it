class UserCardsController < ApplicationController

    # for QA only
    # def index
    #     render json: UserCard.all.order("created_at DESC")
    # end

    def show
        card = UserCard.find(params[:id])
        render json: card
    end

    def create
        user_card = UserCard.create!(user_card_params)
        render json: user_card, status: :created
    end

    def update
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
        user_card = UserCard.find(params[:id])
        user_card.destroy
        head :no_content
    end

    private 

    def user_card_params
        params.permit(:user_id, :template_id, :recipient_name, :recipient_email, :message, :is_sent, :schedule_send)
    end

    # def send_date_check
    #     user_card = UserCard.find(params[:id])
    #     return user_card unless user_card.schedule_send < DateTime.now
    # end
end
