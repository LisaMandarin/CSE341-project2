const momentRoute = require("express").Router()
const momentController = require("../controllers/momentController")

momentRoute.get("/", momentController.findAll)

module.exports = momentRoute