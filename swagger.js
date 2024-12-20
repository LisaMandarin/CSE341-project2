require("dotenv").config()
const swaggerAutogen = require("swagger-autogen")()

const doc = {
    info: {
        title: "CSE341 Project 2",
        description: "This API allows users to manage the collection of actors and moments in the TV series -- Grey's Anatomy"
    },
    host: "cse341-project2-h5oa.onrender.com",
    schemes: ["https:"],
    produces: ["application/json"],
    consumes: ["application/json"]
}

const outputFile = "./swagger-output.json"
const routes = ["./Routes/index.js"]

swaggerAutogen(outputFile, routes, doc)