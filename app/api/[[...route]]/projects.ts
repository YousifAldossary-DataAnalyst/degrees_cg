import { z } from "zod";
import { Hono } from "hono";
import { eq, and, desc, asc } from "drizzle-orm";
import { clerkMiddleware, getAuth } from "@hono/clerk-auth";
import { zValidator } from "@hono/zod-validator";

import { projects, projectsInsertSchema } from "@/db/canva-schema";
import { db } from "@/db/drizzle";
import { currentUser } from "@clerk/nextjs/server";

const app = new Hono()
  .get(
    "/sketch/templates",
    // clerkMiddleware(),
    zValidator(
      "query",
      z.object({
        page: z.coerce.number(),
        limit: z.coerce.number(),
      })
    ),
    async (c) => {
      // const auth = getAuth(c);
      const { page, limit } = c.req.valid("query");

      // if (!auth?.userId) {
      //   return c.json({ error: "Unauthorized" }, 401);
      // }

      const data = await db
        .select()
        .from(projects)
        .where(eq(projects.isTemplate, true))
        .limit(limit)
        .offset((page - 1) * limit)
        .orderBy(asc(projects.isPro), desc(projects.updatedAt));

      return c.json({ data });
    }
  )
  .delete(
    "/sketch/:id",
    // clerkMiddleware(),
    zValidator("param", z.object({ id: z.string() })),
    async (c) => {
      const auth = await currentUser();
      // const auth = getAuth(c);
      const { id } = c.req.valid("param");

      // if (!auth?.userId) {
      //   return c.json({ error: "Unauthorized" }, 401);
      // }

      const data = await db
        .delete(projects)
        .where(and(eq(projects.id, id), eq(projects.userId, auth?.id!)))
        .returning();

      if (data.length === 0) {
        return c.json({ error: "Not found" }, 404);
      }

      return c.json({ data: { id } });
    }
  )
  .post(
    "/sketch/:id/duplicate",
    // clerkMiddleware(),
    zValidator("param", z.object({ id: z.string() })),
    async (c) => {
      const auth = await currentUser();
      // const auth = getAuth(c);
      const { id } = c.req.valid("param");

      // if (!auth?.userId) {
      //   return c.json({ error: "Unauthorized" }, 401);
      // }

      const data = await db
        .select()
        .from(projects)
        .where(and(eq(projects.id, id), eq(projects.userId, auth?.id!)));

      if (data.length === 0) {
        return c.json({ error: " Not found" }, 404);
      }

      const project = data[0];

      const duplicateData = await db
        .insert(projects)
        .values({
          name: `Copy of ${project.name}`,
          json: project.json,
          width: project.width,
          height: project.height,
          userId: auth?.id!,
          createdAt: new Date(),
          updatedAt: new Date(),
        })
        .returning();

      return c.json({ data: duplicateData[0] });
    }
  )
  .get(
    "/sketch",
    // clerkMiddleware(),
    zValidator(
      "query",
      z.object({
        page: z.coerce.number(),
        limit: z.coerce.number(),
      })
    ),
    async (c) => {
      // const auth = getAuth(c);
      const auth = await currentUser();
      const { page, limit } = c.req.valid("query");

      // if (!auth?.userId) {
      //   return c.json({ error: "Unauthorized" }, 401);
      // }

      const data = await db
        .select()
        .from(projects)
        .where(eq(projects.userId, auth?.id!))
        .limit(limit)
        .offset((page - 1) * limit)
        .orderBy(desc(projects.updatedAt));

      return c.json({
        data,
        nextPage: data.length === limit ? page + 1 : null,
      });
    }
  )
  .patch(
    "/sketch/:id",
    // clerkMiddleware(),
    zValidator("param", z.object({ id: z.string() })),
    zValidator(
      "json",
      projectsInsertSchema
        .omit({
          id: true,
          userId: true,
          createdAt: true,
          updatedAt: true,
        })
        .partial()
    ),
    async (c) => {
      const auth = await currentUser();
      // const auth = getAuth(c);
      const { id } = c.req.valid("param");
      const values = c.req.valid("json");

      // if (!auth?.userId) {
      //   return c.json({ error: "Unauthorized" }, 401);
      // }

      const data = await db
        .update(projects)
        .set({
          ...values,
          updatedAt: new Date(),
        })
        .where(and(eq(projects.id, id), eq(projects.userId, auth?.id!)))
        .returning();

      if (data.length === 0) {
        return c.json({ error: "Unauthorized" }, 401);
      }

      return c.json({ data: data[0] });
    }
  )
  .get(
    "/sketch/:id",
    // clerkMiddleware(),
    zValidator("param", z.object({ id: z.string() })),
    async (c) => {
      const auth = await currentUser();
      // const auth = getAuth(c);
      const { id } = c.req.valid("param");

      // if (!auth?.userId) {
      //   return c.json({ error: "Unauthorized" }, 401);
      // }

      const data = await db
        .select()
        .from(projects)
        .where(and(eq(projects.id, id), eq(projects.userId, auth?.id!)));

      if (data.length === 0) {
        return c.json({ error: "Not found" }, 404);
      }

      return c.json({ data: data[0] });
    }
  )
  .post(
    "/sketch",
    // clerkMiddleware(),
    zValidator(
      "json",
      projectsInsertSchema.pick({
        name: true,
        json: true,
        width: true,
        height: true,
      })
    ),
    async (c) => {
      const auth = await currentUser();
      const { name, json, height, width } = c.req.valid("json");

      if (!auth?.id) {
        return c.json({ error: "Unauthorized" }, 401);
      }

      const data = await db
        .insert(projects)
        .values({
          name,
          json,
          width,
          height,
          userId: auth.id,
          createdAt: new Date(),
          updatedAt: new Date(),
        })
        .returning();

      if (!data[0]) {
        return c.json({ error: "Something went wrong" }, 400);
      }

      return c.json({ data: data[0] });
    }
  );

export default app;
