class CreateGames < ActiveRecord::Migration[6.0]
  def change
    create_table :games do |t|
      t.integer :user_id
      t.integer :board_id
      t.integer :current_position_x
      t.integer :current_position_y
      t.integer :monster_position_x
      t.integer :monster_position_y
      t.integer :door_position_x
      t.integer :door_position_y

      t.timestamps
    end
  end
end
