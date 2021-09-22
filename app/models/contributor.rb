class Contributor < ApplicationRecord
    belongs_to :user
    belongs_to :user_card

    validates :message, length: { in: 1..2000, too_long: "Your message exceeds the 2,000 character limit." }
end
