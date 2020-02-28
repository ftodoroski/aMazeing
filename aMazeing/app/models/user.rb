class User < ApplicationRecord
    has_many :games
    has_many :boards, through: :games
end
