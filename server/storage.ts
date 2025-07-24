import { 
  users, 
  contactRequests, 
  membershipApplications,
  documents,
  documentShares,
  documentVersions,
  type User, 
  type InsertUser,
  type ContactRequest,
  type InsertContactRequest,
  type MembershipApplication,
  type InsertMembershipApplication,
  type Document,
  type InsertDocument,
  type DocumentShare,
  type InsertDocumentShare,
  type DocumentVersion,
  type InsertDocumentVersion
} from "@shared/schema";

export interface IStorage {
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  createContactRequest(request: InsertContactRequest): Promise<ContactRequest>;
  createMembershipApplication(application: InsertMembershipApplication): Promise<MembershipApplication>;
  getContactRequests(): Promise<ContactRequest[]>;
  getMembershipApplications(): Promise<MembershipApplication[]>;
  
  // Document Management
  createDocument(document: InsertDocument): Promise<Document>;
  getDocuments(userId: string): Promise<Document[]>;
  getDocument(id: string): Promise<Document | undefined>;
  updateDocument(id: string, updates: Partial<InsertDocument>): Promise<Document | undefined>;
  deleteDocument(id: string): Promise<boolean>;
  shareDocument(share: InsertDocumentShare): Promise<DocumentShare>;
  getSharedDocuments(userId: string): Promise<Document[]>;
  createDocumentVersion(version: InsertDocumentVersion): Promise<DocumentVersion>;
  getDocumentVersions(documentId: string): Promise<DocumentVersion[]>;
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private contactRequests: Map<number, ContactRequest>;
  private membershipApplications: Map<number, MembershipApplication>;
  private documents: Map<string, Document>;
  private documentShares: Map<string, DocumentShare>;
  private documentVersions: Map<string, DocumentVersion>;
  private currentUserId: number;
  private currentContactId: number;
  private currentMembershipId: number;

  constructor() {
    this.users = new Map();
    this.contactRequests = new Map();
    this.membershipApplications = new Map();
    this.documents = new Map();
    this.documentShares = new Map();
    this.documentVersions = new Map();
    this.currentUserId = 1;
    this.currentContactId = 1;
    this.currentMembershipId = 1;
  }

  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.currentUserId++;
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }

  async createContactRequest(insertRequest: InsertContactRequest): Promise<ContactRequest> {
    const id = this.currentContactId++;
    const request: ContactRequest = { 
      ...insertRequest,
      company: insertRequest.company || null,
      language: insertRequest.language || 'it',
      id, 
      createdAt: new Date() 
    };
    this.contactRequests.set(id, request);
    return request;
  }

  async createMembershipApplication(insertApplication: InsertMembershipApplication): Promise<MembershipApplication> {
    const id = this.currentMembershipId++;
    const application: MembershipApplication = { 
      ...insertApplication,
      language: insertApplication.language || 'it',
      hectares: insertApplication.hectares || null,
      interests: insertApplication.interests || null,
      notes: insertApplication.notes || null,
      newsletter: insertApplication.newsletter || false,
      id, 
      createdAt: new Date() 
    };
    this.membershipApplications.set(id, application);
    return application;
  }

  async getContactRequests(): Promise<ContactRequest[]> {
    return Array.from(this.contactRequests.values()).sort(
      (a, b) => b.createdAt.getTime() - a.createdAt.getTime()
    );
  }

  async getMembershipApplications(): Promise<MembershipApplication[]> {
    return Array.from(this.membershipApplications.values()).sort(
      (a, b) => b.createdAt.getTime() - a.createdAt.getTime()
    );
  }

  // Document Management Methods
  async createDocument(insertDocument: InsertDocument): Promise<Document> {
    const id = `doc_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;
    const document: Document = {
      ...insertDocument,
      id,
      uploadDate: new Date(),
      lastModified: new Date(),
      status: insertDocument.status || 'active',
      isPublic: insertDocument.isPublic || 'false',
      tags: insertDocument.tags || [],
      metadata: insertDocument.metadata || null,
    };
    this.documents.set(id, document);
    return document;
  }

  async getDocuments(userId: string): Promise<Document[]> {
    return Array.from(this.documents.values()).filter(doc => doc.userId === userId);
  }

  async getDocument(id: string): Promise<Document | undefined> {
    return this.documents.get(id);
  }

  async updateDocument(id: string, updates: Partial<InsertDocument>): Promise<Document | undefined> {
    const document = this.documents.get(id);
    if (!document) return undefined;

    const updatedDocument: Document = {
      ...document,
      ...updates,
      lastModified: new Date(),
    };
    this.documents.set(id, updatedDocument);
    return updatedDocument;
  }

  async deleteDocument(id: string): Promise<boolean> {
    return this.documents.delete(id);
  }

  async shareDocument(insertShare: InsertDocumentShare): Promise<DocumentShare> {
    const id = `share_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;
    const share: DocumentShare = {
      ...insertShare,
      id,
      shareDate: new Date(),
      expiryDate: insertShare.expiryDate || null,
      status: insertShare.status || 'active',
    };
    this.documentShares.set(id, share);
    return share;
  }

  async getSharedDocuments(userId: string): Promise<Document[]> {
    const userShares = Array.from(this.documentShares.values()).filter(
      share => share.sharedWith === userId && share.status === 'active'
    );
    const sharedDocuments: Document[] = [];
    
    for (const share of userShares) {
      const document = this.documents.get(share.documentId);
      if (document) {
        sharedDocuments.push(document);
      }
    }
    
    return sharedDocuments;
  }

  async createDocumentVersion(insertVersion: InsertDocumentVersion): Promise<DocumentVersion> {
    const id = `ver_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;
    const version: DocumentVersion = {
      ...insertVersion,
      id,
      uploadDate: new Date(),
      isActive: insertVersion.isActive || 'false',
    };
    this.documentVersions.set(id, version);
    return version;
  }

  async getDocumentVersions(documentId: string): Promise<DocumentVersion[]> {
    return Array.from(this.documentVersions.values()).filter(
      version => version.documentId === documentId
    );
  }
}

export const storage = new MemStorage();
