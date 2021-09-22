class CreateTemplates < ActiveRecord::Migration[6.1]
  def change
    create_table :templates do |t|
      t.belongs_to :category, null: false, foreign_key: true
      t.string :name
      t.string :art_url

      t.timestamps
    end
  end
end
