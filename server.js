// import environmental variables from our variables.env file
// import dotenv from 'dotenv';
// dotenv.config();
// import app from './app';
require('dotenv').config({ path: '.env.dev' });
const app = require('./app');

app.set('port', process.env.PORT || 3000);
const server = app.listen(app.get('port'), () => {
  console.log(`Express running → PORT ${server.address().port}`);
});
