import { Router } from "express";
import { catchAsync, ensureAuth } from "../middleware";
import { PrismaClient } from "@prisma/client";
import { BadRequest, UnAuthorized } from "../errors";

const router = Router();

router.get(
  "/home",
  ensureAuth,
  catchAsync(async (req, res) => {
    const prisma = new PrismaClient();

    const user = await prisma.user.findFirst({
      where: {
        id: req.session?.userId,
      },
      select: {
        id: true,
        fullName: true,
        emailId: true,
        createdAt: true,
      },
    });

    res.json(user);
  })
);

router.get(
  "/hasura-webhook",
  ensureAuth,
  catchAsync(async (req, res) => {
    const prisma = new PrismaClient();

    const user = await prisma.user.findFirst({
      where: {
        id: req.session?.userId,
      },
    });

    if (!user) {
      throw new UnAuthorized();
    }

    // Return appropriate response to Hasura
    const hasuraVariables = {
      "X-Hasura-Role": "user", // result.role
      "X-Hasura-User-Id": user?.id, // result.user_id
    };
    res.status(200).json(hasuraVariables);
  })
);

export default router;
