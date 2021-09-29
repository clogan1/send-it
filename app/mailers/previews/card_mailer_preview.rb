class CardMailerPreview < ActionMailer::Preview

    def send_card
        user_card = UserCard.find(41)
        template = Template.find(user_card.template_id)
        sending_user = User.find(user_card.user_id)
        CardMailer.send_card(user_card, template, sending_user)
    end
    
end