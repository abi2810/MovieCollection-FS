const express = require('express');
const sequelize = require('sequelize');
const path = require('path');
const bodyParser = require('body-parser');
const db = require('./models');
const routes = require('./routes');
const authentication = require('./utils/authentication');
// import routes from './routes';

const User = db.users;
// console.log()
// create our Express app
const app = express();

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use('/api',authentication,routes.securerouter);
app.use('/commonApi',routes.publicrouter);

app.get('/hello', (req,res)=>{
	res.send({msg:'Hello World  Checking'})
});

// app.get('/userAll',async (req,res) => {
//   let getUsers = await User.findAll();
//   res.json({data: getUsers});
// })
 // export default app;
 module.exports = app;
