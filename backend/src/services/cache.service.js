import { redis } from "../config/redis.js";

// Save to cache
export const cacheSet = async (key, value, ttl = 3600) => {
  try {
    const json = JSON.stringify(value); // always valid JSON
    await redis.set(key, json, { ex: ttl }); // Upstash valid format
  } catch (err) {
    console.error("❌ Redis SET Error:", err.message);
  }
};

// Get from cache
export const cacheGet = async (key) => {
  try {
    const data = await redis.get(key);
    if (!data) return null;

    return JSON.parse(data);
  } catch (err) {
    console.error(`❌ Redis GET Error on key "${key}":`, err.message);
    return null;
  }
};

// Delete a single key
export const cacheDel = async (key) => {
  try {
    await redis.del(key);
  } catch (err) {
    console.error("❌ Redis DEL Error:", err.message);
  }
};

// Delete keys by prefix
export const cacheDelPrefix = async (prefix) => {
  try {
    const keys = await redis.keys(`${prefix}*`);
    if (keys.length > 0) {
      await redis.del(keys);
    }
  } catch (err) {
    console.error("❌ Redis DEL PREFIX Error:", err.message);
  }
};
