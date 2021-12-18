import mongoose from "mongoose";
import bcrypt from "bcrypt";

interface UserAttrs {
  name: string;
  email: string;
  password: string;
}

const userSchema = new mongoose.Schema<UserAttrs>({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
  },
  password: {
    type: String,
  },
});

userSchema.statics.checkCredentials = async function (
  email: string,
  plainPw: string
) {
  const user = await this.findOne({ email });
  if (user) {
    const isMatch = await bcrypt.compare(plainPw, user.password);
    if (isMatch) {
      return user;
    } else {
      return null;
    }
  } else {
    return null;
  }
};

interface UserModel extends mongoose.Model<UserAttrs> {
  checkCredentials: (
    email: string,
    plainPw: string
  ) => Promise<ReturnType<typeof User.findOne>>;
}
const User = mongoose.model<UserAttrs, UserModel>("user", userSchema);
