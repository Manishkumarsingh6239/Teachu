import express from "express";
import path from "path";
import cors from "cors";
import { ENV } from "./lib/env.js";
import { ConnectDB } from "./lib/db.js";
import { serve } from "inngest/express";
import { inngest, functions } from "./lib/inngest.js";
import { clerkMiddleware } from "@clerk/express";
import { protectRoute } from "./middleware/protectRoute.js";
import chatRoutes from "./routes/chatRoute.js";
import sessionRoute from "./routes/sessionRoute.js";

const app = express();
const __dirname = path.resolve();

// middlewares
app.use(express.json());

if (ENV.NODE_ENV !== "production") {
  app.use(cors({
    origin: ENV.CLIENT_URL,
    credentials: true
  }));
}

app.use(clerkMiddleware());

// API routes
app.use("/api/inngest", serve({ client: inngest, functions }));
app.use("/api/chat", chatRoutes);
app.use("/api/sessions", sessionRoute);

app.get("/protected-route", protectRoute, (req, res) => {
  res.status(200).json({ msg: "API is working" });
});

// frontend
if (ENV.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../frontend/dist")));

  app.get("*", (req, res) => {
    res.sendFile(
      path.join(__dirname, "../frontend/dist/index.html")
    );
  });
}

const StartServer = async () => {
  try {
    await ConnectDB();
    app.listen(ENV.PORT, () => {
      console.log("Server running on port", ENV.PORT);
    });
  } catch (error) {
    console.error("💥 Error starting server", error);
  }
};

StartServer();
