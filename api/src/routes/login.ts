import { RSA_NO_PADDING } from "constants";
import { Router } from "express";
import { logOut, logIn } from "../auth";
import { UnAuthorized } from "../errors";
import { catchAsync, ensureAuth, ensureGuest } from "../middleware";
import { User } from "../models/user";
import { loginSchema } from "../validations";
import { validate } from "../validations/joi";

const router = Router();

router.post(
  "/login",
  ensureGuest,
  catchAsync(async (req, res) => {
    await validate(loginSchema, req.body);

    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user || !(await user.matchesPassword(password))) {
      throw new UnAuthorized("Incorrect");
    }

    logIn(req, user.id);

    res.json({ message: "Logged In" });
  })
);

router.post(
  "/logout",
  ensureAuth,
  catchAsync(async (req, res) => {
    await logOut(req, res);

    res.json({ message: "OK" });
  })
);

export default router;
