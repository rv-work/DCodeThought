import { redis } from "../config/redis.js";

// 🔹 Save to cache
export const cacheSet = async (key, value, ttl = 3600) => {
  try {
    await redis.set(key, JSON.stringify(value), { ex: ttl }); // <-- FIXED
  } catch (err) {
    console.error("❌ Redis SET Error:", err.message);
  }
};

// 🔹 Get from cache
export const cacheGet = async (key) => {
  try {
    const data = await redis.get(key);
    return data ? JSON.parse(data) : null;
  } catch (err) {
    console.error("❌ Redis GET Error:", err.message);
    return null;
  }
};

// 🔹 Delete a cache key
export const cacheDel = async (key) => {
  try {
    await redis.del(key);
  } catch (err) {
    console.error("❌ Redis DEL Error:", err.message);
  }
};

// 🔹 Clear multiple keys with prefix
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
