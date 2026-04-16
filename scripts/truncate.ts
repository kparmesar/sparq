import { config } from "dotenv";
config({ path: ".env.local" });
import { neon } from "@neondatabase/serverless";

const sql = neon(process.env.DATABASE_URL!);

async function main() {
  await sql`TRUNCATE projects, events, showcase, blog_posts RESTART IDENTITY CASCADE`;
  console.log("All tables truncated.");
}

main().catch(console.error);
