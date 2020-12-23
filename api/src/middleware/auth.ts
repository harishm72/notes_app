import { NextFunction, Request, Response } from "express";
import { isLoggedIn } from "../auth";
import { BadRequest, UnAuthorized } from "../errors";

export const ensureGuest = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (isLoggedIn(req)) {
    return next(new BadRequest("You are already loggedIn."));
  }
  next();
};

export const ensureAuth = (req: Request, res: Response, next: NextFunction) => {
  if (!isLoggedIn(req)) {
    return next(new UnAuthorized("You are not logged In"));
  }
  next();
};
