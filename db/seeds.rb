# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#
# Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)


user_array = []
for i in 1..3 do
  user_array << User.create(user_name: "seline #{i}", pic: "https://farm1.static.flickr.com/79/248060017_077765ec1e.jpg")
end
user_sample = user_array.sample(20)

follower_array = []
for i in 1..100 do
  follower_array << Follower.create(name: "Blanche #{i}", pic: "https://cache.legacy.net/legacy/images/cobrands/GreatFallsTribune/photos/12-14obsyverson_12142010.jpg", age: 42, location: "Anytown Ohio" )
end

topic_array = []
topic_array << Topic.create(title: "Climate Change")
topic_array << Topic.create(title: "Vampire Registration")
topic_array << Topic.create(title: "Voter Fraud")
topic_array << Topic.create(title: "Fight Club")
topic_array << Topic.create(title: "LGBT Adoption")
topic_array << Topic.create(title: "Raise Taxes")
topic_array << Topic.create(title: "Religious Freedom")
topic_array << Topic.create(title: "Aliens")
topic_array << Topic.create(title: "Guns or whatever")
topic_array << Topic.create(title: "Clowns")

for i in 0..2
  for j in 0..4
    user_array[i].topics << topic_array[rand 0..9]
  end
end

for i in 0..30
  for j in 0..4
    follower_array[i].topics << topic_array[rand 0..9]
  end
end
