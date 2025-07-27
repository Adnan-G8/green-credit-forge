import type { User, InsertUser, ContactRequest, InsertContactRequest, MembershipApplication, InsertMembershipApplication, CO2Project, InsertCO2Project, ProjectMilestone, InsertProjectMilestone, ProjectActivity, InsertProjectActivity } from "@shared/schema";

export interface IStorage {
  // User operations
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(insertUser: InsertUser): Promise<User>;

  // Contact operations
  createContactRequest(contactRequest: InsertContactRequest): Promise<ContactRequest>;

  // Membership operations
  createMembershipApplication(application: InsertMembershipApplication): Promise<MembershipApplication>;
  
  // Placeholder methods for existing functionality
  getContactRequests(): Promise<ContactRequest[]>;
  getMembershipApplications(): Promise<MembershipApplication[]>;

  // CO2 Project operations
  createCO2Project(project: InsertCO2Project): Promise<CO2Project>;
  getAllCO2Projects(userId?: string): Promise<CO2Project[]>;
  getCO2Project(id: string): Promise<CO2Project | undefined>;
  updateCO2Project(id: string, updates: Partial<CO2Project>): Promise<CO2Project | undefined>;
  deleteCO2Project(id: string): Promise<boolean>;

  // Project Milestone operations
  createProjectMilestone(milestone: InsertProjectMilestone): Promise<ProjectMilestone>;
  getProjectMilestones(projectId: string): Promise<ProjectMilestone[]>;
  updateProjectMilestone(id: string, updates: Partial<ProjectMilestone>): Promise<ProjectMilestone | undefined>;

  // Project Activity operations
  createProjectActivity(activity: InsertProjectActivity): Promise<ProjectActivity>;
  getProjectActivities(projectId: string): Promise<ProjectActivity[]>;
}

// In-memory storage implementation
export class MemStorage implements IStorage {
  private users: User[] = [];
  private contactRequests: ContactRequest[] = [];
  private membershipApplications: MembershipApplication[] = [];
  private co2Projects: CO2Project[] = [];
  private projectMilestones: ProjectMilestone[] = [];
  private projectActivities: ProjectActivity[] = [];
  private currentUserId = 1;
  private currentContactId = 1;
  private currentMembershipId = 1;

  async getUser(id: number): Promise<User | undefined> {
    return this.users.find(user => user.id === id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return this.users.find(user => user.username === username);
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const user: User = {
      id: this.currentUserId++,
      ...insertUser,
    };
    this.users.push(user);
    return user;
  }

  async createContactRequest(contactRequest: InsertContactRequest): Promise<ContactRequest> {
    const request: ContactRequest = {
      id: this.currentContactId++,
      ...contactRequest,
      createdAt: new Date(),
    };
    this.contactRequests.push(request);
    return request;
  }

  async createMembershipApplication(application: InsertMembershipApplication): Promise<MembershipApplication> {
    const app: MembershipApplication = {
      id: this.currentMembershipId++,
      ...application,
      createdAt: new Date(),
    };
    this.membershipApplications.push(app);
    return app;
  }

  // CO2 Project operations
  async createCO2Project(project: InsertCO2Project): Promise<CO2Project> {
    const newProject: CO2Project = {
      ...project,
      applicationDate: new Date(),
      lastUpdated: new Date(),
      progressPercentage: project.progressPercentage || 0,
      currentPhase: project.currentPhase || 'application',
      priority: project.priority || 'medium',
      documentsSubmitted: project.documentsSubmitted || 0,
      documentsRequired: project.documentsRequired || 0,
      complianceScore: project.complianceScore || 0,
      certificationStandard: project.certificationStandard || 'EUFD2025-001',
      status: project.status || 'draft',
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

  // Project Milestone operations
  async createProjectMilestone(milestone: InsertProjectMilestone): Promise<ProjectMilestone> {
    const newMilestone: ProjectMilestone = {
      ...milestone,
      createdAt: new Date(),
      updatedAt: new Date(),
      status: milestone.status || 'pending',
      priority: milestone.priority || 'medium',
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

  // Project Activity operations
  async createProjectActivity(activity: InsertProjectActivity): Promise<ProjectActivity> {
    const newActivity: ProjectActivity = {
      ...activity,
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
    // Sample CO2 projects
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
        tags: ['organic', 'wheat', 'sustainable'],
        metadata: null,
        renewableEnergyType: null,
        renewableCapacity: null,
        communicationNotes: null,
        approvalDate: null,
        completionDate: null,
        carbonCreditPrice: null,
        expectedRevenue: null
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
        tags: ['solar', 'renewable', 'clean-energy'],
        metadata: null,
        hectares: null,
        communicationNotes: null,
        approvalDate: null,
        completionDate: null
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
        streetAddress: 'Località Bosco Verde',
        postalCode: '06100',
        province: 'PG',
        hectares: '15',
        estimatedCO2Reduction: '75.2',
        certificationStandard: 'EUFD2025-001',
        isoStandards: ['ISO 14064-1', 'ISO 14064-2', 'ISO 14064-3'],
        applicationDate: new Date('2024-01-10'),
        reviewStartDate: new Date('2024-01-25'),
        approvalDate: new Date('2024-06-15'),
        lastUpdated: new Date(),
        progressPercentage: 90,
        currentPhase: 'certification',
        nextMilestone: 'Final Certification',
        milestoneDate: new Date('2024-08-10'),
        projectValue: '18750',
        carbonCreditPrice: '250',
        expectedRevenue: '18800',
        documentsSubmitted: 12,
        documentsRequired: 12,
        complianceScore: 96,
        lastCommunication: new Date('2024-07-27'),
        priority: 'high',
        tags: ['reforestation', 'native-species', 'carbon-sequestration'],
        metadata: null,
        renewableEnergyType: null,
        renewableCapacity: null,
        communicationNotes: null,
        completionDate: null
      }
    ];

    this.co2Projects.push(...sampleProjects);

    // Sample milestones
    const sampleMilestones: ProjectMilestone[] = [
      {
        id: 'milestone-001',
        projectId: 'proj-001',
        milestoneType: 'documentation',
        title: 'Submit Soil Analysis Reports',
        description: 'Complete soil composition and quality analysis documentation.',
        status: 'completed',
        dueDate: new Date('2024-02-15'),
        completedDate: new Date('2024-02-10'),
        assignedTo: 'verification-team',
        priority: 'high',
        notes: 'All required soil samples analyzed and documented.',
        createdAt: new Date('2024-01-15'),
        updatedAt: new Date('2024-02-10')
      },
      {
        id: 'milestone-002',
        projectId: 'proj-001',
        milestoneType: 'verification',
        title: 'Field Verification Visit',
        description: 'On-site verification of farming practices and measurements.',
        status: 'in-progress',
        dueDate: new Date('2024-08-15'),
        assignedTo: 'field-inspector',
        priority: 'high',
        notes: 'Site visit scheduled for next week.',
        createdAt: new Date('2024-01-15'),
        updatedAt: new Date('2024-07-25')
      },
      {
        id: 'milestone-003',
        projectId: 'proj-002',
        milestoneType: 'documentation',
        title: 'Solar Panel Specifications',
        description: 'Submit detailed technical specifications for solar installation.',
        status: 'pending',
        dueDate: new Date('2024-08-30'),
        assignedTo: 'technical-review',
        priority: 'medium',
        notes: 'Awaiting manufacturer specifications.',
        createdAt: new Date('2024-03-01'),
        updatedAt: new Date('2024-07-20')
      }
    ];

    this.projectMilestones.push(...sampleMilestones);

    // Sample activities
    const sampleActivities: ProjectActivity[] = [
      {
        id: 'activity-001',
        projectId: 'proj-001',
        activityType: 'status_change',
        title: 'Status Updated to In Progress',
        description: 'Project status changed from Under Review to In Progress following approval.',
        performedBy: 'system',
        performedByName: 'FAGRI System',
        timestamp: new Date('2024-07-01'),
        metadata: null
      },
      {
        id: 'activity-002',
        projectId: 'proj-001',
        activityType: 'document_upload',
        title: 'Soil Analysis Report Uploaded',
        description: 'Comprehensive soil analysis report added to project documentation.',
        performedBy: 'user-001',
        performedByName: 'Mario Rossi',
        timestamp: new Date('2024-02-10'),
        metadata: null
      },
      {
        id: 'activity-003',
        projectId: 'proj-002',
        activityType: 'communication',
        title: 'Technical Review Meeting',
        description: 'Meeting with technical team to review solar panel specifications.',
        performedBy: 'fagri-tech-001',
        performedByName: 'FAGRI Technical Team',
        timestamp: new Date('2024-07-25'),
        metadata: null
      }
    ];

    this.projectActivities.push(...sampleActivities);
  }

  // Placeholder methods for existing functionality
  async getContactRequests(): Promise<ContactRequest[]> {
    return [...this.contactRequests];
  }

  async getMembershipApplications(): Promise<MembershipApplication[]> {
    return [...this.membershipApplications];
  }
}

export const storage = new MemStorage();

// Populate with sample data for development
storage.populateSampleData();