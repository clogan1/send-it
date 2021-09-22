class CategorySerializer < ActiveModel::Serializer
  attributes :id, :name, :emoji, :count_of_templates
  # has_many :templates

  def count_of_templates
    self.object.templates.count
  end
end
