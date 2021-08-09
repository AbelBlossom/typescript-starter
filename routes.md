## Routes

user:

- login
- register
- deposit
- games
- ticket
  - all
  - won+
  - pending
  - lost
  - draft

^roles = admin,superUser
admin:

- games
  - create
  - update
  - delete
- user ^only superUsers
  - makeAdmin
  - removeAdmin
