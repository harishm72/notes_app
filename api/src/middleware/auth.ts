import { NextFunction, Request, Response } from "express";
import { isLoggedIn } from "../auth";

export const ensureGuest = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (isLoggedIn(req)) {
    return next(new Error("You are already loggedIn."));
  }
  next();
};

export const ensureAuth = (req: Request, res: Response, next: NextFunction) => {
  if (!isLoggedIn(req)) {
    return next(new Error("You are not logged In"));
  }
  next();
};
 