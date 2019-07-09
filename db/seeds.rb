# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

user1 = User.create(user_name: "seline", pic: "https://farm1.static.flickr.com/79/248060017_077765ec1e.jpg")

topic1 = Topic.create(title: "Climate Change")

follower1 = Follower.create(name: "Blanche", pic: "https://cache.legacy.net/legacy/images/cobrands/GreatFallsTribune/photos/12-14obsyverson_12142010.jpg", age: 42, location: "Anytown Ohio" )

user1.topics << topic1
follower1.topics << topic1
