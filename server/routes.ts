import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertContactRequestSchema, insertMembershipApplicationSchema } from "@shared/schema";

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

  const httpServer = createServer(app);
  return httpServer;
}
