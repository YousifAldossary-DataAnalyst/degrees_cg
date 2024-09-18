/** @type { import("drizzle-kit").Config } */
import { config } from "dotenv";

config({ path: ".env" });

export default {
  schema: "./db/schema.ts",
  dialect: 'postgresql',
  dbCredentials: {
    url: process.env.DATABASE_URL!,
  },
};