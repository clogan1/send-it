class AddEmailToContributors < ActiveRecord::Migration[6.1]
  def change
    add_column :contributors, :email, :string
  end
end
