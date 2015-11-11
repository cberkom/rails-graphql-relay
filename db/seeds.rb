10.times do
  User.destroy_all

  user = User.create(
    first_name: Faker::Name.first_name,
    last_name: Faker::Name.last_name,
    email: Faker::Internet.email
  )

  user.lists.create name: "Shopping List"
  user.lists.create name: "Home Improvements"
  user.lists.create name: "Weekly Tasks"
  user.lists.create name: "Work Tasks"
  user.lists.create name: "Yearly Goals"
end
