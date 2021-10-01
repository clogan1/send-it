class Template < ApplicationRecord
    belongs_to :category
    has_many :user_cards


    validates :name, presence: true, uniqueness: true
    validates :art_url, presence: true, uniqueness: true
end
