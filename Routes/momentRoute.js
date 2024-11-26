const momentRoute = require("express").Router()
const momentController = require("../controllers/momentController")

momentRoute.get("/", momentController.findAll)
momentRoute.get("/:id", momentController.findById)
momentRoute.post("/search", momentController.findByQuery)
momentRoute.post("/", momentController.createMoment)
momentRoute.put("/:id", momentController.updateMomentById)
momentRoute.delete("/:id", momentController.deleteMomentById)
momentRoute.delete("/", momentController.deleteAll)

module.exports = momentRoute