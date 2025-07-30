import { sql } from 'drizzle-orm';
import {
  index,
  jsonb,
  pgTable,
  timestamp,
  varchar,
  text,
  boolean,
  uuid,
  integer,
} from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";

// Session storage table (required for auth)
export const sessions = pgTable(
  "sessions",
  {
    sid: varchar("sid").primaryKey(),
    sess: jsonb("sess").notNull(),
    expire: timestamp("expire").notNull(),
  },
  (table) => [index("IDX_session_expire").on(table.expire)],
);

// Core Users table with ALPHAG8 ID KEY
export const users = pgTable("users", {
  id: uuid("id").primaryKey().default(sql`gen_random_uuid()`),
  fagriIdKey: varchar("fagri_id_key").unique().notNull(), // FAGRI-XXXXXXXX-XXXXXXXX-XX
  firstName: varchar("first_name").notNull(),
  lastName: varchar("last_name").notNull(),
  email: varchar("email").unique().notNull(),
  phone: varchar("phone").notNull(),
  socialSecurityNumber: varchar("social_security_number").notNull(),
  profileImageUrl: varchar("profile_image_url"),
  bankingInfo: jsonb("banking_info"), // Banking details for team members
  isActive: boolean("is_active").default(true),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// Account Types and Authorization Requests
export const accountTypes = pgTable("account_types", {
  id: uuid("id").primaryKey().default(sql`gen_random_uuid()`),
  name: varchar("name").notNull(), // 'fagri-member', 'fagri-team', 'audit-certification', 'administration'
  displayName: varchar("display_name").notNull(),
  description: text("description"),
  permissions: jsonb("permissions").notNull(), // JSON array of permissions
  createdAt: timestamp("created_at").defaultNow(),
});

// User Account Type Authorizations
export const userAuthorizations = pgTable("user_authorizations", {
  id: uuid("id").primaryKey().default(sql`gen_random_uuid()`),
  userId: uuid("user_id").references(() => users.id).notNull(),
  accountTypeId: uuid("account_type_id").references(() => accountTypes.id).notNull(),
  status: varchar("status").notNull(), // 'pending', 'approved', 'rejected'
  requestedAt: timestamp("requested_at").defaultNow(),
  reviewedAt: timestamp("reviewed_at"),
  reviewedBy: uuid("reviewed_by").references(() => users.id),
  reviewerName: varchar("reviewer_name"), // Store reviewer name for audit
  reviewNotes: text("review_notes"),
  isActive: boolean("is_active").default(true),
});

// Client Companies/Institutions managed by Team Members
export const clients = pgTable("clients", {
  id: uuid("id").primaryKey().default(sql`gen_random_uuid()`),
  name: varchar("name").notNull(),
  pecEmail: varchar("pec_email").notNull(), // PEC email for official communication
  teamMemberId: uuid("team_member_id").references(() => users.id).notNull(),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// Applications created by Team Members for Clients
export const applications = pgTable("applications", {
  id: uuid("id").primaryKey().default(sql`gen_random_uuid()`),
  applicationNumber: varchar("application_number").unique().notNull(),
  clientId: uuid("client_id").references(() => clients.id).notNull(),
  teamMemberId: uuid("team_member_id").references(() => users.id).notNull(),
  projectType: varchar("project_type").notNull(), // 'farming', 'forest', 'renewable-energy'
  projectData: jsonb("project_data").notNull(), // All project specific data
  status: varchar("status").notNull(), // 'draft', 'submitted', 'under-review', 'kyc-pending', 'approved', 'certified', 'rejected'
  submittedAt: timestamp("submitted_at"),
  reviewedAt: timestamp("reviewed_at"),
  reviewedBy: uuid("reviewed_by").references(() => users.id),
  certifiedAt: timestamp("certified_at"),
  certifiedBy: uuid("certified_by").references(() => users.id),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// Comprehensive Audit Log for every action
export const auditLogs = pgTable("audit_logs", {
  id: uuid("id").primaryKey().default(sql`gen_random_uuid()`),
  userId: uuid("user_id").references(() => users.id).notNull(),
  userName: varchar("user_name").notNull(), // Store name for audit
  userRole: varchar("user_role").notNull(), // Current role at time of action
  action: varchar("action").notNull(), // 'create', 'update', 'approve', 'reject', 'certify', etc.
  entityType: varchar("entity_type").notNull(), // 'application', 'client', 'authorization', etc.
  entityId: uuid("entity_id").notNull(), // ID of the entity being acted upon
  oldValues: jsonb("old_values"), // Previous state for updates
  newValues: jsonb("new_values"), // New state after action
  description: text("description").notNull(), // Human readable description
  ipAddress: varchar("ip_address"),
  userAgent: text("user_agent"),
  createdAt: timestamp("created_at").defaultNow(),
});

// Relations
export const usersRelations = relations(users, ({ many }) => ({
  authorizations: many(userAuthorizations),
  clients: many(clients),
  applications: many(applications),
  auditLogs: many(auditLogs),
  reviewedAuthorizations: many(userAuthorizations, { relationName: "reviewer" }),
}));

export const accountTypesRelations = relations(accountTypes, ({ many }) => ({
  authorizations: many(userAuthorizations),
}));

export const userAuthorizationsRelations = relations(userAuthorizations, ({ one }) => ({
  user: one(users, {
    fields: [userAuthorizations.userId],
    references: [users.id],
  }),
  accountType: one(accountTypes, {
    fields: [userAuthorizations.accountTypeId],
    references: [accountTypes.id],
  }),
  reviewer: one(users, {
    fields: [userAuthorizations.reviewedBy],
    references: [users.id],
    relationName: "reviewer",
  }),
}));

export const clientsRelations = relations(clients, ({ one, many }) => ({
  teamMember: one(users, {
    fields: [clients.teamMemberId],
    references: [users.id],
  }),
  applications: many(applications),
}));

export const applicationsRelations = relations(applications, ({ one }) => ({
  client: one(clients, {
    fields: [applications.clientId],
    references: [clients.id],
  }),
  teamMember: one(users, {
    fields: [applications.teamMemberId],
    references: [users.id],
  }),
  reviewer: one(users, {
    fields: [applications.reviewedBy],
    references: [users.id],
    relationName: "applicationReviewer",
  }),
  certifier: one(users, {
    fields: [applications.certifiedBy],
    references: [users.id],
    relationName: "applicationCertifier",
  }),
}));

export const auditLogsRelations = relations(auditLogs, ({ one }) => ({
  user: one(users, {
    fields: [auditLogs.userId],
    references: [users.id],
  }),
}));

// Type exports
export type User = typeof users.$inferSelect;
export type InsertUser = typeof users.$inferInsert;

export type AccountType = typeof accountTypes.$inferSelect;
export type InsertAccountType = typeof accountTypes.$inferInsert;

export type UserAuthorization = typeof userAuthorizations.$inferSelect;
export type InsertUserAuthorization = typeof userAuthorizations.$inferInsert;

export type Client = typeof clients.$inferSelect;
export type InsertClient = typeof clients.$inferInsert;

export type Application = typeof applications.$inferSelect;
export type InsertApplication = typeof applications.$inferInsert;

export type AuditLog = typeof auditLogs.$inferSelect;
export type InsertAuditLog = typeof auditLogs.$inferInsert;