import { pgTable, text, serial, integer, boolean, timestamp, varchar, jsonb } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

// FAGRI ID KEY User Profiles
export const userProfiles = pgTable("user_profiles", {
  id: serial("id").primaryKey(),
  fagriIdKey: varchar("fagri_id_key").notNull().unique(), // FAGRI-XXXXXXXX-XXXXXXXX-XX format
  fullName: varchar("full_name").notNull(),
  email: varchar("email").notNull(),
  phone: varchar("phone"),
  company: varchar("company"),
  userRole: varchar("user_role").notNull().default("FAGRI Member"), // FAGRI Member, FAGRI Sales Team, Non-Member
  profileImageUrl: varchar("profile_image_url"),
  address: text("address"),
  city: varchar("city"),
  postalCode: varchar("postal_code"),
  country: varchar("country").notNull().default("Italy"),
  dateOfBirth: varchar("date_of_birth"),
  fiscalCode: varchar("fiscal_code"),
  isActive: boolean("is_active").notNull().default(true),
  lastLogin: timestamp("last_login"),
  // KYC Status Fields
  kycStatus: varchar("kyc_status").notNull().default("pending"), // pending, under-review, approved, rejected
  kycCompletedBy: varchar("kyc_completed_by"), // employee ID if done by staff, null if self-completed
  kycCompletedDate: timestamp("kyc_completed_date"),
  kycApprovedBy: varchar("kyc_approved_by"), // admin who approved
  kycApprovedDate: timestamp("kyc_approved_date"),
  kycNotes: text("kyc_notes"), // internal notes for review process
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

// User Sessions for Security Dashboard
export const userSessions = pgTable("user_sessions", {
  id: serial("id").primaryKey(),
  fagriIdKey: varchar("fagri_id_key").notNull(),
  sessionId: varchar("session_id").notNull().unique(),
  ipAddress: varchar("ip_address").notNull(),
  deviceInfo: varchar("device_info").notNull(),
  location: varchar("location").notNull(),
  loginTime: timestamp("login_time").defaultNow().notNull(),
  lastActivity: timestamp("last_activity").defaultNow().notNull(),
  isActive: boolean("is_active").notNull().default(true),
});

// KYC Documents Management
export const kycDocuments = pgTable("kyc_documents", {
  id: serial("id").primaryKey(),
  fagriIdKey: varchar("fagri_id_key").notNull(),
  documentType: varchar("document_type").notNull(), // 'personal_id_front', 'personal_id_back', 'address_proof', 'company_registration', 'business_license', 'management_id', 'authorization_letter'
  entityType: varchar("entity_type").notNull(), // 'individual', 'company', 'management'
  entityName: varchar("entity_name"), // For company/management person name
  fileName: varchar("file_name").notNull(),
  fileSize: integer("file_size").notNull(),
  mimeType: varchar("mime_type").notNull(),
  fileData: text("file_data").notNull(), // Base64 encoded file data
  uploadedBy: varchar("uploaded_by").notNull(), // 'self' or employee FAGRI ID
  uploadedByEmployee: varchar("uploaded_by_employee"), // Employee FAGRI ID if uploaded by staff
  verificationStatus: varchar("verification_status").notNull().default("pending"), // pending, verified, rejected
  verificationNotes: text("verification_notes"),
  verifiedBy: varchar("verified_by"), // Admin who verified
  verifiedDate: timestamp("verified_date"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

// Payment Tracking for Projects
export const projectPayments = pgTable("project_payments", {
  id: serial("id").primaryKey(),
  fagriIdKey: varchar("fagri_id_key").notNull(),
  projectId: varchar("project_id").notNull(),
  paymentType: varchar("payment_type").notNull(), // 'first_project', 'additional_project'
  amount: integer("amount").notNull(), // Amount in cents (EUR)
  vatAmount: integer("vat_amount").notNull(), // VAT in cents
  totalAmount: integer("total_amount").notNull(), // Total with VAT in cents
  paymentStatus: varchar("payment_status").notNull().default("pending"), // pending, received, verified, failed
  paymentMethod: varchar("payment_method"), // 'bank_transfer', 'credit_card'
  transactionReference: varchar("transaction_reference"),
  paymentDate: timestamp("payment_date"),
  verifiedBy: varchar("verified_by"), // Employee who verified payment
  verifiedDate: timestamp("verified_date"),
  paymentNotes: text("payment_notes"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

// Audit Trail for all KYC and Payment activities
export const auditTrail = pgTable("audit_trail", {
  id: serial("id").primaryKey(),
  fagriIdKey: varchar("fagri_id_key").notNull(),
  actionType: varchar("action_type").notNull(), // 'kyc_upload', 'kyc_approval', 'payment_received', 'project_review', 'document_verification'
  actionDetails: text("action_details").notNull(), // JSON string with action details
  performedBy: varchar("performed_by").notNull(), // FAGRI ID of who performed action
  performedByType: varchar("performed_by_type").notNull(), // 'user', 'employee', 'admin'
  relatedId: varchar("related_id"), // Related project, document, or payment ID
  ipAddress: varchar("ip_address"),
  userAgent: varchar("user_agent"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
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

// User Profile schemas
export const insertUserProfileSchema = createInsertSchema(userProfiles).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const insertUserSessionSchema = createInsertSchema(userSessions).omit({
  id: true,
  loginTime: true,
  lastActivity: true,
});

export type UserProfile = typeof userProfiles.$inferSelect;
export type InsertUserProfile = z.infer<typeof insertUserProfileSchema>;
export type UserSession = typeof userSessions.$inferSelect;
export type InsertUserSession = z.infer<typeof insertUserSessionSchema>;

// KYC and Payment schemas
export const insertKycDocumentSchema = createInsertSchema(kycDocuments).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const insertProjectPaymentSchema = createInsertSchema(projectPayments).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const insertAuditTrailSchema = createInsertSchema(auditTrail).omit({
  id: true,
  createdAt: true,
});

export type KycDocument = typeof kycDocuments.$inferSelect;
export type InsertKycDocument = z.infer<typeof insertKycDocumentSchema>;
export type ProjectPayment = typeof projectPayments.$inferSelect;
export type InsertProjectPayment = z.infer<typeof insertProjectPaymentSchema>;
export type AuditTrail = typeof auditTrail.$inferSelect;
export type InsertAuditTrail = z.infer<typeof insertAuditTrailSchema>;

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
  
  // CO₂ Calculation Fields for Renewable Energy (Italian Standard: 0.53 kg CO₂/kWh)
  annualKwhProduction: integer("annual_kwh_production"), // Annual energy production in kWh
  co2SavedPerYear: varchar("co2_saved_per_year"), // kg CO₂ saved per year as string
  co2SavedLifetime: varchar("co2_saved_lifetime"), // kg CO₂ saved over 30 years as string
  emissionFactor: varchar("emission_factor").default("0.53"), // Italian factor: 0.53 kg CO₂/kWh
  
  // Certification Details
  estimatedCO2Reduction: varchar("estimated_co2_reduction"), // Tons of CO₂
  certificationStandard: varchar("certification_standard").default("EUFD2025-001"),
  isoStandards: text("iso_standards").array(), // ['ISO 14064-1', 'ISO 14064-2', 'ISO 14064-3']
  
  // Payment & KYC Integration
  paymentStatus: varchar("payment_status").notNull().default("pending"), // pending, received, verified
  paymentAmount: integer("payment_amount"), // Total amount in cents
  paymentReference: varchar("payment_reference"),
  requiresKyc: boolean("requires_kyc").notNull().default(true),
  kycRequiredFor: varchar("kyc_required_for").notNull().default("user"), // user, company, both
  
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
  
  // Certification and Blockchain Integration
  certificationStatus: varchar("certification_status", { length: 50 }).notNull().default("pending"), // pending, approved, certified, rejected
  certificateNumber: varchar("certificate_number", { length: 100 }),
  certificateIssueDate: timestamp("certificate_issue_date"),
  blockchainRecorded: boolean("blockchain_recorded").default(false),
  blockchainTxHash: varchar("blockchain_tx_hash", { length: 256 }),
  blockchainTimestamp: timestamp("blockchain_timestamp"),
  
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
