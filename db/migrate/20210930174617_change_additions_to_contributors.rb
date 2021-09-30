class ChangeAdditionsToContributors < ActiveRecord::Migration[6.1]
  def change
    rename_table :additions, :contributors

  end
end
