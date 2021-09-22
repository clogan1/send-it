class RenameRolesType < ActiveRecord::Migration[6.1]
  def change
    rename_column :roles, :type, :name
  end
end
