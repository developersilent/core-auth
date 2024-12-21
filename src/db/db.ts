import { neon } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-http';
import {env} from "@/env";
import * as schema from "@/db/schema/index";

const pg = neon(env.DATABASE_URL);
export const db = drizzle(pg, {
    schema
});