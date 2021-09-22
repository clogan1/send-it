class UserCard < ApplicationRecord
    belongs_to :user
    belongs_to :template
    has_many :contributors, dependent: :destory 

    validates :recipient_name, presence: true
    validates :recipient_email, presence: true
    validates :message, presence: true, length: { in: 1..2000, too_long: "Your message exceeds the 2,000 character limit." }
    # validates :is_sent, presence: true
    validates :schedule_send, presence: true
end
