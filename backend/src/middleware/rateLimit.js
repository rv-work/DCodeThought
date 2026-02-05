import { redis } from "../config/redis.js";

export const rateLimit =
  ({ keyPrefix, limit, windowSec }) =>
  async (req, res, next) => {
    try {
      const ip = req.ip;
      const key = `${keyPrefix}:${ip}`;

      const current = await redis.incr(key);

      if (current === 1) {
        await redis.expire(key, windowSec);
      }

      if (current > limit) {
        return res.status(429).json({
          success: false,
          message: "Too many requests. Please slow down.",
        });
      }

      next();
    } catch (err) {
      next();
    }
  };
