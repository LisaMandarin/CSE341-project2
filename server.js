const express = require("express")
const mongoose = require("mongoose")
require("dotenv").config()
const app = express()
const port = process.env.PORT
const mongodbURI = process.env.MONGODB_URI
const errorHandling = require("./utils/errorHandling")
const connectDB = require("./models/index")
const router = require("./Routes")

if (!port) {
    throw new Error("Port is not defined in the env file")
}
if (!mongodbURI) {
    throw new Error("Invalid MongoDB URI")
}

connectDB(mongodbURI)

// app.get("/", (req, res) => {
//     res.send("Hello")
// })

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(router)
app.use(errorHandling)

app.listen(port, () => console.log(`Server application listening on port ${port}`))
