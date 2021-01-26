import { NextFunction, Request, Response } from "express";
import { SESSION_ABSOLUTE_TIMEOUT, SESSION_NAME } from "./config";
import { UnAuthorized } from "./errors";

export const logIn = (req: Request, userId: string) => {
  req.session!.userId = userId;
  req.session!.createdAt = Date.now();
};

export const logOut = (req: Request, res: Response) =>
  new Promise<void>((resolve, reject) => {
    req.session!.destroy((err: Error) => {
      if (err) reject(err);

      res.clearCookie(SESSION_NAME);
      resolve();
    });
  });

export const active = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (isLoggedIn(req)) {
    const now = Date.now();
    const { createdAt } = req.session as Express.Session;

    if (now > createdAt + SESSION_ABSOLUTE_TIMEOUT) {
      await logOut(req, res);

      return next(new UnAuthorized("Session Expired"));
    }
  }

  next();
};

export const isLoggedIn = (req: Request) => !!req.session!.userId;
