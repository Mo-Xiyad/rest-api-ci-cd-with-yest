import { AccommodationSchema } from "./accommodationSchema";
import mongoose from "mongoose";

const { model } = mongoose;

export const AccommodationModel = model("accommodations", AccommodationSchema);
