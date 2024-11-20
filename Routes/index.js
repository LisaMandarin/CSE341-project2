const router = require("express").Router()
const actorRoute = require("./actorRoute")
const swaggerRoute = require("./swaggerRoute")

router.use("/api-docs", swaggerRoute)
router.use("/actors", actorRoute)
router.use("/", (req, res) => {
    let docData = { documentationURL: 'http://localhost:3000/api-docs'}
    res.json(docData)
})

module.exports = router