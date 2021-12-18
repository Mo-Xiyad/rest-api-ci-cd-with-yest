import mongoose from "mongoose";
import validator from "validator";
import bcrypt from "bcrypt";
import IUser from "../interfaces/IUser";
import { Types } from "mongoose";

const { isEmail } = validator;
const { Model, model, Schema } = mongoose;

// interface UserModel extends Model<IUser> {
//   checkCredentials(email: string, plainPw: string): any;
// }

// export interface UserModel extends mongoose.Document {
//   email: string;
//   password: string;
//   role: string;
//   refreshToken: string;
//   googleId: string;
//   checkCredentials(email: string, plainPw: string): Promise<any>;
// }

const UserSchema = new Schema<IUser, UserModel>(
  {
    // name: { type: String, required: true },
    // surname: { type: String },
    email: {
      type: String,
      required: true,
      validate: [isEmail, "invalid email"],
      unique: true,
    },
    password: {
      type: String,
      required: function (this: IUser) {
        return !this.googleId;
      },
    },
    // avatar: { type: String },
    role: { type: String },
    refreshToken: { type: String },
    googleId: {
      type: String,
      required: function (this: IUser) {
        return !this.password;
      },
    },
  },
  { timestamps: true }
);

UserSchema.pre("save", async function (next) {
  const newUser = this;
  const plainPw = newUser.password;
  if (newUser.isModified("password")) {
    const hash = await bcrypt.hash(plainPw, 10);
    newUser.password = hash;
  }
  next();
});

UserSchema.methods.toJSON = function () {
  const userDocument = this;
  const userObject = userDocument.toObject();
  // delete userObject.password
  delete userObject.__v;

  return userObject;
};

UserSchema.statics.checkCredentials = async function checkCredentials(
  email: string,
  plainPw: string
) {
  const user = await this.findOne({ email }); // as UserDoc | null;
  if (user) {
    const isMatch = await bcrypt.compare(plainPw, user.password!);
    if (isMatch) {
      return user;
    } else {
      return null;
    }
  } else {
    return null;
  }
};

interface UserModel extends mongoose.Model<IUser> {
  checkCredentials: (
    email: string,
    plainPw: string
  ) => Promise<ReturnType<typeof User.findOne>>; // DON'T Use any; if you can prefer `void` or `unknown`
}

const User = mongoose.model<IUser, UserModel>("user", UserSchema);
export default User;

/* UserSchema.statics.checkCredentials = checkCredentials

async function checkCredentials (this: UserModel, email: string,
  plainPw: string
) {
  const user = await this.findOne({ email })// as UserDoc | null;
  if (user) {
    const isMatch = await bcrypt.compare(plainPw, user.password!);
    if (isMatch) {
      return user;
    } else {
      return null;
    }
  } else {
    return null;
  }
};

interface UserModel extends mongoose.Model<IUser> {
  checkCredentials: typeof checkCredentials
}

const User = mongoose.model<IUser, UserModel>("user", UserSchema);
export default User;

 */
