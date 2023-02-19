const jwt = require("jsonwebtoken");
require("dotenv").config()
const authenticate = (req, res, next) => {
    const token = req.headers.authorization

    if (token) {
        jwt.verify(token, process.env.key, (err, decoded) => {
            if (decoded) {
                req.body.user=decoded.userid;
                next()
            } else {
                res.send({ "msg": "Please login first" })
            }

        });
    } else {

        res.send({ "msg": "Please login first" })
    }
}
module.exports={authenticate}