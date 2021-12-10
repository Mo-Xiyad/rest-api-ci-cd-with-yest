import express from "express";
import { DestinationModel } from "../db/models";

const destinationRouter = express.Router();

destinationRouter.get("/", async (req, res, next) => {
  try {
    const destination = await DestinationModel.find();
    if (destination) {
      res.status(200).send(destination);
    } else {
      res.status(404).send();
    }
  } catch (error) {
    // res.status(404).send();
    // console.log();
  }
});
destinationRouter.post("/", async (req, res, next) => {
  try {
    const destination = new DestinationModel(req.body);
    await destination.save();
    if (destination) {
      res.status(201).send(destination);
    } else {
      res.status(400).send();
    }
  } catch (error) {
    // res.status(400).send(); // this needs to change to next(httpCreateError())
    // console.log(error);
  }
});
destinationRouter.get("/:destinationId", async (req, res, next) => {
  try {
    // const id = req.params.destinationId;
    // const destination = await DestinationModel.findById(id);
    // if (destination) {
    //   res.status(200).send(destination);
    // } else {
    //   res.status(404).send();
    // }
  } catch (error) {
    // res.status(400).send(); // this needs to change to next(httpCreateError())
    // console.log(error);
  }
});
destinationRouter.put("/:destinationId", async (req, res, next) => {
  try {
    // const id = req.params.destinationId;
    // const destination = await DestinationModel.findByIdAndUpdate(
    //   id,
    //   req.body,
    //   { new: true }
    // );
    // if (destination) {
    //   res.status(200).send(destination);
    // } else {
    //   res.status(404).send();
    // }
  } catch (error) {
    // res.status(404).send(); // this needs to change to next(httpCreateError())
    // console.log(error);
  }
});
destinationRouter.delete("/:destinationId", async (req, res, next) => {
  try {
    // const id = req.params.destinationId;
    // const destination = await DestinationModel.findByIdAndDelete(id);
    // if (destination) {
    //   res.status(204).send();
    // } else {
    //   res.status(404).send();
    // }
  } catch (error) {
    console.log(error);
  }
});

export default destinationRouter;
