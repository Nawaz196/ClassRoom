const jwt = require("jsonwebtoken");
const {JWT_SECRET} = require("../config/keys");
const Teacher = require('../Models/teacher')

module.exports = (req, res, next) => {
    const {authorization} = req.headers;
    if(!authorization) {
        return res.status(401).json({error : "You must be a teacher!"});
    }
    const token = authorization.replace("Bearer ","");
    jwt.verify(token, JWT_SECRET, (err, payload => {
        if(err) {
            return res.status(401).json({error : "You must be a teacher!"});
        }
         const {_id} = payload;
         Teacher.findById(_id).then((userData) => {
           if(!userData){
            return res.status(401).json({error : "You must be a teacher!"}); 
           }
           req.teacher = userData;
           next();
         })
    })) 
}




