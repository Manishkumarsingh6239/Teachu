import express from "express"
import {ENV} from "./lib/env.js"
import path from "path"
import { ConnectDB } from "./lib/db.js"
import cors from "cors"
import {serve} from "inngest/express"
import {inngest, functions} from "./lib/inngest.js"
import {clerkMiddleware} from "@clerk/express"
import {protectRoute} from "./middleware/protectRoute.js"
import chatRoutes from "./routes/chatRoute.js"
import sessionRoute from "./routes/sessionRoute.js"
 

const app = express()

const __dirname = path.resolve()
console.log(__dirname)

//middlewares
app.use(express.json())
app.use(cors({
    origin: ENV.CLIENT_URL,
    credentials: true
}))

app.use(clerkMiddleware())

app.use("/api/inngest", serve({client: inngest, functions}))
app.use("/api/chat/",chatRoutes);
app.use("/api/sessions", sessionRoute)

app.get("/health", (req, res) => {
    res.status(200).json({msg:"Health page is working"})
})

app.get("/protected-route",protectRoute, (req, res) => {
    res.status(200).json({msg:"API is working"})
})

if(ENV.NODE_ENV === "production"){
    app.use(express.static(path.join(__dirname, "../frontend/dist")));

    app.get("/{*any}",(req,res)=>{
        res.sendFile(path.join(__dirname,"../frontend/dist/index.html"))
    })
}

const StartServer = async ()=>{
    try {
        await ConnectDB();
        app.listen(ENV.PORT, () => {
        console.log("Server is running on port",ENV.PORT);
})
    } catch (error) {
        console.log("💥 Error starting the server")
    }
}

StartServer();