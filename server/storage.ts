import { 
  users, 
  contactRequests, 
  membershipApplications,
  type User, 
  type InsertUser,
  type ContactRequest,
  type InsertContactRequest,
  type MembershipApplication,
  type InsertMembershipApplication
} from "@shared/schema";

export interface IStorage {
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  createContactRequest(request: InsertContactRequest): Promise<ContactRequest>;
  createMembershipApplication(application: InsertMembershipApplication): Promise<MembershipApplication>;
  getContactRequests(): Promise<ContactRequest[]>;
  getMembershipApplications(): Promise<MembershipApplication[]>;
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private contactRequests: Map<number, ContactRequest>;
  private membershipApplications: Map<number, MembershipApplication>;
  private currentUserId: number;
  private currentContactId: number;
  private currentMembershipId: number;

  constructor() {
    this.users = new Map();
    this.contactRequests = new Map();
    this.membershipApplications = new Map();
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
}

export const storage = new MemStorage();
