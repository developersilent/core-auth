import { defineConfig } from "drizzle-kit";
import { env } from "@/env";

if (env.DATABASE_URL === undefined) {
  console.error("DATABASE_URL is not defined in the environment variables");
}
export default defineConfig({
  out: "./src/db/generated",
  schema: "./src/db/schema/schema.ts",
  dialect: "postgresql",
  dbCredentials: {
    url: env.DATABASE_URL,
  },
});
