class CreateUserCards < ActiveRecord::Migration[6.1]
  def change
    create_table :user_cards do |t|
      t.belongs_to :template, null: false, foreign_key: true
      t.belongs_to :user, null: false, foreign_key: true
      t.string :recipient_email
      t.string :recipient_name
      t.text :message
      t.boolean :is_sent
      t.datetime :schedule_send

      t.timestamps
    end
  end
end
