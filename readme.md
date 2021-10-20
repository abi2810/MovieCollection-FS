### Movie Database - NodeJs

- It's a simple movie database that has very minimal details of movies and reviews. Anyone can add them as a user and access the full feature with their credentials.

- In the pre-login state, the User can access only the movie list page. Here, They can search the movies by name and genre. In addition, they can filter the list by votes.

- In a logged-in state, Users can add movies, reviews, and votings. Also, they will get recommendations as per their favorite genre which they set earlier.

- Here, Users authentication performs with JWT.


### Prerequisite

This is a nodejs based project. You will need to have nodejs ready in your environment. https://nodejs.org/en/download/

Using MySQL as a Database engine. https://dev.mysql.com/downloads/

### Instructions

Open your console and navigate to the folder. Run this before you start the game.

```npm install```

Update the database credentials in environment file.

Migrate the models using this command:

```sequelize db:migrate```

Run this to start the application:

```npm run dev```

Please refer postman documentation to check all the APIs.
https://documenter.getpostman.com/view/1263603/UV5RkzJc
