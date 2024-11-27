const momentRoute = require("express").Router()
const momentController = require("../controllers/momentController")
const { validateMoment, validatePartialMoment, handleValidation } = require("../utils/momentValidation")

momentRoute.get("/", momentController.findAll)
momentRoute.get("/:id", momentController.findById)
momentRoute.post("/search", validatePartialMoment, handleValidation, momentController.findByQuery)
momentRoute.post("/", validateMoment, handleValidation, momentController.createMoment)
momentRoute.put("/:id", validateMoment, handleValidation, momentController.updateMomentById)
momentRoute.delete("/:id", momentController.deleteMomentById)
momentRoute.delete("/", momentController.deleteAll)

module.exports = momentRoute