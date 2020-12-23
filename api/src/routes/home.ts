import { Router } from "express";
import { catchAsync, ensureAuth } from "../middleware";
import { User } from "../models/user";

const router = Router();

router.get(
  "/home",
  ensureAuth,
  catchAsync(async (req, res) => {
    const user = await User.findById(req.session!.userId);
    res.json(user);
  })
);

export default router;
