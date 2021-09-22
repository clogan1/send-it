class AddArtistNameToTemplates < ActiveRecord::Migration[6.1]
  def change
    add_column :templates, :artist_name, :string
  end
end
