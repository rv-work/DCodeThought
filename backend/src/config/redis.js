import { Redis } from "@upstash/redis";
import dotenv from "dotenv";

dotenv.config();

if (
  !process.env.UPSTASH_REDIS_REST_URL ||
  !process.env.UPSTASH_REDIS_REST_TOKEN
) {
  console.warn("⚠️ Upstash Redis env vars missing");
}

export const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL,
  token: process.env.UPSTASH_REDIS_REST_TOKEN,
});

console.log("⚡ Upstash Redis Ready");