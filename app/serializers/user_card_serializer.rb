class UserCardSerializer < ActiveModel::Serializer
  attributes :id, :recipient_email, :recipient_name, :message, :is_sent, :schedule_send, :created_at, :template_id

  belongs_to :template
  belongs_to :user
  has_many :contributors
end
