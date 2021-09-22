class User < ApplicationRecord
    has_secure_password
    
    belongs_to :role

    validates :username, presence: true, uniqueness: true
    validates :email, presence: true, uniqueness: true
    validates :password, presence: true, length: { in: 6..40, too_short: "Your password must be at least 6 characters long." }

end
