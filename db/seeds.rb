# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)


# puts "creating roles"
# normal_user = Role.create(name: "End User")
# artist = Role.create(name: "Artist")

# puts 'done creating roles'

# puts 'creating users'

# claire = User.create(username: 'clogan', email: 'clairelogan16@gmail.com', password: 'flatiron2021', avatar_url: 'https://avatars.githubusercontent.com/u/77256559?v=4', role_id: 2)

# puts 'done creating users'

# puts 'generating categories'
# birthday = Category.create(name: 'Birthday', emoji: '🎂')
# thank_you = Category.create(name: 'Thank You', emoji: '🙏')
# farewell = Category.create(name: 'Farewell', emoji: '👋')
# getwell = Category.create(name: 'Get Well', emoji: '🤒')
# congratulations = Category.create(name: 'Congratulations', emoji: '🎉')
# any = Category.create(name: 'Any', emoji: '✨')
# misc = Category.create(name: 'Miscellaneous', emoji: '💌')

# puts 'done making categories'

# puts 'generating templates'

# dob = Template.create(category_id: birthday.id, name: 'dob', art_url: 'https://i.ibb.co/B3XmfX4/11.png', artist_name: 'Claire')
# thank_u = Template.create(category_id: thank_you.id, name: 'thank u', art_url: 'https://i.ibb.co/0QQm651/10.png', artist_name: 'Claire')
# plants = Template.create(category_id: any.id, name: 'plants', art_url: 'https://i.ibb.co/ph4w8DW/9.png', artist_name: 'Claire')
# bday_burger = Template.create(category_id: birthday.id, name: 'birthday burger', art_url: 'https://i.ibb.co/L15Y9cm/8.png', artist_name: 'Claire')
# thumbs_up = Template.create(category_id: congratulations.id, name: 'thumbs up', art_url: 'https://i.ibb.co/vHtJ91B/7.png', artist_name: 'Claire')
# thanks_a_bunch = Template.create(category_id: thank_you.id, name: 'thanks a bunch', art_url: 'https://i.ibb.co/cwbNncF/HBD.png', artist_name: 'Claire')
# smileys = Template.create(category_id: any.id, name: 'smileys', art_url: 'https://i.ibb.co/PtxdVrm/6.png', artist_name: 'Claire')
# post_congrats = Template.create(category_id: congratulations.id, name: 'post malone congratulations', art_url: 'https://i.ibb.co/YZ4NrdN/5.png', artist_name: 'Claire')
# bye_felicia = Template.create(category_id: farewell.id, name: 'bye felicia', art_url: 'https://i.ibb.co/LxqvFZc/4.png', artist_name: 'Claire')
# soup = Template.create(category_id: getwell.id, name: 'soup', art_url: 'https://i.ibb.co/wKYvzSB/3.png', artist_name: 'Claire')
# thanks_a_lot = Template.create(category_id: thank_you.id, name: 'thanks x 7', art_url: 'https://i.ibb.co/ySN8w2q/2.png', artist_name: 'Claire')
# hbd = Template.create(category_id: birthday.id, name: 'hbd', art_url: 'https://i.ibb.co/xHBwT1t/1.png', artist_name: 'Claire')
# western_goodbye = Template.create(category_id: farewell.id, name: 'so long partner', art_url: 'https://i.ibb.co/mqdChqD/HBD-1.png', artist_name: 'Claire')
# hearts = Template.create(category_id: getwell.id, name: 'hearts', art_url: 'https://i.ibb.co/K2VXNGX/HBD-2.png', artist_name: 'Claire')
# rainbow = Template.create(category_id: 1, name: 'rainbow', art_url: 'https://i.ibb.co/2j92mBN/16.png', artist_name: 'Claire')
# character = Template.create(category_id: 1, name: 'main character', art_url: 'https://i.ibb.co/5v9BpXF/17.png', artist_name: 'Claire')
# wedding = Template.create(category_id: 7, name: 'cheers', art_url: 'https://i.ibb.co/4t0jXr6/HBD-3.png', artist_name: 'Claire')

# puts 'done making templates'

# puts 'creating user cards'

# send_date = 10.days.from_now

# UserCard.create(user_id: 1, template_id: 1, recipient_name: 'Claire', recipient_email: 'clairelogan16@gmail.com', message: "Happy birthday to me!", is_sent: false, schedule_send: send_date )

# puts 'done'