# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

User.destroy_all
Board.destroy_all
Game.destroy_all


u1 = User.create(name: "Gramit")
b1 = Board.create(pic: "https://i1.sndcdn.com/avatars-000701366305-hu9f0i-t500x500.jpg", difficulty: 1, num_of_coins: 3)
g1 = Game.create(user_id: u1.id, board_id: b1.id)


