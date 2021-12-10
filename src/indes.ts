import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import listEndpoints from "express-list-endpoints";
import accommodationRouter from "./accommodation";
const server = express();

process.env.TS_NODE_DEV && require("dotenv").config();

const port = process.env.PORT! || 3000;

server.use(express.json());

// cors middleware's
// server.use(cors);

// Endpoints
server.use("accommodations", accommodationRouter);

// Db connection
mongoose.connect(process.env.MONGODB_URL!).then(() => {
  console.log("mongoDB Connected");
  server.listen(port, () => {
    console.log(`Server is running on port ${port}`);
    console.table(listEndpoints(server));
  });
});
