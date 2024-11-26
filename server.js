const express = require("express")
const mongoose = require("mongoose")
require("dotenv").config()
const cors = require("cors")
const app = express()
const port = process.env.PORT
const mongodbURI = process.env.MONGODB_URI
const errorHandling = require("./utils/errorHandling")
const connectDB = require("./models/index")
const router = require("./Routes")
const { auth } = require("express-openid-connect")

const config = {
    authRequired: false,
    auth0Logout: true,
    secret: process.env.SECRET,
    baseURL: process.env.BASE_URL,
    clientID: process.env.CLIENT_ID,
    issuerBaseURL: process.env.ISSUER_BASE_URL
}

app.use(auth(config))

if (!port) {
    throw new Error("Port is not defined in the env file")
}
if (!mongodbURI) {
    throw new Error("Invalid MongoDB URI")
}

connectDB(mongodbURI)

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(router)
app.use(errorHandling)

app.listen(port, () => console.log(`Server application listening on port ${port}`))
