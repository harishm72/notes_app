import { NextFunction, Request, Response } from "express";

abstract class HttpError extends Error {
  public status!: number;
}

export class BadRequest extends HttpError {
  constructor(message = "bad Request") {
    super(message);

    this.status = 400;
  }
}

export const clientError = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  res.status(404).json({ message: "Sorry Can't find that!" });
};

export const internalServerError = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (!err.status) {
    console.error(err.stack);
  }

  res
    .status(err.status || 500)
    .json({ message: err.message || "Internal Server Error!" });
};
