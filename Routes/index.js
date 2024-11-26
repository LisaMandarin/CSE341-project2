const router = require("express").Router()
const actorRoute = require("./actorRoute")
const momentRoute = require("./momentRoute")
const swaggerRoute = require("./swaggerRoute")

router.use("/api-docs", swaggerRoute)
router.use("/actors", actorRoute)
router.use("/moments", momentRoute)
router.use("/", (req, res) => {
    let docData = { documentationURL: 'https://cse341-project2-h5oa.onrender.com/api-docs'}
    res.json(docData)
})

module.exports = router