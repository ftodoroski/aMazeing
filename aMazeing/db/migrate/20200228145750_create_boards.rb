class CreateBoards < ActiveRecord::Migration[6.0]
  def change
    create_table :boards do |t|
      t.string :pic
      t.integer :difficulty
      t.integer :num_of_coins

      t.timestamps
    end
  end
end
