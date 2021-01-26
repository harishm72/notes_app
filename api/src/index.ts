import Redis from "ioredis";
import session from "express-session";
import connectRedis from "connect-redis";

import { createApp } from "./app";
import { REDIS_OPTIONS, APP_PORT } from "./config";

(async () => {
  const RedisStore = connectRedis(session);

  const client = new Redis(REDIS_OPTIONS);

  const store = new RedisStore({ client });

  const app = createApp(store);

  app.listen(APP_PORT, () => {
    console.log(`http://localhost:${APP_PORT}`);
  });
})();
