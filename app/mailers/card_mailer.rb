class CardMailer < ApplicationMailer
    default from: 'senditcardco@gmail.com'

    def send_card(user_card, template, sending_user)
        @user_card = user_card
        @template = template
        @sending_user = sending_user
        mail(to: user_card.recipient_email, cc: sending_user.email, subject: "Card for #{user_card.recipient_name} from Send It")
    end
end
