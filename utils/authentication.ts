require('dotenv/config');
const jwt = require('jsonwebtoken');

const checkAuth = async function(req,res, next){
  if (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer'){
    let reqToken = req.headers.authorization.split(' ')[1];
    await jwt.verify(reqToken, process.env.JWT_TOKEN, function(err, decoded) {
      if (err) return res.status(401).send({ error: err });
      res.locals.user =decoded;
      next();
     })
  }else{
    return res.status(401).send({
      message: 'Access token required to proceed the api',
    });
  }
}

module.exports = checkAuth;
