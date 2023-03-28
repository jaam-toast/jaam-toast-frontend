import Redis from "ioredis";

import Config from "src/config";

import type { NextApiRequest, NextApiResponse } from "next";

const redis = new Redis({
  host: Config.REDIS_HOST,
  port: Config.REDIS_PORT,
  username: Config.REDIS_USERNAME,
  password: Config.REDIS_PASSWORD,
});

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  switch (req.method) {
    case "GET": {
      const data = await redis.get(req.query.key as string);
      return res.status(200).json(data);
    }
    case "POST": {
      await redis.del([req.query.key as string]);

      const data = await redis.set(
        req.query.key as string,
        req.body.value,
        "EX",
        18000,
      );

      return res.status(201).json(data);
    }
  }
}
