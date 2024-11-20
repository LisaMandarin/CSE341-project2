const actorRoute = require("express").Router()
const actorController = require("../controllers/actorController")

actorRoute.get('/', actorController.findAll)
actorRoute.get('/:id', actorController.findById)
actorRoute.post('/search', actorController.findByQuery)

module.exports = actorRoute