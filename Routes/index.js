const router = require("express").Router()
const actorRoute = require("./actorRoute")

router.use("/actors", actorRoute)

module.exports = router