import {
  pgTable,
  uuid,
  varchar,
  text,
  timestamp,
  integer,
} from "drizzle-orm/pg-core";
import { userTable } from "./user.schema";

export const linkTable = pgTable("links", {
  
  id: uuid().defaultRandom().primaryKey(),

  userId: uuid("user_id")
    .references(() => userTable.id)
    .notNull(),

  code: varchar("code", { length: 10 }).notNull().unique(),

  fullLink: text("full_link").notNull(),

  clickCount: integer("click_count").default(0).notNull(),
  
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export type Link = typeof linkTable.$inferSelect;
export type NewLink = typeof linkTable.$inferInsert;
