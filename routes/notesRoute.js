const express = require("express");
const { NoteModel } = require("../models/noteModel");

const noteRoute = express.Router();

noteRoute.get("/", async (req, res) => {
    try {
        const userId = req.body.user
        const data = await NoteModel.find({user:userId});
        res.send(data);

    } catch (error) {
        console.log(error);

    }
})

noteRoute.post("/create", async (req, res) => {
    try {
        const data = new NoteModel(req.body)
        await data.save();
        res.send({ "msg": "note created" })


    } catch (error) {
        console.log(error);
    }
})

noteRoute.delete("/delete/:id", async (req, res) => {
    const id = req.params.id
    const data = req.body
    const note = await NoteModel.findOne({ "_id": id })
    const userID_in_note = note.user
    const userID_making_req = req.body.user

    try {
        if (userID_making_req !== userID_in_note) {
            res.send({ "msg": "You are not authorized" })
        } else {
            await NoteModel.findByIdAndDelete({ "_id": id })
            res.send({ "msg": `Note with id:${id} has been delete` })
        }
    } catch (err) {
        console.log(err)
        res.send({ "msg": "Something went wrong" })
    }

})
noteRoute.patch("/update/:id", async (req, res) => {
    const id = req.params.id
    const data = req.body
    const note = await NoteModel.findOne({ "_id": id })
    const userID_in_note = note.user
    const userID_making_req = req.body.user

    try {
        if (userID_making_req !== userID_in_note) {
            res.send({ "msg": "You are not authorized" })
        } else {
            await NoteModel.findByIdAndUpdate({ "_id": id }, data)
            res.send({ "msg": `Note with id:${id} has been delete` })
        }
    } catch (err) {
        console.log(err)
        res.send({ "msg": "Something went wrong" })
    }

})

module.exports = { noteRoute }