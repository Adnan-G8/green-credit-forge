import { pgTable, text, serial, integer, boolean, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const contactRequests = pgTable("contact_requests", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  surname: text("surname").notNull(),
  email: text("email").notNull(),
  company: text("company"),
  subject: text("subject").notNull(),
  message: text("message").notNull(),
  language: text("language").notNull().default("it"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const membershipApplications = pgTable("membership_applications", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  surname: text("surname").notNull(),
  email: text("email").notNull(),
  phone: text("phone").notNull(),
  company: text("company").notNull(),
  city: text("city").notNull(),
  region: text("region").notNull(),
  activity: text("activity").notNull(),
  hectares: text("hectares"),
  interests: text("interests"), // JSON string of array
  notes: text("notes"),
  newsletter: boolean("newsletter").default(false),
  language: text("language").notNull().default("it"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const insertContactRequestSchema = createInsertSchema(contactRequests).omit({
  id: true,
  createdAt: true,
});

export const insertMembershipApplicationSchema = createInsertSchema(membershipApplications).omit({
  id: true,
  createdAt: true,
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;
export type ContactRequest = typeof contactRequests.$inferSelect;
export type InsertContactRequest = z.infer<typeof insertContactRequestSchema>;
export type MembershipApplication = typeof membershipApplications.$inferSelect;
export type InsertMembershipApplication = z.infer<typeof insertMembershipApplicationSchema>;
