import { pgTable, uuid, varchar, text, timestamp } from "drizzle-orm/pg-core";

export const userTable = pgTable("users", {
  id: uuid().defaultRandom().primaryKey(),

  fullName: varchar("full_name", { length: 50 }).notNull(),

  email: varchar("email", { length: 255 }).notNull().unique(),

  password: text("password").notNull(),

  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export type User = typeof userTable.$inferSelect
export type NewUser = typeof userTable.$inferInsert
