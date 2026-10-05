import { drizzle } from "drizzle-orm/neon-http";
import { neon } from "@neondatabase/serverless";
import { eq } from "drizzle-orm";
import * as schema from "./schema";

const databaseUrl = process.env.DATABASE_URL;

// In-Memory Fallback Cache when DB is not configured or offline
const inMemoryScenarios = new Map<string, {
  slug: string;
  calculator: string;
  inputs: any;
  result: any;
  createdAt: Date;
}>();

const inMemorySubscribers = new Set<string>();
const inMemoryFeedback: Array<{ scenarioSlug?: string; helpful: boolean; note?: string; createdAt: Date }> = [];

/**
 * Helper to run DB queries with a strict fast 1.5s timeout to prevent UI freezes
 */
async function withTimeout<T>(promise: Promise<T>, timeoutMs = 1500): Promise<T> {
  let timeoutId: NodeJS.Timeout;
  const timeoutPromise = new Promise<never>((_, reject) => {
    timeoutId = setTimeout(() => reject(new Error("Database operation timed out")), timeoutMs);
  });
  return Promise.race([promise, timeoutPromise]).finally(() => clearTimeout(timeoutId));
}

export function getDb() {
  if (!databaseUrl || databaseUrl.includes("user:password")) {
    return null;
  }
  try {
    const sql = neon(databaseUrl);
    return drizzle(sql, { schema });
  } catch (err) {
    return null;
  }
}

/**
 * Save Scenario with DB or fast In-Memory fallback
 */
export async function saveScenario(
  slug: string,
  calculator: "sip" | "emi" | "salary",
  inputs: Record<string, any>,
  result: Record<string, any>
): Promise<{ slug: string; isSavedToDb: boolean }> {
  const db = getDb();
  if (db) {
    try {
      await withTimeout(
        db.insert(schema.scenarios).values({
          slug,
          calculator,
          inputs,
          result,
        })
      );
      return { slug, isSavedToDb: true };
    } catch (err) {
      // Fallback silently to fast in-memory store
    }
  }

  inMemoryScenarios.set(slug, {
    slug,
    calculator,
    inputs,
    result,
    createdAt: new Date(),
  });
  return { slug, isSavedToDb: false };
}

/**
 * Get Scenario by Slug
 */
export async function getScenarioBySlug(slug: string) {
  const db = getDb();
  if (db) {
    try {
      const records = await withTimeout(
        db
          .select()
          .from(schema.scenarios)
          .where(eq(schema.scenarios.slug, slug))
          .limit(1)
      );
      if (records.length > 0) return records[0];
    } catch (err) {
      // Fallback to in-memory store
    }
  }

  const memRecord = inMemoryScenarios.get(slug);
  if (memRecord) {
    return {
      id: "mem-" + slug,
      slug: memRecord.slug,
      calculator: memRecord.calculator,
      inputs: memRecord.inputs,
      result: memRecord.result,
      createdAt: memRecord.createdAt,
    };
  }

  return null;
}

/**
 * Save Email Subscriber
 */
export async function saveSubscriber(email: string, source: string = "homepage") {
  const normalizedEmail = email.trim().toLowerCase();
  const db = getDb();

  if (db) {
    try {
      await withTimeout(
        db.insert(schema.subscribers).values({
          email: normalizedEmail,
          source,
        })
      );
      return { success: true, isDuplicate: false, isSavedToDb: true };
    } catch (err: any) {
      if (err?.code === "23505" || err?.message?.includes("unique constraint")) {
        return { success: true, isDuplicate: true, isSavedToDb: true };
      }
    }
  }

  if (inMemorySubscribers.has(normalizedEmail)) {
    return { success: true, isDuplicate: true, isSavedToDb: false };
  }
  inMemorySubscribers.add(normalizedEmail);
  return { success: true, isDuplicate: false, isSavedToDb: false };
}

/**
 * Save User Feedback
 */
export async function saveFeedback(scenarioSlug: string | undefined, helpful: boolean, note?: string) {
  const db = getDb();
  if (db) {
    try {
      await withTimeout(
        db.insert(schema.feedback).values({
          scenarioSlug: scenarioSlug || null,
          helpful,
          note: note || null,
        })
      );
      return { success: true, isSavedToDb: true };
    } catch (err) {
      // Fallback
    }
  }

  inMemoryFeedback.push({ scenarioSlug, helpful, note, createdAt: new Date() });
  return { success: true, isSavedToDb: false };
}
