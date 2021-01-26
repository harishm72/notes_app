import { Router } from "express";
import { PrismaClient } from "@prisma/client";

import { logOut, logIn } from "../auth";
import { UnAuthorized } from "../errors";
import { catchAsync, ensureAuth, ensureGuest } from "../middleware";
import { loginSchema } from "../validations";
import { validate } from "../validations/joi";
import { hash } from "bcryptjs";
import { BCRYPT_WORK_FACTOR } from "../config";

const router = Router();

router.post(
  "/login",
  ensureGuest,
  catchAsync(async (req, res) => {
    await validate(loginSchema, req.body);

    const { email, password } = req.body;

    console.log(email, password);

    const prisma = new PrismaClient();

    const hashedPassword = await hash(password, BCRYPT_WORK_FACTOR);

    const user = await prisma.user.findUnique({
      where: {
        emailId: email,
      },
    });

    if (!user || user?.password !== hashedPassword) {
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
