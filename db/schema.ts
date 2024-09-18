import { relations } from "drizzle-orm";
import { createInsertSchema } from "drizzle-zod";
import {
  varchar,
  pgTable,
  uuid,
  text,
  integer,
  primaryKey,
  timestamp,
  boolean,
} from "drizzle-orm/pg-core";

//Content generator
export const AIoutput = pgTable("aiOutput", {
  id: uuid("id").defaultRandom().primaryKey(),
  userId: varchar("userId"),
  formData: varchar("formData"),
  aiResponse: text("aiResponse"),
  templateSlug: varchar("Slug").notNull(),
  createdBy: varchar("email"),
  createAt: varchar("createAt"),
});

//Resume generator
export const ResumeGenerator = pgTable("resume", {
  resumeId: uuid("id").defaultRandom().primaryKey(),
  userId: varchar("userId"),
  title: varchar("title"),
  userName: varchar("userName"),
  createdBy: varchar("email"),
  createAt: varchar("createAt"),
});

//Whiteboard
export const CreateBoard = pgTable("boards", {
  boardId: uuid("id").defaultRandom().primaryKey(),
  userId: varchar("userId"),
  title: varchar("title"),
  createdBy: varchar("email"),
  createAt: varchar("createAt"),
});

export const EditBoards = pgTable("boardEdit", {
  editId: uuid("id").defaultRandom().primaryKey(),
  //   boardId: text("boardId").references(() => CreateBoard.boardId),
  userId: varchar("userId"),
  imageUrl: varchar("image"),
  title: varchar("title"),
  createdBy: varchar("email"),
  createAt: varchar("createAt"),
});

// export const boardRelations = relations(EditBoards, ({ one }) => ({
//   boards: one(CreateBoard, {
//     fields: [EditBoards.boardId],
//     references: [CreateBoard.boardId],
//   }),
// }));

//Podcast
import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  podcasts: defineTable({
    user: v.id('users'),
    podcastTitle: v.string(),
    podcastDescription: v.string(),
    audioUrl: v.optional(v.string()),
    audioStorageId: v.optional(v.id("_storage")),
    imageUrl: v.optional(v.string()),
    imageStorageId: v.optional(v.id("_storage")),
    voicePrompt: v.string(),
    imagePrompt: v.string(),
    voiceType: v.string(),
    audioDuration: v.number(),
    views: v.number()
  })
    .searchIndex("search_title", { searchField: "podcastTitle" })
    .searchIndex("search_body", { searchField: "podcastDescription" }),
  users: defineTable({
    id: v.string(),
    email: v.string(),
    imageUrl: v.string(),
    clerkId: v.string(),
    name: v.string(),
  }),
});

// Sketch
//WIP: everytime the user sign up create a new user in DB
export const users = pgTable("user", {
  id: text("id").primaryKey(),
  name: text("name"),
  email: text("email").notNull(),
  image: text("image"),
});

export const usersInsertSchema = createInsertSchema(users);

export const usersRelations = relations(users, ({ many }) => ({
  projects: many(projects),
}));

export const accounts = pgTable(
  "account",
  {
    userId: text("userId")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    provider: text("provider").notNull(),
    providerAccountId: text("providerAccountId").notNull(),
  },
  (account) => ({
    compoundKey: primaryKey({
      columns: [account.provider, account.providerAccountId],
    }),
  })
);

export const sessions = pgTable("session", {
  sessionToken: text("sessionToken").primaryKey(),
  userId: text("userId")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  expires: timestamp("expires", { mode: "date" }).notNull(),
});

export const projects = pgTable("project", {
  projectId: uuid("id").defaultRandom().primaryKey(),
  name: text("name").notNull(),
  // userId: text("userId")
  //   .notNull()
  //   .references(() => users.id, {
  //     onDelete: "cascade",
  //   }),
  userId: text("userId").notNull(),
  json: text("json").notNull(),
  height: integer("height").notNull(),
  width: integer("width").notNull(),
  thumbnailUrl: text("thumbnailUrl"),
  isTemplate: boolean("isTemplate"),
  // isPro: boolean("isPro"),
  createdAt: timestamp("createdAt", { mode: "date" }).notNull(),
  updatedAt: timestamp("updatedAt", { mode: "date" }).notNull(),
});

export const projectsRelations = relations(projects, ({ one }) => ({
  user: one(users, {
    fields: [projects.userId],
    references: [users.id],
  }),
}));

export const projectsInsertSchema = createInsertSchema(projects);

// export const subscriptions = pgTable("subscription", {
//   id:  uuid("id").defaultRandom().primaryKey(),
//   userId: text("userId")
//     .notNull()
//     .references(() => users.id, {
//       onDelete: "cascade"
//     }),
//   subscriptionId: text("subscriptionId").notNull(),
//   customerId: text("customerId").notNull(),
//   priceId: text("priceId").notNull(),
//   status: text("status").notNull(),
//   currentPeriodEnd: timestamp("currentPeriodEnd", { mode: "date" }),
//   createdAt: timestamp("createdAt", { mode: "date" }).notNull(),
//   updatedAt: timestamp("updatedAt", { mode: "date" }).notNull(),
// });
