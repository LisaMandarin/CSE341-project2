const swaggerAutogen = require("swagger-autogen")

const doc = {
    info: {
        title: "CSE341 Project 2",
        description: "This API allows you to manage the collection of actors in the TV series -- Grey's Anatomy"
    },
    host: 'localhost:3000',
    schemes: ["http", "https"]
}

const outputFile = "./swagger-output.json"
const routes = ["./Routes/index.js"]

swaggerAutogen(outputFile, routes, doc)