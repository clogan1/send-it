class ChangeContributorsToAdditions < ActiveRecord::Migration[6.1]
  def change
    rename_table :contributors, :additions
  end
end
