require("dotenv").config()
const swaggerAutogen = require("swagger-autogen")({openapi: "3.0.0",})

const doc = {
    info: {
        title: "CSE341 Project 2",
        description: "This API allows users to manage the collection of actors and moments in the TV series -- Grey's Anatomy"
    },
    servers: [
        {
            url: process.env.BASE_URL,
            description: "Production site"
        }
    ],
    components: {
        securitySchemes: {
            openID: {
                type: "openIdConnect",
                description: "Authenticate using OpenID Connect via Auth0",
                openIdConnectUrl: `${process.env.ISSUER_BASE_URL}/.well-known/openid-configuration`,
            }   
        }
    },
    security: [
        {
            openID: []
        }
    ]
}

const outputFile = "./swagger-output.json"
const routes = ["./Routes/index.js"]

swaggerAutogen(outputFile, routes, doc)