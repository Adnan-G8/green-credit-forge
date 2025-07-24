import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { 
  insertContactRequestSchema, 
  insertMembershipApplicationSchema, 
  insertDocumentSchema,
  insertDocumentShareSchema,
  insertDocumentVersionSchema 
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
