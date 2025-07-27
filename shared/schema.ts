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

// CO₂ Projects Schema for Real-time Tracking
export const co2Projects = pgTable("co2_projects", {
  id: varchar("id").primaryKey().notNull(),
  userId: varchar("user_id").notNull(),
  alphaG8Id: varchar("alpha_g8_id").notNull(),
  projectType: varchar("project_type").notNull(), // 'farming', 'forest', 'renewable-energy'
  projectName: varchar("project_name").notNull(),
  description: text("description"),
  status: varchar("status").notNull().default("draft"), // 'draft', 'submitted', 'under-review', 'approved', 'in-progress', 'completed', 'rejected'
  
  // Location Information
  country: varchar("country").notNull(),
  region: varchar("region"),
  streetAddress: varchar("street_address"),
  city: varchar("city"),
  postalCode: varchar("postal_code"),
  province: varchar("province"),
  
  // Project Specific Fields
  hectares: varchar("hectares"), // For farming and forest projects
  renewableEnergyType: varchar("renewable_energy_type"), // For renewable energy projects
  renewableCapacity: varchar("renewable_capacity"), // MW/kW capacity
  
  // Certification Details
  estimatedCO2Reduction: varchar("estimated_co2_reduction"), // Tons of CO₂
  certificationStandard: varchar("certification_standard").default("EUFD2025-001"),
  isoStandards: text("iso_standards").array(), // ['ISO 14064-1', 'ISO 14064-2', 'ISO 14064-3']
  
  // Timeline Tracking
  applicationDate: timestamp("application_date").defaultNow(),
  reviewStartDate: timestamp("review_start_date"),
  approvalDate: timestamp("approval_date"),
  completionDate: timestamp("completion_date"),
  lastUpdated: timestamp("last_updated").defaultNow(),
  
  // Progress Tracking
  progressPercentage: integer("progress_percentage").default(0),
  currentPhase: varchar("current_phase").default("application"), // 'application', 'documentation', 'verification', 'certification', 'issuance'
  nextMilestone: varchar("next_milestone"),
  milestoneDate: timestamp("milestone_date"),
  
  // Financial Information
  projectValue: varchar("project_value"), // Estimated value in EUR
  carbonCreditPrice: varchar("carbon_credit_price"), // Price per ton
  expectedRevenue: varchar("expected_revenue"),
  
  // Documentation and Compliance
  documentsSubmitted: integer("documents_submitted").default(0),
  documentsRequired: integer("documents_required").default(0),
  complianceScore: integer("compliance_score").default(0), // 0-100
  
  // Communication and Updates
  lastCommunication: timestamp("last_communication"),
  communicationNotes: text("communication_notes"),
  priority: varchar("priority").default("medium"), // 'low', 'medium', 'high', 'urgent'
  
  // Additional Metadata
  tags: text("tags").array(),
  metadata: jsonb("metadata"),
});

// Project Milestones for detailed tracking
export const projectMilestones = pgTable("project_milestones", {
  id: varchar("id").primaryKey().notNull(),
  projectId: varchar("project_id").notNull(),
  milestoneType: varchar("milestone_type").notNull(), // 'documentation', 'verification', 'approval', 'certification', 'payment'
  title: varchar("title").notNull(),
  description: text("description"),
  status: varchar("status").notNull().default("pending"), // 'pending', 'in-progress', 'completed', 'overdue'
  dueDate: timestamp("due_date"),
  completedDate: timestamp("completed_date"),
  assignedTo: varchar("assigned_to"), // FAGRI team member
  priority: varchar("priority").default("medium"),
  notes: text("notes"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// Project Activities for audit trail
export const projectActivities = pgTable("project_activities", {
  id: varchar("id").primaryKey().notNull(),
  projectId: varchar("project_id").notNull(),
  activityType: varchar("activity_type").notNull(), // 'status_change', 'document_upload', 'communication', 'milestone_update'
  title: varchar("title").notNull(),
  description: text("description"),
  performedBy: varchar("performed_by").notNull(), // User ID or system
  performedByName: varchar("performed_by_name"),
  timestamp: timestamp("timestamp").defaultNow(),
  metadata: jsonb("metadata"), // Additional activity-specific data
});

// Create schemas for the new tables
export const insertCO2ProjectSchema = createInsertSchema(co2Projects).omit({
  applicationDate: true,
  lastUpdated: true,
});

export const insertProjectMilestoneSchema = createInsertSchema(projectMilestones).omit({
  createdAt: true,
  updatedAt: true,
});

export const insertProjectActivitySchema = createInsertSchema(projectActivities).omit({
  timestamp: true,
});

// Export types
export type CO2Project = typeof co2Projects.$inferSelect;
export type InsertCO2Project = z.infer<typeof insertCO2ProjectSchema>;
export type ProjectMilestone = typeof projectMilestones.$inferSelect;
export type InsertProjectMilestone = z.infer<typeof insertProjectMilestoneSchema>;
export type ProjectActivity = typeof projectActivities.$inferSelect;
export type InsertProjectActivity = z.infer<typeof insertProjectActivitySchema>;
