import express from "express"
import {ENV} from "./lib/env.js"

console.log(ENV.PORT)

const app = express()

app.get("/", (req, res) => {
    res.status(200).json({    })
})

app.listen(3000, () => {
    console.log("Server is running on port",ENV.PORT)
})