const express = require("express")
require("dotenv").config()
const app = express()
const port = process.env.PORT

app.get("/", (req, res) => {
    res.send("Hello")
})

app.listen(port, () => console.log(`Server application listening on port ${port}`))
