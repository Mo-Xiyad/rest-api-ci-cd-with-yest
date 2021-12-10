import express from "express";
import { AccommodationModel } from "../db/models";

const accommodationRouter = express.Router();

accommodationRouter.get("/", async (req, res, next) => {
  try {
  } catch (error) {
    console.log();
  }
});
accommodationRouter.post("/", async (req, res, next) => {
  try {
  } catch (error) {
    console.log(error);
  }
});
accommodationRouter.get("/:accId", async (req, res, next) => {
  try {
  } catch (error) {
    console.log(error);
  }
});
accommodationRouter.put("/:accId", async (req, res, next) => {
  try {
  } catch (error) {
    console.log(error);
  }
});
accommodationRouter.delete("/:accId", async (req, res, next) => {
  try {
  } catch (error) {
    console.log(error);
  }
});

export default accommodationRouter;
