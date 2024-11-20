const express = require("express")
const mongoose = require("mongoose")
require("dotenv").config()
const app = express()
const port = process.env.PORT
const mongodbURI = process.env.MONGODB_URI

if (!port) {
    console.error("Port is not defined in the env file")
    process.exit(1)
}
if (!mongodbURI) {
    console.error("Invalid MongoDB URI")
    process.exit(1)
}
mongoose
    .connect(mongodbURI)
    .then(() => console.log("Connected to MongoDB successfully"))
    .catch(error => {
        console.error("Failed to connect to MongoDB.  Exiting...", error.message)
        process.exit(1)
    })

app.get("/", (req, res) => {
    res.send("Hello")
})

app.listen(port, () => console.log(`Server application listening on port ${port}`))
