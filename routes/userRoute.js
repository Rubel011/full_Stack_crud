const express = require("express");
const { UserModel } = require("../models/userModel")
const bcrypt = require("bcrypt")
const userRoute = express.Router()
require("dotenv").config()
const jwt = require("jsonwebtoken")

userRoute.get("/", async (req, res) => {
    try {
        let data = await UserModel.find();
        res.send(data)

    }
    catch (err) {
        res.send(err.message)
    }
})
userRoute.delete("delete/:id", async (req, res) => {
    try {
        const id = req.params.id
        await UserModel.findByIdAndDelete({ _id: id });
        res.send(" user deleted")

    }
    catch (err) {
        res.send(err.message)
    }
})
userRoute.post("/register", async (req, res) => {
    try {
        const { email, name, pass } = req.body
        const dataBase = await UserModel.find({ email });
        if (dataBase.length > 0) {
            res.send({ "msg": "you are already registerd Login" })
        } else {
            bcrypt.hash(pass, 5, async (err, hash_pass) => {
                if (err) res.send({ "msg": "something went wrong", "error": err.message })
                else {
                    const data = new UserModel({ name, email, pass: hash_pass })
                    await data.save()
                    res.send({ "msg": "register successful" })
                }
            });
        }


    }

    catch (err) {
        res.send({ "msg": "something went wrong", "error": err.message })
    }

})
userRoute.post("/login", async (req, res) => {
    const { email, pass } = req.body;
    try {
        const data = await UserModel.find({ email });
        if (data.length > 0) {
            bcrypt.compare(pass, data[0].pass).then((result) => {
                if (result) {
                    var token = jwt.sign({ userid: data[0]._id }, process.env.key);
                    res.send({ "msg": "login successful", "token": token })
                } else {
                    res.send({ "msg": "wrong credential" })
                }
            });



        } else {
            res.send({ "msg": "wrong credential" })

        }

    }
    catch (err) {
        console.log(err);
    }
})

module.exports = { userRoute };