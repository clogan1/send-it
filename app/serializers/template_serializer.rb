class TemplateSerializer < ActiveModel::Serializer
  attributes :id, :name, :art_url, :artist_name, :count_of_user_cards, :created_at
  belongs_to :category

  def count_of_user_cards
    self.object.user_cards.count
  end
end
