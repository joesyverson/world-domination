# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#
# Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

user_1 = User.create(user_name: "seline", pic: "https://farm1.static.flickr.com/79/248060017_077765ec1e.jpg")

topic_1 = Topic.create(title: "Climate Change")
topic_2 = Topic.create(title: "Vampire Registration")

follower_1 = Follower.create(name: "Blanche", pic: "https://cache.legacy.net/legacy/images/cobrands/GreatFallsTribune/photos/12-14obsyverson_12142010.jpg", age: 42, location: "Anytown Ohio" )
follower_2 = Follower.create(name: "Blanche", pic: "https://proxy.duckduckgo.com/iu/?u=https%3A%2F%2Fnowthisiswhatiwouldcallmusic.files.wordpress.com%2F2017%2F03%2Fnintchdbpict0003074492041.jpg&f=1", age: 42, location: "Anytown Ohio" )



user_1.topics << topic_1
follower_1.topics << topic_1

user_1.topics << topic_2
follower_1.topics << topic_2
follower_2.topics << topic_2
