class UserSerializer < ActiveModel::Serializer
  attributes :id, :username, :email, :avatar_url, :role

  belongs_to :role
end
