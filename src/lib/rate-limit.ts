import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";

/**
 * Rate limiter with automatic backend selection:
 * - If UPSTASH_REDIS_REST_URL is set → uses Upstash Redis (distributed, production-ready)
 * - Otherwise → uses in-memory Map (fine for single instance / dev)
 */

// --- In-memory fallback ---

interface RateLimitEntry {
  count: number;
  resetTime: number;
}

const memoryStore = new Map<string, RateLimitEntry>();

// Clean up expired entries periodically
if (typeof setInterval !== "undefined") {
  setInterval(() => {
    const now = Date.now();
    for (const [key, entry] of memoryStore) {
      if (now > entry.resetTime) {
        memoryStore.delete(key);
      }
    }
  }, 5 * 60 * 1000);
}

function memoryRateLimit(
  identifier: string,
  limit: number,
  windowSeconds: number
): { success: boolean } {
  const now = Date.now();
  const windowMs = windowSeconds * 1000;
  const entry = memoryStore.get(identifier);

  if (!entry || now > entry.resetTime) {
    memoryStore.set(identifier, { count: 1, resetTime: now + windowMs });
    return { success: true };
  }

  if (entry.count >= limit) {
    return { success: false };
  }

  entry.count++;
  return { success: true };
}

// --- Upstash Redis backend ---

const upstashLimiters = new Map<string, Ratelimit>();

function getUpstashLimiter(limit: number, windowSeconds: number): Ratelimit {
  const key = `${limit}:${windowSeconds}`;
  let limiter = upstashLimiters.get(key);
  if (!limiter) {
    limiter = new Ratelimit({
      redis: Redis.fromEnv(),
      limiter: Ratelimit.slidingWindow(limit, `${windowSeconds} s`),
      analytics: true,
    });
    upstashLimiters.set(key, limiter);
  }
  return limiter;
}

// --- Public API ---

interface RateLimitOptions {
  limit: number;
  windowSeconds: number;
}

export async function rateLimit(
  identifier: string,
  options: RateLimitOptions
): Promise<{ success: boolean }> {
  if (process.env.UPSTASH_REDIS_REST_URL) {
    const limiter = getUpstashLimiter(options.limit, options.windowSeconds);
    const { success } = await limiter.limit(identifier);
    return { success };
  }

  return memoryRateLimit(identifier, options.limit, options.windowSeconds);
}

/** Extract a client identifier from a request (IP or fallback) */
export function getClientId(request: Request): string {
  return (
    request.headers.get("x-forwarded-for")?.split(",")[0].trim() ||
    request.headers.get("x-real-ip") ||
    "unknown"
  );
}
