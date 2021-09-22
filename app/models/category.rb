class Category < ApplicationRecord
    has_many :templates

    validates :name, presence: true, uniqueness: true
    validates :emoji, presence: true, uniqueness: true
end
