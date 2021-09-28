class CardMailer < ApplicationMailer
    default from: 'senditcardco@gmail.com'

    def send_card(user_card, template)
        @user_card = user_card
        @template = template
        mail(to: user_card.recipient_email, subject: 'Card from Send It')
    end
end
