const router = require("express").Router()
const actorRoute = require("./actorRoute")
const momentRoute = require("./momentRoute")
const swaggerRoute = require("./swaggerRoute")
const { requiresAuth } = require("express-openid-connect")

router.use("/api-docs", swaggerRoute)
router.use("/actors", actorRoute)
router.use("/moments", momentRoute)

router.get("/", (req, res) => {
    const docLink = 'https://cse341-project2-h5oa.onrender.com/api-docs'
    if (req.oidc.isAuthenticated()) {
        res.json({
            message: "Welcome, you are logged in. Check out the API documentation",
            apiDocs: docLink
        })
    } else {
        res.json({
            message: "You are logged out.  You have limited permission to some endpoints",
            apiDocs: docLink
        })
    }
})

router.get("/profile", requiresAuth(), (req, res) => {
    // #swagger.tags = ["profile"]
    res.json(req.oidc.user)
})

module.exports = router