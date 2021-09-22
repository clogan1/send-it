class CreateUsers < ActiveRecord::Migration[6.1]
  def change
    create_table :users do |t|
      t.string :username
      t.string :email
      t.string :avatar_url
      t.belongs_to :role, null: false, foreign_key: true
      t.string :password_digest

      t.timestamps
    end
  end
end
