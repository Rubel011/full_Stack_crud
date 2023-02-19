const express = require("express");
require("dotenv").config()
const app = express();
const { connection } = require("./db")
const { userRoute } = require("./routes/userRoute")
const { noteRoute } = require("./routes/notesRoute")
const { authenticate } = require("./middlewares/authenticate")
const cors=require("cors")
app.use(express.json())
app.use(cors())
app.use("/", userRoute);
app.use(authenticate)
app.use("/notes", noteRoute);


app.listen(process.env.port, async () => {
    try {
        await connection;
        console.log({ "msg": `server is running at port No: ${process.env.port}` });
    }
    catch (err) {
        console.log(err);
    }
})