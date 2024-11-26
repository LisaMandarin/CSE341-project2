const router = require("express").Router()
const actorRoute = require("./actorRoute")
const momentRoute = require("./momentRoute")
const swaggerRoute = require("./swaggerRoute")
const { requiresAuth } = require("express-openid-connect")

router.get("/profile", requiresAuth(), (req, res) => {
    console.log("profile authenticated: ", req.oidc.isAuthenticated())
    res.json(req.oidc.user)
})
router.use("/api-docs", swaggerRoute)
router.use("/actors", actorRoute)
router.use("/moments", momentRoute)
router.use("/", (req, res) => {
    console.log("authenticated: ", req.oidc.isAuthenticated())
    let docData = 'https://cse341-project2-h5oa.onrender.com/api-docs'
    res.send(req.oidc.isAuthenticated() ? "Logged in: " + docData : "Logged out")
})

module.exports = router