import express from "express";
import UserModel from "../../db/usersSchema";
import { JWTauth, verifyRefreshToken } from "../../tools/auth-tools";
import { Request, Response, NextFunction } from "express";
import createHttpError from "http-errors";
const { Router } = express;

const usersRouter = Router();

usersRouter.route("/getUser").get(async (req: Request, res: Response) => {
  try {
    res
      .status(200)
      .send({ success: true, message: "Credentials are not correct" });
  } catch (error) {
    console.log(error);
  }
});

usersRouter.route("/login").post(async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    const user = await UserModel.checkCredentials(email, password);

    if (user) {
      const token = await JWTauth(user);

      res.status(200).send({ success: true, token });
    } else {
      res
        .status(404)
        .send({ success: false, message: "Credentials are not correct" });
    }
  } catch (error) {
    res.status(404).send({ success: false, error: error });
  }
});

usersRouter.post(
  "/register",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const newUser = new UserModel(req.body);
      if (newUser) {
        const { _id } = await newUser.save();

        const { accessToken } = await JWTauth(newUser);
        res.status(201).send({ _id, accessToken });
      } else {
        next(createHttpError(401, "Credentials not ok!"));
      }
    } catch (error) {
      next(error);
    }
  }
);

// usersRouter
//   .route("/register")
//   .post(async (req: Request, res: Response, next: NextFunction) => {
//     try {
//       console.log(req);

//       const newUser = new UserModel(req.body);

//       if (newUser) {
//         const { _id } = await newUser.save();

//         const { accessToken, refreshToken } = await JWTauth(newUser);
//         res.status(201).send({ _id, accessToken, refreshToken });
//       } else {
//         res.status(400).send({
//           success: false,
//           message: "Something Went Wrong in the creation of the user",
//         });
//       }
//     } catch (error) {
//       res.status(400).send({ success: false, error: error });
//       next();
//     }
//   });

usersRouter.route("/refreshToken").post(async (req: Request, res: Response) => {
  try {
    const { currentRefreshToken } = req.body;

    const { accessToken, refreshToken } = await verifyRefreshToken(
      currentRefreshToken
    );

    res.cookie("accessToken", accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production" ? true : false,
      sameSite: "lax",
    });

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production" ? true : false,
      sameSite: "lax",
    });
  } catch (error) {
    res.status(404).send({ success: false, error: error });
  }
});

export default usersRouter;
