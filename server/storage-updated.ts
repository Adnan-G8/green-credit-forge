import { 
  User, 
  InsertUser, 
  ContactRequest, 
  InsertContactRequest, 
  MembershipApplication, 
  InsertMembershipApplication,
  Document,
  InsertDocument,
  DocumentShare,
  InsertDocumentShare,
  DocumentVersion,
  InsertDocumentVersion,
  CO2Project,
  InsertCO2Project,
  ProjectMilestone,
  InsertProjectMilestone,
  ProjectActivity,
  InsertProjectActivity
} from "@shared/schema";
import { 
  OrganizationInformation, 
  InsertOrganizationInformation 
} from "@shared/organization-schema";

export interface IStorage {
  // User operations
  getUser(id: string): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;

  // Contact and membership operations
  createContactRequest(request: InsertContactRequest): Promise<ContactRequest>;
  createMembershipApplication(application: InsertMembershipApplication): Promise<MembershipApplication>;
  getAllContactRequests(): Promise<ContactRequest[]>;
  getAllMembershipApplications(): Promise<MembershipApplication[]>;

  // Document operations
  createDocument(document: InsertDocument): Promise<Document>;
  getDocuments(userId: string): Promise<Document[]>;
  getDocument(id: string): Promise<Document | undefined>;
  updateDocument(id: string, updates: Partial<Document>): Promise<Document | undefined>;
  deleteDocument(id: string): Promise<boolean>;

  // CO2 Project operations with authentication
  createCO2Project(project: InsertCO2Project): Promise<CO2Project>;
  getAllCO2Projects(userId?: string): Promise<CO2Project[]>;
  getCO2Project(id: string): Promise<CO2Project | undefined>;
  updateCO2Project(id: string, updates: Partial<CO2Project>): Promise<CO2Project | undefined>;
  deleteCO2Project(id: string): Promise<boolean>;

  // Project milestone operations
  createProjectMilestone(milestone: InsertProjectMilestone): Promise<ProjectMilestone>;
  getProjectMilestones(projectId: string): Promise<ProjectMilestone[]>;
  updateProjectMilestone(id: string, updates: Partial<ProjectMilestone>): Promise<ProjectMilestone | undefined>;

  // Project activity operations
  createProjectActivity(activity: InsertProjectActivity): Promise<ProjectActivity>;
  getProjectActivities(projectId: string): Promise<ProjectActivity[]>;

  // Blockchain integration methods
  recordOnBlockchain(projectId: string, txHash: string): Promise<boolean>;
  updateCertificationStatus(projectId: string, status: 'pending' | 'approved' | 'certified' | 'rejected', certificateNumber?: string): Promise<boolean>;

  // Organization information operations
  createOrganizationInformation(info: InsertOrganizationInformation): Promise<OrganizationInformation>;
  getOrganizationInformation(alphaG8Id: string): Promise<OrganizationInformation | undefined>;
  updateOrganizationInformation(alphaG8Id: string, updates: Partial<OrganizationInformation>): Promise<OrganizationInformation | undefined>;
}

export class MemStorage implements IStorage {
  private users: User[] = [];
  private contactRequests: ContactRequest[] = [];
  private membershipApplications: MembershipApplication[] = [];
  private documents: Document[] = [];
  private documentShares: DocumentShare[] = [];
  private documentVersions: DocumentVersion[] = [];
  private co2Projects: CO2Project[] = [];
  private projectMilestones: ProjectMilestone[] = [];
  private projectActivities: ProjectActivity[] = [];
  private organizationInformation: OrganizationInformation[] = [];

  constructor() {
    this.populateSampleData();
  }

  // User operations
  async getUser(id: string): Promise<User | undefined> {
    return this.users.find(user => user.id === id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return this.users.find(user => user.username === username);
  }

  async createUser(userData: InsertUser): Promise<User> {
    const user: User = {
      id: `user-${Date.now()}`,
      username: userData.username,
      password: userData.password, // In real app, this should be hashed
    };
    this.users.push(user);
    return user;
  }

  // Contact and membership operations
  async createContactRequest(requestData: InsertContactRequest): Promise<ContactRequest> {
    const request: ContactRequest = {
      id: this.contactRequests.length + 1,
      ...requestData,
      createdAt: new Date(),
    };
    this.contactRequests.push(request);
    return request;
  }

  async createMembershipApplication(applicationData: InsertMembershipApplication): Promise<MembershipApplication> {
    const application: MembershipApplication = {
      id: this.membershipApplications.length + 1,
      ...applicationData,
      createdAt: new Date(),
    };
    this.membershipApplications.push(application);
    return application;
  }

  async getAllContactRequests(): Promise<ContactRequest[]> {
    return [...this.contactRequests];
  }

  async getAllMembershipApplications(): Promise<MembershipApplication[]> {
    return [...this.membershipApplications];
  }

  // Document operations
  async createDocument(documentData: InsertDocument): Promise<Document> {
    const document: Document = {
      ...documentData,
      uploadDate: new Date(),
      lastModified: new Date(),
      status: documentData.status || 'active',
      isPublic: documentData.isPublic || 'false',
    };
    this.documents.push(document);
    return document;
  }

  async getDocuments(userId: string): Promise<Document[]> {
    return this.documents.filter(doc => doc.userId === userId);
  }

  async getDocument(id: string): Promise<Document | undefined> {
    return this.documents.find(doc => doc.id === id);
  }

  async updateDocument(id: string, updates: Partial<Document>): Promise<Document | undefined> {
    const index = this.documents.findIndex(doc => doc.id === id);
    if (index === -1) return undefined;
    
    this.documents[index] = {
      ...this.documents[index],
      ...updates,
      lastModified: new Date(),
    };
    return this.documents[index];
  }

  async deleteDocument(id: string): Promise<boolean> {
    const index = this.documents.findIndex(doc => doc.id === id);
    if (index === -1) return false;
    this.documents.splice(index, 1);
    return true;
  }

  // CO2 Project operations with authentication
  async createCO2Project(projectData: InsertCO2Project): Promise<CO2Project> {
    const newProject: CO2Project = {
      ...projectData,
      applicationDate: new Date(),
      lastUpdated: new Date(),
      progressPercentage: projectData.progressPercentage || 0,
      currentPhase: projectData.currentPhase || 'application',
      complianceScore: projectData.complianceScore || 0,
      documentsSubmitted: projectData.documentsSubmitted || 0,
      documentsRequired: projectData.documentsRequired || 0,
      certificationStandard: projectData.certificationStandard || 'EUFD2025-001',
      status: projectData.status || 'draft',
      certificationStatus: 'pending', // Always start as pending
      blockchainRecorded: false, // Never on blockchain initially
    };
    this.co2Projects.push(newProject);
    return newProject;
  }

  async getAllCO2Projects(userId?: string): Promise<CO2Project[]> {
    if (userId) {
      return this.co2Projects.filter(project => project.userId === userId);
    }
    return [...this.co2Projects];
  }

  async getCO2Project(id: string): Promise<CO2Project | undefined> {
    return this.co2Projects.find(project => project.id === id);
  }

  async updateCO2Project(id: string, updates: Partial<CO2Project>): Promise<CO2Project | undefined> {
    const index = this.co2Projects.findIndex(project => project.id === id);
    if (index === -1) return undefined;
    
    this.co2Projects[index] = {
      ...this.co2Projects[index],
      ...updates,
      lastUpdated: new Date(),
    };
    return this.co2Projects[index];
  }

  async deleteCO2Project(id: string): Promise<boolean> {
    const index = this.co2Projects.findIndex(project => project.id === id);
    if (index === -1) return false;
    this.co2Projects.splice(index, 1);
    return true;
  }

  // Blockchain integration methods
  async recordOnBlockchain(projectId: string, txHash: string): Promise<boolean> {
    const project = await this.getCO2Project(projectId);
    if (!project || project.certificationStatus !== 'approved') {
      return false; // Only approved projects go on blockchain
    }

    await this.updateCO2Project(projectId, {
      blockchainRecorded: true,
      blockchainTxHash: txHash,
      blockchainTimestamp: new Date(),
    });

    // Log activity
    await this.createProjectActivity({
      id: `activity-${Date.now()}`,
      projectId: projectId,
      activityType: 'milestone_update',
      title: 'Project Recorded on Blockchain',
      description: `Project successfully recorded on G8Chain blockchain with transaction hash: ${txHash}`,
      performedBy: 'system',
      performedByName: 'Blockchain System',
    });

    return true;
  }

  async updateCertificationStatus(
    projectId: string, 
    status: 'pending' | 'approved' | 'certified' | 'rejected', 
    certificateNumber?: string
  ): Promise<boolean> {
    const updates: Partial<CO2Project> = {
      certificationStatus: status,
    };

    if (status === 'certified' && certificateNumber) {
      updates.certificateNumber = certificateNumber;
      updates.certificateIssueDate = new Date();
    }

    const result = await this.updateCO2Project(projectId, updates);
    
    // If approved, automatically record on blockchain
    if (status === 'approved' && result) {
      const txHash = `0x${Math.random().toString(16).substr(2, 64)}`;
      await this.recordOnBlockchain(projectId, txHash);
    }

    return result !== undefined;
  }

  // Project milestone operations
  async createProjectMilestone(milestoneData: InsertProjectMilestone): Promise<ProjectMilestone> {
    const newMilestone: ProjectMilestone = {
      ...milestoneData,
      createdAt: new Date(),
      updatedAt: new Date(),
      status: milestoneData.status || 'pending',
      priority: milestoneData.priority || 'medium',
    };
    this.projectMilestones.push(newMilestone);
    return newMilestone;
  }

  async getProjectMilestones(projectId: string): Promise<ProjectMilestone[]> {
    return this.projectMilestones.filter(milestone => milestone.projectId === projectId);
  }

  async updateProjectMilestone(id: string, updates: Partial<ProjectMilestone>): Promise<ProjectMilestone | undefined> {
    const index = this.projectMilestones.findIndex(milestone => milestone.id === id);
    if (index === -1) return undefined;
    
    this.projectMilestones[index] = {
      ...this.projectMilestones[index],
      ...updates,
      updatedAt: new Date(),
    };
    return this.projectMilestones[index];
  }

  // Project activity operations
  async createProjectActivity(activityData: InsertProjectActivity): Promise<ProjectActivity> {
    const newActivity: ProjectActivity = {
      ...activityData,
      timestamp: new Date(),
    };
    this.projectActivities.push(newActivity);
    return newActivity;
  }

  async getProjectActivities(projectId: string): Promise<ProjectActivity[]> {
    return this.projectActivities
      .filter(activity => activity.projectId === projectId)
      .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());
  }

  // Helper method to populate with sample data
  populateSampleData() {
    // Sample CO2 projects with certification status
    const sampleProjects: CO2Project[] = [
      {
        id: 'proj-001',
        userId: 'user-001',
        alphaG8Id: 'AG8-USER-001',
        projectType: 'farming',
        projectName: 'Organic Wheat Farm CO₂ Reduction',
        description: 'Sustainable farming practices to reduce carbon emissions through organic wheat cultivation.',
        status: 'in-progress',
        country: 'Italy',
        region: 'Tuscany',
        city: 'Florence',
        streetAddress: 'Via dei Campi 123',
        postalCode: '50100',
        province: 'FI',
        hectares: '25',
        estimatedCO2Reduction: '45.5',
        certificationStandard: 'EUFD2025-001',
        isoStandards: ['ISO 14064-1', 'ISO 14064-2'],
        applicationDate: new Date('2024-01-15'),
        reviewStartDate: new Date('2024-02-01'),
        lastUpdated: new Date(),
        progressPercentage: 65,
        currentPhase: 'verification',
        nextMilestone: 'Field Verification Complete',
        milestoneDate: new Date('2024-08-15'),
        projectValue: '12500',
        carbonCreditPrice: '275',
        expectedRevenue: '12512',
        documentsSubmitted: 8,
        documentsRequired: 12,
        complianceScore: 87,
        lastCommunication: new Date('2024-07-20'),
        priority: 'high',
        certificationStatus: 'approved',
        certificateNumber: 'FAGRI-CERT-2024-001',
        certificateIssueDate: new Date('2024-01-15'),
        blockchainRecorded: true,
        blockchainTxHash: '0x1234567890abcdef1234567890abcdef12345678',
        blockchainTimestamp: new Date('2024-01-16'),
        tags: ['organic', 'wheat', 'sustainable'],
        metadata: null,
        renewableEnergyType: null,
        renewableCapacity: null,
        communicationNotes: null,
        approvalDate: null,
        completionDate: null,
      },
      {
        id: 'proj-002',
        userId: 'user-001',
        alphaG8Id: 'AG8-USER-001',
        projectType: 'renewable-energy',
        projectName: 'Solar Farm Installation',
        description: '200 kW solar photovoltaic installation for clean energy generation.',
        status: 'under-review',
        country: 'Italy',
        region: 'Lombardy',
        city: 'Milan',
        streetAddress: 'Via Energia 456',
        postalCode: '20100',
        province: 'MI',
        renewableEnergyType: 'solar-photovoltaic',
        renewableCapacity: '200 kW',
        estimatedCO2Reduction: '120.0',
        certificationStandard: 'EUFD2025-001',
        isoStandards: ['ISO 14064-1', 'ISO 14064-3'],
        applicationDate: new Date('2024-03-01'),
        reviewStartDate: new Date('2024-03-15'),
        lastUpdated: new Date(),
        progressPercentage: 35,
        currentPhase: 'documentation',
        nextMilestone: 'Technical Review Complete',
        milestoneDate: new Date('2024-08-30'),
        projectValue: '35000',
        carbonCreditPrice: '290',
        expectedRevenue: '34800',
        documentsSubmitted: 6,
        documentsRequired: 15,
        complianceScore: 73,
        lastCommunication: new Date('2024-07-25'),
        priority: 'medium',
        certificationStatus: 'pending',
        blockchainRecorded: false,
        tags: ['solar', 'renewable', 'clean-energy'],
        metadata: null,
        hectares: null,
        communicationNotes: null,
        approvalDate: null,
        completionDate: null,
        certificateNumber: null,
        certificateIssueDate: null,
        blockchainTxHash: null,
        blockchainTimestamp: null,
      },
      {
        id: 'proj-003',
        userId: 'user-001',
        alphaG8Id: 'AG8-USER-001',
        projectType: 'forest',
        projectName: 'Reforestation Project',
        description: 'Native tree species reforestation for carbon sequestration.',
        status: 'approved',
        country: 'Italy',
        region: 'Umbria',
        city: 'Perugia',
        streetAddress: 'Strada della Foresta 789',
        postalCode: '06100',
        province: 'PG',
        hectares: '150',
        estimatedCO2Reduction: '890.2',
        certificationStandard: 'EUFD2025-001',
        isoStandards: ['ISO 14064-1', 'ISO 14064-2'],
        applicationDate: new Date('2024-02-20'),
        reviewStartDate: new Date('2024-03-05'),
        approvalDate: new Date('2024-07-15'),
        lastUpdated: new Date(),
        progressPercentage: 90,
        currentPhase: 'certification',
        nextMilestone: 'Certificate Issuance',
        milestoneDate: new Date('2024-08-10'),
        projectValue: '125000',
        carbonCreditPrice: '310',
        expectedRevenue: '276022',
        documentsSubmitted: 22,
        documentsRequired: 25,
        complianceScore: 96,
        lastCommunication: new Date('2024-07-26'),
        priority: 'high',
        certificationStatus: 'certified',
        certificateNumber: 'FAGRI-CERT-2024-002',
        certificateIssueDate: new Date('2024-07-16'),
        blockchainRecorded: true,
        blockchainTxHash: '0xabcdef1234567890abcdef1234567890abcdef12',
        blockchainTimestamp: new Date('2024-07-17'),
        tags: ['reforestation', 'carbon-sequestration', 'biodiversity'],
        metadata: null,
        renewableEnergyType: null,
        renewableCapacity: null,
        communicationNotes: null,
        completionDate: null,
      }
    ];

    this.co2Projects = sampleProjects;

    // Sample milestones for projects
    const sampleMilestones: ProjectMilestone[] = [
      {
        id: 'milestone-001',
        projectId: 'proj-001',
        milestoneType: 'verification',
        title: 'Field Verification Complete',
        description: 'On-site verification of farming practices and measurements',
        status: 'in-progress',
        dueDate: new Date('2024-08-15'),
        assignedTo: 'FAGRI Verification Team',
        priority: 'high',
        notes: 'Site visit scheduled for next week',
        createdAt: new Date('2024-07-01'),
        updatedAt: new Date('2024-07-20'),
        completedDate: null,
      },
      {
        id: 'milestone-002',
        projectId: 'proj-002',
        milestoneType: 'documentation',
        title: 'Technical Review Complete',
        description: 'Review of solar installation technical specifications',
        status: 'pending',
        dueDate: new Date('2024-08-30'),
        assignedTo: 'Technical Review Team',
        priority: 'medium',
        notes: 'Waiting for additional technical documents',
        createdAt: new Date('2024-07-10'),
        updatedAt: new Date('2024-07-25'),
        completedDate: null,
      },
      {
        id: 'milestone-003',
        projectId: 'proj-003',
        milestoneType: 'certification',
        title: 'Certificate Issuance',
        description: 'Final certification document preparation and issuance',
        status: 'completed',
        dueDate: new Date('2024-08-10'),
        completedDate: new Date('2024-07-16'),
        assignedTo: 'Certification Authority',
        priority: 'high',
        notes: 'Certificate issued and recorded on blockchain',
        createdAt: new Date('2024-07-01'),
        updatedAt: new Date('2024-07-16'),
      }
    ];

    this.projectMilestones = sampleMilestones;

    // Sample activities for projects
    const sampleActivities: ProjectActivity[] = [
      {
        id: 'activity-001',
        projectId: 'proj-001',
        activityType: 'status_change',
        title: 'Project Status Updated',
        description: 'Project status changed from "under-review" to "in-progress"',
        performedBy: 'admin-001',
        performedByName: 'FAGRI Review Team',
        timestamp: new Date('2024-07-20'),
        metadata: null,
      },
      {
        id: 'activity-002',
        projectId: 'proj-001',
        activityType: 'document_upload',
        title: 'Soil Analysis Report Uploaded',
        description: 'Comprehensive soil analysis report submitted for verification',
        performedBy: 'user-001',
        performedByName: 'Project Manager',
        timestamp: new Date('2024-07-18'),
        metadata: null,
      },
      {
        id: 'activity-003',
        projectId: 'proj-003',
        activityType: 'milestone_update',
        title: 'Project Recorded on Blockchain',
        description: 'Project successfully recorded on G8Chain blockchain with transaction hash: 0xabcdef1234567890abcdef1234567890abcdef12',
        performedBy: 'system',
        performedByName: 'Blockchain System',
        timestamp: new Date('2024-07-17'),
        metadata: null,
      }
    ];

    this.projectActivities = sampleActivities;
  }

  // Organization Information operations
  async createOrganizationInformation(info: InsertOrganizationInformation): Promise<OrganizationInformation> {
    const newInfo: OrganizationInformation = {
      ...info,
      id: `org-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      submittedAt: new Date(),
      updatedAt: new Date(),
    };

    this.organizationInformation.push(newInfo);
    return newInfo;
  }

  async getOrganizationInformation(alphaG8Id: string): Promise<OrganizationInformation | undefined> {
    return this.organizationInformation.find(info => info.alphaG8Id === alphaG8Id);
  }

  async updateOrganizationInformation(alphaG8Id: string, updates: Partial<OrganizationInformation>): Promise<OrganizationInformation | undefined> {
    const index = this.organizationInformation.findIndex(info => info.alphaG8Id === alphaG8Id);
    if (index === -1) {
      return undefined;
    }

    const updatedInfo = {
      ...this.organizationInformation[index],
      ...updates,
      updatedAt: new Date(),
    };

    this.organizationInformation[index] = updatedInfo;
    return updatedInfo;
  }

  // Certification Status operations for Projects
  async updateCertificationStatus(projectId: string, status: 'pending' | 'approved' | 'certified' | 'rejected', certificateNumber?: string): Promise<boolean> {
    const project = this.co2Projects.find(p => p.id === projectId);
    if (!project) {
      return false;
    }

    project.certificationStatus = status;
    if (certificateNumber) {
      project.certificateNumber = certificateNumber;
      project.issueDate = new Date();
    }
    project.updatedAt = new Date();
    
    return true;
  }

  // Blockchain integration
  async recordOnBlockchain(projectId: string, txHash: string): Promise<boolean> {
    const project = this.co2Projects.find(p => p.id === projectId);
    if (!project) {
      return false;
    }
    
    project.blockchainTxHash = txHash;
    project.updatedAt = new Date();
    
    return true;
  }
}

export const storage = new MemStorage();