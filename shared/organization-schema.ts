import { pgTable, varchar, text, timestamp, numeric } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// Organization Information table based on UNI/PdR guidelines
export const organizationInformation = pgTable("organization_information", {
  id: varchar("id").primaryKey(),
  alphaG8Id: varchar("alpha_g8_id").notNull(),
  
  // Legal Entity Information
  legalForm: varchar("legal_form").notNull(),
  companyName: varchar("company_name").notNull(),
  vatNumber: varchar("vat_number").notNull(),
  fiscalCode: varchar("fiscal_code").notNull(),
  registrationNumber: varchar("registration_number").notNull(),
  legalAddress: text("legal_address").notNull(),
  operationalAddress: text("operational_address"),
  phoneNumber: varchar("phone_number").notNull(),
  emailAddress: varchar("email_address").notNull(),
  pecAddress: varchar("pec_address").notNull(),
  legalRepresentative: varchar("legal_representative").notNull(),
  technicalManager: varchar("technical_manager").notNull(),
  
  // Agricultural Assets Information
  totalLandArea: numeric("total_land_area", { precision: 10, scale: 2 }),
  agriculturalLandArea: numeric("agricultural_land_area", { precision: 10, scale: 2 }),
  forestLandArea: numeric("forest_land_area", { precision: 10, scale: 2 }),
  irrigatedArea: numeric("irrigated_area", { precision: 10, scale: 2 }),
  machineryDescription: text("machinery_description").notNull(),
  buildingsDescription: text("buildings_description").notNull(),
  renewableEnergyInstallations: text("renewable_energy_installations"),
  
  // Certification and Compliance
  isoCertifications: text("iso_certifications"),
  organicCertification: text("organic_certification"),
  environmentalCertifications: text("environmental_certifications"),
  complianceDocuments: text("compliance_documents"),
  
  // Project Capacity Information
  plannedCo2Projects: varchar("planned_co2_projects"),
  expectedAnnualCapture: numeric("expected_annual_capture", { precision: 10, scale: 1 }),
  projectDuration: varchar("project_duration"),
  investmentCapacity: numeric("investment_capacity", { precision: 15, scale: 2 }),
  
  // Metadata
  submittedAt: timestamp("submitted_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// Insert schema for validation
export const insertOrganizationInformationSchema = createInsertSchema(organizationInformation, {
  alphaG8Id: z.string().min(1, "ALPHAG8 ID is required"),
  legalForm: z.string().min(1, "Legal form is required"),
  companyName: z.string().min(1, "Company name is required"),
  vatNumber: z.string().min(1, "VAT number is required"),
  fiscalCode: z.string().min(1, "Fiscal code is required"),
  registrationNumber: z.string().min(1, "Registration number is required"),
  legalAddress: z.string().min(1, "Legal address is required"),
  phoneNumber: z.string().min(1, "Phone number is required"),
  emailAddress: z.string().email("Valid email address is required"),
  pecAddress: z.string().email("Valid PEC address is required"),
  legalRepresentative: z.string().min(1, "Legal representative is required"),
  technicalManager: z.string().min(1, "Technical manager is required"),
  machineryDescription: z.string().min(1, "Machinery description is required"),
  buildingsDescription: z.string().min(1, "Buildings description is required"),
}).omit({
  id: true,
  submittedAt: true,
  updatedAt: true,
});

export type InsertOrganizationInformation = z.infer<typeof insertOrganizationInformationSchema>;
export type OrganizationInformation = typeof organizationInformation.$inferSelect;