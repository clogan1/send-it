# Send It: a virtual card app

Send It is a virtual card app that allows users to send greeting cards for any occasion with custom messages via email. Users can also invite other users to also sign and leave custom messages in the same card. Send It helps people stay connected from miles away and is great for remote coworkers, and long-distance friends and family.  
<br />

<p align="center"><img src="./client/src/Images/homepage.png" alt="logo" width="600px" margin="auto"></p>


## Contributor

**Claire Logan**
<br />
github: [clogan1](https://github.com/clogan1)
<br />
email: clairelogan16@gmail.com

<br />

## Built With
This project was built with the following:
- [Ruby on Rails](https://rubyonrails.org/) - ActiveRecord, PostgreSQL, & Action Mailer (for email integration)
- [React](https://reactjs.org/)
- [React Redux](https://react-redux.js.org/)
- [Material UI](https://mui.com/) (CSS)

<br />

## Getting Started
<br />
To run this project locally, run the following commands:
<br />

```javascript
bundle install
npm install --prefix client

rails db:create db:migrate db:seed

rails s
npm start --prefix client
```

## User Stories

### All Users
- Browse all card covers, sorting and/or filtering by category

<p align="center"><img src="./client/src/Images/browse.gif" alt="logo" width="600px" margin="auto"></p>

- Login in or create a new account
- Create a new card, adding a recipient, custom message and inviting any other users to sign

<p align="center"><img src="./client/src/Images/create.gif" alt="logo" width="600px" margin="auto"></p>

- Edit or delete card prior to sending
- Send finished card to recipient via email
<p align="center"><img src="./client/src/Images/email.jpg" alt="logo" width="200px" margin="auto"></p>

- View all cards created by yourself or cards you have been invited to sign
- View card details of cards previously sent

<p align="center"><img src="./client/src/Images/actions.gif" alt="logo" width="600px" margin="auto"></p>

### Artist User Role
- Add new card covers


