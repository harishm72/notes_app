import { Request, Response, NextFunction, RequestHandler } from "express";

export const catchAsync = (handler: RequestHandler) => (
  ...args: [Request, Response, NextFunction]
) => handler(...args).catch(args[2]);
