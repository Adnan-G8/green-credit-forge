import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";

export async function registerRoutes(app: Express): Promise<Server> {
  
  // User management routes
  app.post("/api/users", async (req, res) => {
    try {
      const user = await storage.createUser(req.body);
      res.json({ success: true, user });
    } catch (error) {
      console.error("Error creating user:", error);
      res.status(400).json({ 
        success: false, 
        message: "Failed to create user" 
      });
    }
  });

  app.get("/api/users/:fagriId", async (req, res) => {
    try {
      const user = await storage.getUserByFagriId(req.params.fagriId);
      if (!user) {
        return res.status(404).json({ 
          success: false, 
          message: "User not found" 
        });
      }
      res.json({ success: true, user });
    } catch (error) {
      console.error("Error fetching user:", error);
      res.status(500).json({ 
        success: false, 
        message: "Failed to fetch user" 
      });
    }
  });

  // Authorization management routes
  app.post("/api/authorizations/request", async (req, res) => {
    try {
      const authorization = await storage.requestAuthorization(req.body);
      res.json({ success: true, authorization });
    } catch (error) {
      console.error("Error requesting authorization:", error);
      res.status(400).json({ 
        success: false, 
        message: "Failed to request authorization" 
      });
    }
  });

  app.get("/api/authorizations/pending", async (req, res) => {
    try {
      const authorizations = await storage.getPendingAuthorizations();
      res.json({ success: true, authorizations });
    } catch (error) {
      console.error("Error fetching pending authorizations:", error);
      res.status(500).json({ 
        success: false, 
        message: "Failed to fetch authorizations" 
      });
    }
  });

  app.post("/api/authorizations/:authId/approve", async (req, res) => {
    try {
      const { reviewerId, reviewerName, notes } = req.body;
      const authorization = await storage.approveAuthorization(
        req.params.authId, 
        reviewerId, 
        reviewerName, 
        notes
      );
      res.json({ success: true, authorization });
    } catch (error) {
      console.error("Error approving authorization:", error);
      res.status(400).json({ 
        success: false, 
        message: "Failed to approve authorization" 
      });
    }
  });

  app.post("/api/authorizations/:authId/reject", async (req, res) => {
    try {
      const { reviewerId, reviewerName, notes } = req.body;
      const authorization = await storage.rejectAuthorization(
        req.params.authId, 
        reviewerId, 
        reviewerName, 
        notes
      );
      res.json({ success: true, authorization });
    } catch (error) {
      console.error("Error rejecting authorization:", error);
      res.status(400).json({ 
        success: false, 
        message: "Failed to reject authorization" 
      });
    }
  });

  // Client management routes
  app.post("/api/clients", async (req, res) => {
    try {
      const client = await storage.createClient(req.body);
      res.json({ success: true, client });
    } catch (error) {
      console.error("Error creating client:", error);
      res.status(400).json({ 
        success: false, 
        message: "Failed to create client" 
      });
    }
  });

  app.get("/api/clients/team-member/:teamMemberId", async (req, res) => {
    try {
      const clients = await storage.getClientsByTeamMember(req.params.teamMemberId);
      res.json({ success: true, clients });
    } catch (error) {
      console.error("Error fetching clients:", error);
      res.status(500).json({ 
        success: false, 
        message: "Failed to fetch clients" 
      });
    }
  });

  // Application management routes
  app.post("/api/applications", async (req, res) => {
    try {
      const application = await storage.createApplication(req.body);
      res.json({ success: true, application });
    } catch (error) {
      console.error("Error creating application:", error);
      res.status(400).json({ 
        success: false, 
        message: "Failed to create application" 
      });
    }
  });

  app.get("/api/applications/team-member/:teamMemberId", async (req, res) => {
    try {
      const applications = await storage.getApplicationsByTeamMember(req.params.teamMemberId);
      res.json({ success: true, applications });
    } catch (error) {
      console.error("Error fetching applications:", error);
      res.status(500).json({ 
        success: false, 
        message: "Failed to fetch applications" 
      });
    }
  });

  // Audit log routes
  app.get("/api/audit-logs/user/:userId", async (req, res) => {
    try {
      const logs = await storage.getAuditLogsByUser(req.params.userId);
      res.json({ success: true, logs });
    } catch (error) {
      console.error("Error fetching audit logs:", error);
      res.status(500).json({ 
        success: false, 
        message: "Failed to fetch audit logs" 
      });
    }
  });

  app.get("/api/audit-logs/entity/:entityType/:entityId", async (req, res) => {
    try {
      const logs = await storage.getAuditLogsByEntity(
        req.params.entityType, 
        req.params.entityId
      );
      res.json({ success: true, logs });
    } catch (error) {
      console.error("Error fetching audit logs:", error);
      res.status(500).json({ 
        success: false, 
        message: "Failed to fetch audit logs" 
      });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}