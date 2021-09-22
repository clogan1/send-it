class ContributorSerializer < ActiveModel::Serializer
  attributes :id, :message, :email, :user_id, :user_card_id

  belongs_to :user
  belongs_to :user_card
end
