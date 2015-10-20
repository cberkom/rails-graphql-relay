10.times do
  user = User.create(
    first_name: Faker::Name.first_name,
    last_name: Faker::Name.last_name,
    email: Faker::Internet.email
  )

  5.times do
    user.widgets.create name: Faker::Internet.user_name
  end
end
