class UserSerializer < ActiveModel::Serializer
  attributes :id, :username, :email, :avatar_url, :role, :count_of_user_cards

  belongs_to :role

  def count_of_user_cards
    self.object.user_cards.count
  end

end
