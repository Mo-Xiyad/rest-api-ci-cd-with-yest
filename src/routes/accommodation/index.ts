import express from "express";
import { AccommodationModel } from "../../db/models";
import { RoleCheckMiddleware } from "../../middlewares/checkRole";
import { JWTAuthMiddleware } from "../../middlewares/JWTAuthMiddleware";

const accommodationRouter = express.Router();

accommodationRouter.get("/", JWTAuthMiddleware, async (req, res, next) => {
  try {
    const accommodation = await AccommodationModel.find().populate("city");
    if (accommodation) {
      res.status(200).send(accommodation);
    } else {
      res.status(404).send();
    }
  } catch (error) {
    res.status(404).send();
    console.log();
  }
});
accommodationRouter.post(
  "/",
  JWTAuthMiddleware,
  RoleCheckMiddleware,
  async (req, res, next) => {
    try {
      const accommodation = new AccommodationModel(req.body);
      await accommodation.save();
      if (accommodation) {
        res.status(201).send(accommodation);
      } else {
        res.status(400).send();
      }
    } catch (error) {
      res.status(400).send(); // this needs to change to next(httpCreateError())
      console.log(error);
    }
  }
);
accommodationRouter.get(
  "/:accId",
  JWTAuthMiddleware,
  async (req, res, next) => {
    try {
      const id = req.params.accId;
      const accommodation = await AccommodationModel.findById(id).populate(
        "city"
      );
      if (accommodation) {
        res.status(200).send(accommodation);
      } else {
        res.status(404).send();
      }
    } catch (error) {
      res.status(400).send(); // this needs to change to next(httpCreateError())
      console.log(error);
    }
  }
);
accommodationRouter.put(
  "/:accId",
  JWTAuthMiddleware,
  RoleCheckMiddleware,
  async (req, res, next) => {
    try {
      const id = req.params.accId;
      const accommodation = await AccommodationModel.findOne({
        user: req.body.user,
        _id: id,
      });

      if (accommodation) {
        const updateAccommodation = await AccommodationModel.findByIdAndUpdate(
          id,
          req.body,
          { new: true }
        );
        if (updateAccommodation) {
          res.status(200).send(updateAccommodation);
        } else {
          res.status(404).send();
        }
      } else {
        res
          .status(404)
          .send({ success: false, message: "Accommodation not found" });
      }
    } catch (error) {
      res.status(404).send(); // this needs to change to next(httpCreateError())
      console.log(error);
    }
  }
);
accommodationRouter.delete(
  "/:accId",
  JWTAuthMiddleware,
  RoleCheckMiddleware,
  async (req, res, next) => {
    try {
      const id = req.params.accId;
      const accommodation = await AccommodationModel.findByIdAndDelete(id);
      if (accommodation) {
        res.status(204).send();
      } else {
        res.status(404).send();
      }
    } catch (error) {
      console.log(error);
    }
  }
);

export default accommodationRouter;
