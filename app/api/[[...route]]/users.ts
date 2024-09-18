import { z } from "zod";
import { Hono } from "hono";
import { eq } from "drizzle-orm";
import { zValidator } from "@hono/zod-validator";
import { users, usersInsertSchema } from "@/db/schema";
import { db } from "@/db/drizzle";
import { useUser } from "@clerk/nextjs";
import { currentUser } from "@clerk/nextjs/server";

const app = new Hono()
  .post(
    "/",
    zValidator(
      "json",
      usersInsertSchema.pick({
        id: true,
        email: true,
      })
    ),
    async (c) => {
      const auth = await currentUser();

      const query = await db
        .select()
        .from(users)
        .where(eq(users.email, auth?.emailAddresses[0].emailAddress!));

      if (query[0]) {
        return c.json({ error: "Email already in use" }, 400);
      }

      await db.insert(users).values({
        id: auth?.id!,
        email: auth?.emailAddresses[0].emailAddress!,
        name: auth?.fullName,
        image: auth?.imageUrl,
      })
      
      return c.json(null, 200);
    },
  );

export default app;
