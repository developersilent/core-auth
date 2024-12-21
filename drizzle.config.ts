import { defineConfig } from "drizzle-kit";
import { env } from "@/env";

export default defineConfig({
  out: "./src/db/generated",
  schema: "./src/db/schema/schema.ts",
  dialect: "postgresql",
  dbCredentials: {
    url: env.DATABASE_URL,
  },
});
