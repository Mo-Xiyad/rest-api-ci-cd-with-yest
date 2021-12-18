import express from "express";
import cors from "cors";
import listEndpoints from "express-list-endpoints";
import accommodationRouter from "./accommodation";
import destinationRouter from "./destination";
import UserRouter from "./users";
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
