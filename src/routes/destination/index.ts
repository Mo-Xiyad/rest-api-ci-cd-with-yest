import express from "express";
import { AccommodationModel, DestinationModel } from "../../db/models";
import { AdminCheckMiddleware } from "../../middlewares/checkAdmin";
import { JWTAuthMiddleware } from "../../middlewares/JWTAuthMiddleware";

const destinationRouter = express.Router();

destinationRouter.get("/", JWTAuthMiddleware, async (req, res, next) => {
  try {
    // let dest: any[] = [];
    // const accommodation = await AccommodationModel.find().populate("city");

    // accommodation.forEach((accommodation) => {
    //   if (accommodation.city !== null && accommodation.city !== undefined) {
    //     dest.push(accommodation);
    //   }
    // });
    const { available } = req.query;

    const destination = await DestinationModel.find(
      available
        ? {
            _id: [
              ...(await AccommodationModel.find()
                .populate("city")
                .distinct("city")),
            ],
          }
        : {}
    );

    // const destination = await DestinationModel.find();
    if (destination) {
      res.status(200).send(destination);
    } else {
      res.status(404).send();
    }
  } catch (error) {
    res.status(404).send();
    next();
    console.log(error);
  }
});

destinationRouter.post(
  "/",
  JWTAuthMiddleware,
  AdminCheckMiddleware,
  async (req, res) => {
    try {
      const alreadyHere = await DestinationModel.find({});

      const foundCity = alreadyHere.find(
        (destination) => destination.city === req.body.city
      );

      if (foundCity) {
        res.status(400).send({ message: "City already there" });
      } else {
        const destination = new DestinationModel(req.body);
        // await destination.save();

        if (destination) {
          await destination.save();

          res.status(201).send(destination);
        } else {
          res.status(404).send({ message: "destination not found" });
        }
      }
    } catch (error) {
      console.log(error);
    }
  }
);

destinationRouter.get(
  "/:cityId",
  JWTAuthMiddleware,
  AdminCheckMiddleware,
  async (req, res, next) => {
    try {
      const accommodations = await AccommodationModel.find({
        city: req.params.cityId,
      });
      if (accommodations) {
        res.status(200).send(accommodations);
      } else {
        res.status(404).send("Accommodation not found");
      }
    } catch (error) {
      res.status(500).send({ success: false, message: "Something went wrong" });
    }
  }
);
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
