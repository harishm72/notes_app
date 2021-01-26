import express from "express";
import session, { Store } from "express-session";
import cors from "cors";

import { active } from "./auth";
import { SESSION_OPTIONS } from "./config";
import { clientError, internalServerError } from "./errors";
import { catchAsync } from "./middleware";
import { home, login, register } from "./routes";

export const createApp = (store: Store) => {
  const app = express();

  app.use(cors());

  app.use(express.json());

  app.use(
    session({
      ...SESSION_OPTIONS,
      store,
    })
  );

  app.use(catchAsync(active));

  app.use(home);

  app.use(login);

  app.use(register);

  app.use(clientError);

  app.use(internalServerError);

  return app;
};
