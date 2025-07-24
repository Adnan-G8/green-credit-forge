import { pgTable, text, serial, integer, boolean, timestamp, varchar, jsonb } from "drizzle-orm/pg-core";
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

// Document Management System Tables
export const documents = pgTable("documents", {
  id: varchar("id").primaryKey().notNull(),
  userId: varchar("user_id").notNull(),
  projectId: varchar("project_id"),
  title: varchar("title").notNull(),
  description: text("description"),
  category: varchar("category").notNull(), // 'certification', 'compliance', 'technical', 'legal', 'financial'
  documentType: varchar("document_type").notNull(), // 'pdf', 'image', 'spreadsheet', 'text'
  fileName: varchar("file_name").notNull(),
  fileSize: varchar("file_size").notNull(),
  uploadDate: timestamp("upload_date").defaultNow(),
  lastModified: timestamp("last_modified").defaultNow(),
  status: varchar("status").default("active"), // 'active', 'archived', 'deleted'
  isPublic: varchar("is_public").default("false"), // 'true', 'false'
  tags: text("tags").array(),
  metadata: jsonb("metadata"), // Additional file metadata
});

export const documentShares = pgTable("document_shares", {
  id: varchar("id").primaryKey().notNull(),
  documentId: varchar("document_id").notNull(),
  sharedWith: varchar("shared_with").notNull(),
  sharedBy: varchar("shared_by").notNull(),
  permissions: varchar("permissions").notNull(), // 'view', 'edit', 'admin'
  shareDate: timestamp("share_date").defaultNow(),
  expiryDate: timestamp("expiry_date"),
  status: varchar("status").default("active"), // 'active', 'revoked'
});

export const documentVersions = pgTable("document_versions", {
  id: varchar("id").primaryKey().notNull(),
  documentId: varchar("document_id").notNull(),
  versionNumber: varchar("version_number").notNull(),
  fileName: varchar("file_name").notNull(),
  fileSize: varchar("file_size").notNull(),
  uploadDate: timestamp("upload_date").defaultNow(),
  uploadedBy: varchar("uploaded_by").notNull(),
  changeLog: text("change_log"),
  isActive: varchar("is_active").default("false"), // 'true', 'false'
});

export const insertDocumentSchema = createInsertSchema(documents).omit({
  uploadDate: true,
  lastModified: true,
});

export const insertDocumentShareSchema = createInsertSchema(documentShares).omit({
  shareDate: true,
});

export const insertDocumentVersionSchema = createInsertSchema(documentVersions).omit({
  uploadDate: true,
});

export type Document = typeof documents.$inferSelect;
export type InsertDocument = z.infer<typeof insertDocumentSchema>;
export type DocumentShare = typeof documentShares.$inferSelect;
export type InsertDocumentShare = z.infer<typeof insertDocumentShareSchema>;
export type DocumentVersion = typeof documentVersions.$inferSelect;
export type InsertDocumentVersion = z.infer<typeof insertDocumentVersionSchema>;
