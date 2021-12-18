import mongoose, { Types } from "mongoose";

export default interface IUser {
  _id?: Types.ObjectId;
  email: string;
  password?: string;
  role?: string;
  refreshToken?: string;
  googleId?: string;
}
