const actorRoute = require("express").Router()
const actorController = require("../controllers/actorController")
const { validateActor, validatePartialActor, handleValidation } = require("../utils/actorValidation")

actorRoute.get('/', actorController.findAll)
actorRoute.get('/:id', actorController.findById)
actorRoute.post('/search', validatePartialActor, handleValidation, actorController.findByQuery)
actorRoute.post('/', validateActor, handleValidation, actorController.createActor)
actorRoute.put('/:id', validateActor, handleValidation, actorController.updateActorById)
actorRoute.delete('/:id', actorController.deleteActorById)
actorRoute.delete('/', actorController.deleteAll)

module.exports = actorRoute