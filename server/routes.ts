import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage-updated";
import { 
  insertContactRequestSchema, 
  insertMembershipApplicationSchema, 
  insertDocumentSchema,
  insertDocumentShareSchema,
  insertDocumentVersionSchema,
  insertCO2ProjectSchema,
  insertProjectMilestoneSchema,
  insertProjectActivitySchema
} from "@shared/schema";

export async function registerRoutes(app: Express): Promise<Server> {
  // Contact form submission
  app.post("/api/contact", async (req, res) => {
    try {
      const validatedData = insertContactRequestSchema.parse(req.body);
      const contactRequest = await storage.createContactRequest(validatedData);
      
      // In a real application, you would send an email here
      console.log("New contact request:", contactRequest);
      
      res.json({ 
        success: true, 
        message: "Contact request submitted successfully",
        id: contactRequest.id 
      });
    } catch (error) {
      console.error("Error creating contact request:", error);
      res.status(400).json({ 
        success: false, 
        message: "Invalid contact request data" 
      });
    }
  });

  // Membership application submission
  app.post("/api/membership", async (req, res) => {
    try {
      const validatedData = insertMembershipApplicationSchema.parse(req.body);
      const application = await storage.createMembershipApplication(validatedData);
      
      // In a real application, you would send an email here
      console.log("New membership application:", application);
      
      res.json({ 
        success: true, 
        message: "Membership application submitted successfully",
        id: application.id 
      });
    } catch (error) {
      console.error("Error creating membership application:", error);
      res.status(400).json({ 
        success: false, 
        message: "Invalid membership application data" 
      });
    }
  });

  // Get contact requests (for admin purposes)
  app.get("/api/contact", async (req, res) => {
    try {
      const requests = await storage.getContactRequests();
      res.json(requests);
    } catch (error) {
      console.error("Error fetching contact requests:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  });

  // Get membership applications (for admin purposes)
  app.get("/api/membership", async (req, res) => {
    try {
      const applications = await storage.getMembershipApplications();
      res.json(applications);
    } catch (error) {
      console.error("Error fetching membership applications:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  });

  // CO2 Project Tracking API Routes
  
  // Get all projects for dashboard
  app.get("/api/projects", async (req, res) => {
    try {
      const userId = req.query.userId as string;
      const projects = await storage.getAllCO2Projects(userId);
      
      // Transform data for dashboard display
      const dashboardProjects = projects.map(project => ({
        id: project.id,
        projectName: project.projectName,
        projectType: project.projectType,
        status: project.status,
        progressPercentage: project.progressPercentage,
        currentPhase: project.currentPhase,
        estimatedCO2Reduction: project.estimatedCO2Reduction,
        projectValue: project.projectValue,
        nextMilestone: project.nextMilestone,
        milestoneDate: project.milestoneDate?.toISOString().split('T')[0],
        lastUpdated: project.lastUpdated?.toISOString().split('T')[0],
        priority: project.priority,
        complianceScore: project.complianceScore,
        documentsSubmitted: project.documentsSubmitted,
        documentsRequired: project.documentsRequired,
        country: project.country,
        city: project.city
      }));
      
      res.json(dashboardProjects);
    } catch (error) {
      console.error("Error fetching projects:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  });

  // Get project details
  app.get("/api/projects/:id", async (req, res) => {
    try {
      const project = await storage.getCO2Project(req.params.id);
      if (!project) {
        return res.status(404).json({ message: "Project not found" });
      }
      res.json(project);
    } catch (error) {
      console.error("Error fetching project:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  });

  // Create new project
  app.post("/api/projects", async (req, res) => {
    try {
      const validatedData = insertCO2ProjectSchema.parse(req.body);
      const project = await storage.createCO2Project(validatedData);
      res.json(project);
    } catch (error) {
      console.error("Error creating project:", error);
      res.status(400).json({ message: "Invalid project data" });
    }
  });

  // Update project
  app.patch("/api/projects/:id", async (req, res) => {
    try {
      const updates = req.body;
      const project = await storage.updateCO2Project(req.params.id, updates);
      if (!project) {
        return res.status(404).json({ message: "Project not found" });
      }
      res.json(project);
    } catch (error) {
      console.error("Error updating project:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  });

  // Get project milestones
  app.get("/api/projects/milestones/:projectId", async (req, res) => {
    try {
      const milestones = await storage.getProjectMilestones(req.params.projectId);
      
      // Transform data for dashboard display
      const dashboardMilestones = milestones.map(milestone => ({
        id: milestone.id,
        title: milestone.title,
        status: milestone.status,
        dueDate: milestone.dueDate?.toISOString().split('T')[0],
        milestoneType: milestone.milestoneType,
        priority: milestone.priority
      }));
      
      res.json(dashboardMilestones);
    } catch (error) {
      console.error("Error fetching milestones:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  });

  // Create project milestone
  app.post("/api/projects/milestones", async (req, res) => {
    try {
      const validatedData = insertProjectMilestoneSchema.parse(req.body);
      const milestone = await storage.createProjectMilestone(validatedData);
      res.json(milestone);
    } catch (error) {
      console.error("Error creating milestone:", error);
      res.status(400).json({ message: "Invalid milestone data" });
    }
  });

  // Get project activities
  app.get("/api/projects/activities/:projectId", async (req, res) => {
    try {
      const activities = await storage.getProjectActivities(req.params.projectId);
      
      // Transform data for dashboard display
      const dashboardActivities = activities.map(activity => ({
        id: activity.id,
        title: activity.title,
        description: activity.description,
        activityType: activity.activityType,
        timestamp: activity.timestamp?.toISOString().split('T')[0],
        performedByName: activity.performedByName
      }));
      
      res.json(dashboardActivities);
    } catch (error) {
      console.error("Error fetching activities:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  });

  // Create project activity
  app.post("/api/projects/activities", async (req, res) => {
    try {
      const validatedData = insertProjectActivitySchema.parse(req.body);
      const activity = await storage.createProjectActivity(validatedData);
      res.json(activity);
    } catch (error) {
      console.error("Error creating activity:", error);
      res.status(400).json({ message: "Invalid activity data" });
    }
  });

  // Document Management Routes
  
  // Upload/Create a new document
  app.post("/api/documents", async (req, res) => {
    try {
      const validatedData = insertDocumentSchema.parse(req.body);
      const document = await storage.createDocument(validatedData);
      
      console.log("New document uploaded:", document.title);
      
      res.json({ 
        success: true, 
        message: "Document uploaded successfully",
        document 
      });
    } catch (error) {
      console.error("Error uploading document:", error);
      res.status(400).json({ 
        success: false, 
        message: "Invalid document data" 
      });
    }
  });

  // Get user's documents
  app.get("/api/documents/:userId", async (req, res) => {
    try {
      const { userId } = req.params;
      const documents = await storage.getDocuments(userId);
      res.json(documents);
    } catch (error) {
      console.error("Error fetching documents:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  });

  // Get shared documents for a user
  app.get("/api/documents/:userId/shared", async (req, res) => {
    try {
      const { userId } = req.params;
      const sharedDocuments = await storage.getSharedDocuments(userId);
      res.json(sharedDocuments);
    } catch (error) {
      console.error("Error fetching shared documents:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  });

  // Get specific document
  app.get("/api/document/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const document = await storage.getDocument(id);
      
      if (!document) {
        return res.status(404).json({ message: "Document not found" });
      }
      
      res.json(document);
    } catch (error) {
      console.error("Error fetching document:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  });

  // Update document
  app.put("/api/document/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const updates = req.body;
      
      const updatedDocument = await storage.updateDocument(id, updates);
      
      if (!updatedDocument) {
        return res.status(404).json({ message: "Document not found" });
      }
      
      res.json({ 
        success: true, 
        message: "Document updated successfully",
        document: updatedDocument 
      });
    } catch (error) {
      console.error("Error updating document:", error);
      res.status(400).json({ 
        success: false, 
        message: "Invalid document update data" 
      });
    }
  });

  // Delete document
  app.delete("/api/document/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const success = await storage.deleteDocument(id);
      
      if (!success) {
        return res.status(404).json({ message: "Document not found" });
      }
      
      res.json({ 
        success: true, 
        message: "Document deleted successfully" 
      });
    } catch (error) {
      console.error("Error deleting document:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  });

  // Share document
  app.post("/api/document/:id/share", async (req, res) => {
    try {
      const { id } = req.params;
      const shareData = {
        ...req.body,
        documentId: id
      };
      
      const validatedShareData = insertDocumentShareSchema.parse(shareData);
      const share = await storage.shareDocument(validatedShareData);
      
      res.json({ 
        success: true, 
        message: "Document shared successfully",
        share 
      });
    } catch (error) {
      console.error("Error sharing document:", error);
      res.status(400).json({ 
        success: false, 
        message: "Invalid share data" 
      });
    }
  });

  // Create document version
  app.post("/api/document/:id/version", async (req, res) => {
    try {
      const { id } = req.params;
      const versionData = {
        ...req.body,
        documentId: id
      };
      
      const validatedVersionData = insertDocumentVersionSchema.parse(versionData);
      const version = await storage.createDocumentVersion(validatedVersionData);
      
      res.json({ 
        success: true, 
        message: "Document version created successfully",
        version 
      });
    } catch (error) {
      console.error("Error creating document version:", error);
      res.status(400).json({ 
        success: false, 
        message: "Invalid version data" 
      });
    }
  });

  // Get document versions
  app.get("/api/document/:id/versions", async (req, res) => {
    try {
      const { id } = req.params;
      const versions = await storage.getDocumentVersions(id);
      res.json(versions);
    } catch (error) {
      console.error("Error fetching document versions:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
