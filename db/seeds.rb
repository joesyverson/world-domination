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
topic_array << Topic.create(title: "Climate Change Is Human-Caused")
topic_array << Topic.create(title: "Freedom of Hate Speech")
topic_array << Topic.create(title: "Pro-Choice")
topic_array << Topic.create(title: "Pro-Life")
topic_array << Topic.create(title: "Raise Taxes on the Poor")
topic_array << Topic.create(title: "Voter Fraud")
topic_array << Topic.create(title: "LGBT Adoption")
topic_array << Topic.create(title: "Alien Dissection for the Purose of Scientific Progress")
topic_array << Topic.create(title: "Bernie")
topic_array << Topic.create(title: "Skynet")
topic_array << Topic.create(title: "Studnet")
topic_array << Topic.create(title: "Freer Beer")
topic_array << Topic.create(title: "Lynard Skynard")
topic_array << Topic.create(title: "Pugs Aren't That Cute")
topic_array << Topic.create(title: "Cannibalism")
topic_array << Topic.create(title: "I Should Go to Sleep")


len = topic_array.length
# for i in 0..2
  # user_array[i].topics << topic_array[rand 0..9]
# end

for i in 0..80
  follower_array[i].topics << topic_array[rand 0..len]
end
