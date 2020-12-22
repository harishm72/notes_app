import { Router } from "express";
import { logIn } from "../auth";
import { BadRequest } from "../errors";
import { ensureGuest, catchAsync } from "../middleware";
import { User } from "../models/user";
import { registerSchema } from "../validations";
import { validate } from "../validations/joi";

const router = Router();

router.post(
  "/register",
  ensureGuest,
  catchAsync(async (req, res) => {
    
    await validate(registerSchema, req.body);

    try {
      const { name, email, password } = req.body;

      const found = await User.exists({ email });

      if (found) {
        throw new BadRequest("Email is already taken");
      }

      const user = await User.create({
        email,
        name,
        password,
      });

      logIn(req, user.id);
    } catch (error) {
      res.send(error);
    }

    res.json({ message: "OK" });
  })
);

export default router;
