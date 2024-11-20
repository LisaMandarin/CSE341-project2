const actorRoute = require("express").Router()
const actorController = require("../controllers/actorController")

actorRoute.get('/', actorController.findAll)
actorRoute.get('/:id', actorController.findById)
actorRoute.post('/search', actorController.findByQuery)
actorRoute.post('/', actorController.createActor)
actorRoute.patch('/:id', actorController.updateActorById)
actorRoute.delete('/:id', actorController.deleteActorById)
actorRoute.delete('/', actorController.deleteAll)

module.exports = actorRoute