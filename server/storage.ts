import { 
  users, 
  accountTypes, 
  userAuthorizations, 
  clients, 
  applications, 
  auditLogs,
  type User,
  type InsertUser,
  type AccountType,
  type InsertAccountType,
  type UserAuthorization,
  type InsertUserAuthorization,
  type Client,
  type InsertClient,
  type Application,
  type InsertApplication,
  type AuditLog,
  type InsertAuditLog
} from "../shared/schema";
import { db } from "./db";
import { eq, and, desc } from "drizzle-orm";

// Storage interface for the comprehensive audit-ready system
export interface IStorage {
  // User management
  createUser(user: InsertUser): Promise<User>;
  getUserByFagriId(fagriIdKey: string): Promise<User | undefined>;
  updateUser(fagriIdKey: string, updates: Partial<User>): Promise<User>;
  
  // Account types management
  getAccountTypes(): Promise<AccountType[]>;
  createAccountType(accountType: InsertAccountType): Promise<AccountType>;
  
  // Authorization management
  requestAuthorization(authorization: InsertUserAuthorization): Promise<UserAuthorization>;
  getPendingAuthorizations(): Promise<UserAuthorization[]>;
  getUserAuthorizations(userId: string): Promise<UserAuthorization[]>;
  approveAuthorization(authId: string, reviewerId: string, reviewerName: string, notes?: string): Promise<UserAuthorization>;
  rejectAuthorization(authId: string, reviewerId: string, reviewerName: string, notes?: string): Promise<UserAuthorization>;
  
  // Client management
  createClient(client: InsertClient): Promise<Client>;
  getClientsByTeamMember(teamMemberId: string): Promise<Client[]>;
  updateClient(clientId: string, updates: Partial<Client>): Promise<Client>;
  
  // Application management
  createApplication(application: InsertApplication): Promise<Application>;
  getApplicationsByTeamMember(teamMemberId: string): Promise<Application[]>;
  getApplicationsByClient(clientId: string): Promise<Application[]>;
  updateApplicationStatus(appId: string, status: string, reviewerId?: string): Promise<Application>;
  
  // Audit logging
  createAuditLog(auditLog: InsertAuditLog): Promise<AuditLog>;
  getAuditLogsByUser(userId: string): Promise<AuditLog[]>;
  getAuditLogsByEntity(entityType: string, entityId: string): Promise<AuditLog[]>;
}

export class DatabaseStorage implements IStorage {
  
  // User management
  async createUser(user: InsertUser): Promise<User> {
    const [newUser] = await db.insert(users).values(user).returning();
    
    // Create audit log
    await this.createAuditLog({
      userId: newUser.id,
      userName: `${newUser.firstName} ${newUser.lastName}`,
      userRole: 'new-user',
      action: 'create',
      entityType: 'user',
      entityId: newUser.id,
      newValues: newUser,
      description: `New user account created with FAGRI ID: ${newUser.fagriIdKey}`,
    });
    
    return newUser;
  }
  
  async getUserByFagriId(fagriIdKey: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.fagriIdKey, fagriIdKey));
    return user;
  }
  
  async updateUser(fagriIdKey: string, updates: Partial<User>): Promise<User> {
    const oldUser = await this.getUserByFagriId(fagriIdKey);
    const [updatedUser] = await db
      .update(users)
      .set({ ...updates, updatedAt: new Date() })
      .where(eq(users.fagriIdKey, fagriIdKey))
      .returning();
    
    // Create audit log
    if (oldUser) {
      await this.createAuditLog({
        userId: updatedUser.id,
        userName: `${updatedUser.firstName} ${updatedUser.lastName}`,
        userRole: 'user',
        action: 'update',
        entityType: 'user',
        entityId: updatedUser.id,
        oldValues: oldUser,
        newValues: updatedUser,
        description: `User profile updated for FAGRI ID: ${updatedUser.fagriIdKey}`,
      });
    }
    
    return updatedUser;
  }
  
  // Account types management
  async getAccountTypes(): Promise<AccountType[]> {
    return await db.select().from(accountTypes);
  }
  
  async createAccountType(accountType: InsertAccountType): Promise<AccountType> {
    const [newAccountType] = await db.insert(accountTypes).values(accountType).returning();
    return newAccountType;
  }
  
  // Authorization management
  async requestAuthorization(authorization: InsertUserAuthorization): Promise<UserAuthorization> {
    const [newAuth] = await db.insert(userAuthorizations).values(authorization).returning();
    
    // Create audit log
    const user = await db.select().from(users).where(eq(users.id, authorization.userId));
    if (user[0]) {
      await this.createAuditLog({
        userId: authorization.userId,
        userName: `${user[0].firstName} ${user[0].lastName}`,
        userRole: 'user',
        action: 'request',
        entityType: 'authorization',
        entityId: newAuth.id,
        newValues: newAuth,
        description: `Authorization requested for account type`,
      });
    }
    
    return newAuth;
  }
  
  async getPendingAuthorizations(): Promise<UserAuthorization[]> {
    return await db
      .select()
      .from(userAuthorizations)
      .where(eq(userAuthorizations.status, 'pending'))
      .orderBy(desc(userAuthorizations.requestedAt));
  }
  
  async getUserAuthorizations(userId: string): Promise<UserAuthorization[]> {
    return await db
      .select()
      .from(userAuthorizations)
      .where(eq(userAuthorizations.userId, userId))
      .orderBy(desc(userAuthorizations.requestedAt));
  }
  
  async approveAuthorization(authId: string, reviewerId: string, reviewerName: string, notes?: string): Promise<UserAuthorization> {
    const [updatedAuth] = await db
      .update(userAuthorizations)
      .set({
        status: 'approved',
        reviewedAt: new Date(),
        reviewedBy: reviewerId,
        reviewerName,
        reviewNotes: notes,
      })
      .where(eq(userAuthorizations.id, authId))
      .returning();
    
    // Create audit log
    const user = await db.select().from(users).where(eq(users.id, updatedAuth.userId));
    if (user[0]) {
      await this.createAuditLog({
        userId: reviewerId,
        userName: reviewerName,
        userRole: 'admin',
        action: 'approve',
        entityType: 'authorization',
        entityId: authId,
        newValues: updatedAuth,
        description: `Authorization approved by ${reviewerName} for user ${user[0].firstName} ${user[0].lastName}`,
      });
    }
    
    return updatedAuth;
  }
  
  async rejectAuthorization(authId: string, reviewerId: string, reviewerName: string, notes?: string): Promise<UserAuthorization> {
    const [updatedAuth] = await db
      .update(userAuthorizations)
      .set({
        status: 'rejected',
        reviewedAt: new Date(),
        reviewedBy: reviewerId,
        reviewerName,
        reviewNotes: notes,
      })
      .where(eq(userAuthorizations.id, authId))
      .returning();
    
    // Create audit log
    const user = await db.select().from(users).where(eq(users.id, updatedAuth.userId));
    if (user[0]) {
      await this.createAuditLog({
        userId: reviewerId,
        userName: reviewerName,
        userRole: 'admin',
        action: 'reject',
        entityType: 'authorization',
        entityId: authId,
        newValues: updatedAuth,
        description: `Authorization rejected by ${reviewerName} for user ${user[0].firstName} ${user[0].lastName}. Reason: ${notes || 'No reason provided'}`,
      });
    }
    
    return updatedAuth;
  }
  
  // Client management
  async createClient(client: InsertClient): Promise<Client> {
    const [newClient] = await db.insert(clients).values(client).returning();
    
    // Create audit log
    const teamMember = await db.select().from(users).where(eq(users.id, client.teamMemberId));
    if (teamMember[0]) {
      await this.createAuditLog({
        userId: client.teamMemberId,
        userName: `${teamMember[0].firstName} ${teamMember[0].lastName}`,
        userRole: 'team-member',
        action: 'create',
        entityType: 'client',
        entityId: newClient.id,
        newValues: newClient,
        description: `New client created: ${newClient.name} (${newClient.pecEmail})`,
      });
    }
    
    return newClient;
  }
  
  async getClientsByTeamMember(teamMemberId: string): Promise<Client[]> {
    return await db
      .select()
      .from(clients)
      .where(eq(clients.teamMemberId, teamMemberId))
      .orderBy(desc(clients.createdAt));
  }
  
  async updateClient(clientId: string, updates: Partial<Client>): Promise<Client> {
    const [updatedClient] = await db
      .update(clients)
      .set({ ...updates, updatedAt: new Date() })
      .where(eq(clients.id, clientId))
      .returning();
    
    return updatedClient;
  }
  
  // Application management
  async createApplication(application: InsertApplication): Promise<Application> {
    const [newApp] = await db.insert(applications).values(application).returning();
    
    // Create audit log
    const teamMember = await db.select().from(users).where(eq(users.id, application.teamMemberId));
    if (teamMember[0]) {
      await this.createAuditLog({
        userId: application.teamMemberId,
        userName: `${teamMember[0].firstName} ${teamMember[0].lastName}`,
        userRole: 'team-member',
        action: 'create',
        entityType: 'application',
        entityId: newApp.id,
        newValues: newApp,
        description: `New application created: ${newApp.applicationNumber}`,
      });
    }
    
    return newApp;
  }
  
  async getApplicationsByTeamMember(teamMemberId: string): Promise<Application[]> {
    return await db
      .select()
      .from(applications)
      .where(eq(applications.teamMemberId, teamMemberId))
      .orderBy(desc(applications.createdAt));
  }
  
  async getApplicationsByClient(clientId: string): Promise<Application[]> {
    return await db
      .select()
      .from(applications)
      .where(eq(applications.clientId, clientId))
      .orderBy(desc(applications.createdAt));
  }
  
  async updateApplicationStatus(appId: string, status: string, reviewerId?: string): Promise<Application> {
    const updateData: any = { status, updatedAt: new Date() };
    
    if (status === 'under-review' && reviewerId) {
      updateData.reviewedAt = new Date();
      updateData.reviewedBy = reviewerId;
    } else if (status === 'certified' && reviewerId) {
      updateData.certifiedAt = new Date();
      updateData.certifiedBy = reviewerId;
    }
    
    const [updatedApp] = await db
      .update(applications)
      .set(updateData)
      .where(eq(applications.id, appId))
      .returning();
    
    // Create audit log
    if (reviewerId) {
      const reviewer = await db.select().from(users).where(eq(users.id, reviewerId));
      if (reviewer[0]) {
        await this.createAuditLog({
          userId: reviewerId,
          userName: `${reviewer[0].firstName} ${reviewer[0].lastName}`,
          userRole: 'reviewer',
          action: 'update_status',
          entityType: 'application',
          entityId: appId,
          newValues: { status },
          description: `Application ${updatedApp.applicationNumber} status changed to: ${status}`,
        });
      }
    }
    
    return updatedApp;
  }
  
  // Audit logging
  async createAuditLog(auditLog: InsertAuditLog): Promise<AuditLog> {
    const [newLog] = await db.insert(auditLogs).values(auditLog).returning();
    return newLog;
  }
  
  async getAuditLogsByUser(userId: string): Promise<AuditLog[]> {
    return await db
      .select()
      .from(auditLogs)
      .where(eq(auditLogs.userId, userId))
      .orderBy(desc(auditLogs.createdAt));
  }
  
  async getAuditLogsByEntity(entityType: string, entityId: string): Promise<AuditLog[]> {
    return await db
      .select()
      .from(auditLogs)
      .where(and(eq(auditLogs.entityType, entityType), eq(auditLogs.entityId, entityId)))
      .orderBy(desc(auditLogs.createdAt));
  }
}

// In-memory storage implementation for immediate functionality
export class MemStorage implements IStorage {
  private users: User[] = [];
  private userAuthorizations: UserAuthorization[] = [];
  private clients: Client[] = [];
  private applications: Application[] = [];
  private auditLogs: AuditLog[] = [];

  // User management
  async createUser(userData: InsertUser): Promise<User> {
    const user: User = {
      id: `user_${Date.now()}`,
      fagriIdKey: userData.fagriIdKey,
      firstName: userData.firstName,
      lastName: userData.lastName,
      email: userData.email,
      socialSecurityNumber: userData.socialSecurityNumber,
      telephone: userData.telephone,
      streetAddress: userData.streetAddress,
      city: userData.city,
      postalCode: userData.postalCode,
      province: userData.province,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    this.users.push(user);
    
    // Create audit log
    await this.createAuditLog({
      userId: user.id,
      userName: `${user.firstName} ${user.lastName}`,
      userRole: 'new-user',
      action: 'create',
      entityType: 'user',
      entityId: user.id,
      newValues: user,
      description: `New user account created with FAGRI ID: ${user.fagriIdKey}`,
    });

    return user;
  }

  async getUserByFagriId(fagriIdKey: string): Promise<User | undefined> {
    return this.users.find(user => user.fagriIdKey === fagriIdKey);
  }

  async updateUser(fagriIdKey: string, updates: Partial<User>): Promise<User> {
    const userIndex = this.users.findIndex(user => user.fagriIdKey === fagriIdKey);
    if (userIndex === -1) throw new Error('User not found');

    const oldUser = { ...this.users[userIndex] };
    this.users[userIndex] = {
      ...this.users[userIndex],
      ...updates,
      updatedAt: new Date(),
    };

    // Create audit log
    await this.createAuditLog({
      userId: this.users[userIndex].id,
      userName: `${this.users[userIndex].firstName} ${this.users[userIndex].lastName}`,
      userRole: 'user',
      action: 'update',
      entityType: 'user',
      entityId: this.users[userIndex].id,
      oldValues: oldUser,
      newValues: this.users[userIndex],
      description: `User profile updated for FAGRI ID: ${this.users[userIndex].fagriIdKey}`,
    });

    return this.users[userIndex];
  }

  // Account types management
  async getAccountTypes(): Promise<AccountType[]> {
    return [
      { id: 'fagri-member', name: 'FAGRI Member', description: 'Basic platform access', permissions: ['view_projects'] },
      { id: 'fagri-team', name: 'FAGRI Team', description: 'Client and application management', permissions: ['manage_clients', 'create_applications'] },
      { id: 'audit-certification', name: 'Audit & Certification', description: 'Review and certification', permissions: ['review_applications', 'certify_projects'] },
      { id: 'administration', name: 'Administration', description: 'Full system control', permissions: ['manage_users', 'approve_authorizations', 'system_config'] }
    ];
  }

  async createAccountType(accountType: InsertAccountType): Promise<AccountType> {
    return accountType as AccountType;
  }

  // Authorization management
  async requestAuthorization(authData: InsertUserAuthorization): Promise<UserAuthorization> {
    const authorization: UserAuthorization = {
      id: `auth_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      userId: authData.userId,
      accountTypeId: authData.accountTypeId,
      status: 'pending',
      requestedAt: new Date(),
      reviewedAt: null,
      reviewedBy: null,
      reviewerName: null,
      reviewNotes: null,
    };

    this.userAuthorizations.push(authorization);

    // Create audit log
    const user = this.users.find(u => u.id === authData.userId);
    if (user) {
      await this.createAuditLog({
        userId: authData.userId,
        userName: `${user.firstName} ${user.lastName}`,
        userRole: 'user',
        action: 'request',
        entityType: 'authorization',
        entityId: authorization.id,
        newValues: authorization,
        description: `Authorization requested for account type`,
      });
    }

    return authorization;
  }

  async getPendingAuthorizations(): Promise<UserAuthorization[]> {
    return this.userAuthorizations.filter(auth => auth.status === 'pending');
  }

  async getUserAuthorizations(userId: string): Promise<UserAuthorization[]> {
    return this.userAuthorizations.filter(auth => auth.userId === userId);
  }

  async approveAuthorization(authId: string, reviewerId: string, reviewerName: string, notes?: string): Promise<UserAuthorization> {
    const authIndex = this.userAuthorizations.findIndex(auth => auth.id === authId);
    if (authIndex === -1) throw new Error('Authorization not found');

    this.userAuthorizations[authIndex] = {
      ...this.userAuthorizations[authIndex],
      status: 'approved',
      reviewedAt: new Date(),
      reviewedBy: reviewerId,
      reviewerName,
      reviewNotes: notes || null,
    };

    // Create audit log
    const user = this.users.find(u => u.id === this.userAuthorizations[authIndex].userId);
    if (user) {
      await this.createAuditLog({
        userId: reviewerId,
        userName: reviewerName,
        userRole: 'admin',
        action: 'approve',
        entityType: 'authorization',
        entityId: authId,
        newValues: this.userAuthorizations[authIndex],
        description: `Authorization approved by ${reviewerName} for user ${user.firstName} ${user.lastName}`,
      });
    }

    return this.userAuthorizations[authIndex];
  }

  async rejectAuthorization(authId: string, reviewerId: string, reviewerName: string, notes?: string): Promise<UserAuthorization> {
    const authIndex = this.userAuthorizations.findIndex(auth => auth.id === authId);
    if (authIndex === -1) throw new Error('Authorization not found');

    this.userAuthorizations[authIndex] = {
      ...this.userAuthorizations[authIndex],
      status: 'rejected',
      reviewedAt: new Date(),
      reviewedBy: reviewerId,
      reviewerName,
      reviewNotes: notes || null,
    };

    // Create audit log
    const user = this.users.find(u => u.id === this.userAuthorizations[authIndex].userId);
    if (user) {
      await this.createAuditLog({
        userId: reviewerId,
        userName: reviewerName,
        userRole: 'admin',
        action: 'reject',
        entityType: 'authorization',
        entityId: authId,
        newValues: this.userAuthorizations[authIndex],
        description: `Authorization rejected by ${reviewerName} for user ${user.firstName} ${user.lastName}. Reason: ${notes || 'No reason provided'}`,
      });
    }

    return this.userAuthorizations[authIndex];
  }

  // Client management
  async createClient(clientData: InsertClient): Promise<Client> {
    const client: Client = {
      id: `client_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      teamMemberId: clientData.teamMemberId,
      name: clientData.name,
      contactPerson: clientData.contactPerson,
      email: clientData.email,
      telephone: clientData.telephone,
      address: clientData.address,
      pecEmail: clientData.pecEmail,
      vatNumber: clientData.vatNumber,
      legalRepresentative: clientData.legalRepresentative,
      bankingInfo: clientData.bankingInfo,
      status: 'active',
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    this.clients.push(client);

    // Create audit log
    const teamMember = this.users.find(u => u.id === clientData.teamMemberId);
    if (teamMember) {
      await this.createAuditLog({
        userId: clientData.teamMemberId,
        userName: `${teamMember.firstName} ${teamMember.lastName}`,
        userRole: 'team-member',
        action: 'create',
        entityType: 'client',
        entityId: client.id,
        newValues: client,
        description: `New client created: ${client.name} (${client.pecEmail})`,
      });
    }

    return client;
  }

  async getClientsByTeamMember(teamMemberId: string): Promise<Client[]> {
    return this.clients.filter(client => client.teamMemberId === teamMemberId);
  }

  async updateClient(clientId: string, updates: Partial<Client>): Promise<Client> {
    const clientIndex = this.clients.findIndex(client => client.id === clientId);
    if (clientIndex === -1) throw new Error('Client not found');

    this.clients[clientIndex] = {
      ...this.clients[clientIndex],
      ...updates,
      updatedAt: new Date(),
    };

    return this.clients[clientIndex];
  }

  // Application management
  async createApplication(appData: InsertApplication): Promise<Application> {
    const application: Application = {
      id: `app_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      teamMemberId: appData.teamMemberId,
      clientId: appData.clientId,
      applicationNumber: `APP-${Date.now()}`,
      projectType: appData.projectType,
      projectName: appData.projectName,
      projectDescription: appData.projectDescription,
      hectares: appData.hectares,
      estimatedCo2: appData.estimatedCo2,
      status: 'draft',
      submittedAt: null,
      reviewedAt: null,
      reviewedBy: null,
      certifiedAt: null,
      certifiedBy: null,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    this.applications.push(application);

    // Create audit log
    const teamMember = this.users.find(u => u.id === appData.teamMemberId);
    if (teamMember) {
      await this.createAuditLog({
        userId: appData.teamMemberId,
        userName: `${teamMember.firstName} ${teamMember.lastName}`,
        userRole: 'team-member',
        action: 'create',
        entityType: 'application',
        entityId: application.id,
        newValues: application,
        description: `New application created: ${application.applicationNumber}`,
      });
    }

    return application;
  }

  async getApplicationsByTeamMember(teamMemberId: string): Promise<Application[]> {
    return this.applications.filter(app => app.teamMemberId === teamMemberId);
  }

  async getApplicationsByClient(clientId: string): Promise<Application[]> {
    return this.applications.filter(app => app.clientId === clientId);
  }

  async updateApplicationStatus(appId: string, status: string, reviewerId?: string): Promise<Application> {
    const appIndex = this.applications.findIndex(app => app.id === appId);
    if (appIndex === -1) throw new Error('Application not found');

    const updateData: any = { status, updatedAt: new Date() };
    
    if (status === 'under-review' && reviewerId) {
      updateData.reviewedAt = new Date();
      updateData.reviewedBy = reviewerId;
    } else if (status === 'certified' && reviewerId) {
      updateData.certifiedAt = new Date();
      updateData.certifiedBy = reviewerId;
    }

    this.applications[appIndex] = {
      ...this.applications[appIndex],
      ...updateData,
    };

    // Create audit log
    if (reviewerId) {
      const reviewer = this.users.find(u => u.id === reviewerId);
      if (reviewer) {
        await this.createAuditLog({
          userId: reviewerId,
          userName: `${reviewer.firstName} ${reviewer.lastName}`,
          userRole: 'reviewer',
          action: 'update_status',
          entityType: 'application',
          entityId: appId,
          newValues: { status },
          description: `Application ${this.applications[appIndex].applicationNumber} status changed to: ${status}`,
        });
      }
    }

    return this.applications[appIndex];
  }

  // Audit logging
  async createAuditLog(auditData: InsertAuditLog): Promise<AuditLog> {
    const auditLog: AuditLog = {
      id: `audit_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      userId: auditData.userId,
      userName: auditData.userName,
      userRole: auditData.userRole,
      action: auditData.action,
      entityType: auditData.entityType,
      entityId: auditData.entityId,
      oldValues: auditData.oldValues || null,
      newValues: auditData.newValues || null,
      description: auditData.description,
      createdAt: new Date(),
    };

    this.auditLogs.push(auditLog);
    return auditLog;
  }

  async getAuditLogsByUser(userId: string): Promise<AuditLog[]> {
    return this.auditLogs.filter(log => log.userId === userId);
  }

  async getAuditLogsByEntity(entityType: string, entityId: string): Promise<AuditLog[]> {
    return this.auditLogs.filter(log => log.entityType === entityType && log.entityId === entityId);
  }
}

// Use MemStorage for immediate functionality, switch to DatabaseStorage when database is ready
export const storage = new MemStorage();