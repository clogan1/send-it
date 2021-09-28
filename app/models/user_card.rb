class UserCard < ApplicationRecord
    belongs_to :user
    belongs_to :template
    has_many :contributors, dependent: :destroy 

    validates :recipient_name, presence: true
    validates :recipient_email, presence: true
    validates :message, presence: true, length: { in: 1..2000, too_long: "Your message exceeds the 2,000 character limit." }
    # validates :is_sent, presence: true
    # validates :schedule_send, presence: true
    # validate :schedule_send_in_future

    def schedule_send_in_future
        if self.schedule_send < DateTime.now
            errors.add(:schedule_send, 'Scheduled send date must be in the future.')
        end
    end

end
