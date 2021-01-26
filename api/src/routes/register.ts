import { Router } from "express";
import { logIn } from "../auth";
import { BadRequest } from "../errors";
import { ensureGuest, catchAsync } from "../middleware";
import { registerSchema } from "../validations";
import { validate } from "../validations/joi";
import { PrismaClient } from "@prisma/client";
import { hash } from "bcryptjs";
import { BCRYPT_WORK_FACTOR } from "../config";

const router = Router();

router.post(
  "/register",
  ensureGuest,
  catchAsync(async (req, res) => {
    await validate(registerSchema, req.body);

    const { fullName, email, password } = req.body;

    const prisma = new PrismaClient();

    const found = await prisma.user.findFirst({
      where: {
        emailId: email,
      },
    });

    if (found) {
      throw new BadRequest("Email is already taken");
    }

    const hashedPassword = await hash(password, BCRYPT_WORK_FACTOR);
    console.log(hashedPassword);
    

    const newUser = await prisma.user.create({
      data: {
        fullName: fullName,
        emailId: email,
        password: hashedPassword
      },
    });

    logIn(req, newUser.id);

    res.json({ message: "OK" });
  })
);

export default router;
