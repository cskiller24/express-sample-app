import router from "./router";
import express from "express";
import bodyParser from "body-parser";
import 'dotenv/config'

const app = express()
const port = process.env.PORT || 3000

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

app.use(router)

app.listen(port, () => {
    console.log(`Listening on port ${port}`)
})