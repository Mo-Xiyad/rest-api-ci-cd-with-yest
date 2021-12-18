import express from "express";
import cors from "cors";
import listEndpoints from "express-list-endpoints";
import accommodationRouter from "./routes/accommodation";
import destinationRouter from "./routes/destination";
import UserRouter from "./routes/users";
const server = express();

process.env.TS_NODE_DEV && require("dotenv").config();

// cors middleware's
server.use(express.json());
server.use(cors);
// Endpoints
server.use("/accommodations", accommodationRouter);
server.use("/destinations", destinationRouter);
server.use("/users", UserRouter);

export { server };
