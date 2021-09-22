class CreateContributors < ActiveRecord::Migration[6.1]
  def change
    create_table :contributors do |t|
      t.belongs_to :user, null: false, foreign_key: true
      t.belongs_to :user_card, null: false, foreign_key: true
      t.text :message

      t.timestamps
    end
  end
end
