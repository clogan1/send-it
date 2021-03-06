class Contributor < ApplicationRecord
    belongs_to :user
    belongs_to :user_card
    

    validates :message, length: { in: 0..2000, too_long: "Your message exceeds the 2,000 character limit." }
    validates :email, uniqueness: { scope: :user_card, message: "has already been added as a contributor." }
    validates :user, presence: true

end
