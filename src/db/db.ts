import { drizzle } from "drizzle-orm/neon-http";
import { env } from "@/env";
import { neon } from "@neondatabase/serverless";
import * as schema from "@/db/schema/schema";

const pg = neon(env.DATABASE_URL);
export const db = drizzle(pg, {
  schema: schema,
  // logger: true
});
