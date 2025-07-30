import { Router } from 'express';

const router = Router();

// Mock data for demonstration - replace with real database queries
const mockAuthorizationRequests = [
  {
    id: 'req-001',
    fagriId: 'FAGRI-1BKQE5C3-K9X2P4M7-15',
    accountType: 'Corporate Farmer',
    status: 'pending',
    requestedAt: new Date().toISOString(),
    fullName: 'Alessandro Bianchi',
    email: 'alessandro.bianchi@fagri.it',
    company: 'Agricola Toscana S.r.l.',
    notes: 'Request for corporate farming operations certification'
  },
  {
    id: 'req-002', 
    fagriId: 'FAGRI-2DKRE8F4-L7Y3Q6N8-22',
    accountType: 'FAGRI Team',
    status: 'pending',
    requestedAt: new Date(Date.now() - 3600000).toISOString(),
    fullName: 'Maria Rossi',
    email: 'maria.rossi@fagri.it',
    notes: 'Certification team member access request'
  },
  {
    id: 'req-003',
    fagriId: 'FAGRI-3FLTH9G5-M8Z4R7P9-31',
    accountType: 'Administration',
    status: 'approved',
    requestedAt: new Date(Date.now() - 86400000).toISOString(),
    fullName: 'Giovanni Verdi',
    email: 'giovanni.verdi@fagri.it',
    notes: 'Administrator access approved'
  }
];

const mockUserActivities = [
  {
    id: 'act-001',
    fagriId: 'FAGRI-1BKQE5C3-K9X2P4M7-15',
    action: 'Account Login',
    timestamp: new Date().toISOString(),
    details: 'User successfully authenticated via FAGRI ID KEY',
    ipAddress: '192.168.1.100'
  },
  {
    id: 'act-002',
    fagriId: 'FAGRI-2DKRE8F4-L7Y3Q6N8-22',
    action: 'Authorization Request Submitted',
    timestamp: new Date(Date.now() - 1800000).toISOString(),
    details: 'Submitted request for FAGRI Team access',
    ipAddress: '192.168.1.101'
  },
  {
    id: 'act-003',
    fagriId: 'FAGRI-3FLTH9G5-M8Z4R7P9-31',
    action: 'Project Registration',
    timestamp: new Date(Date.now() - 3600000).toISOString(),
    details: 'Registered new CO₂ certification project',
    ipAddress: '192.168.1.102'
  },
  {
    id: 'act-004',
    fagriId: 'FAGRI-1BKQE5C3-K9X2P4M7-15',
    action: 'Dashboard Access',
    timestamp: new Date(Date.now() - 7200000).toISOString(),
    details: 'Accessed user dashboard and reviewed authorization status',
    ipAddress: '192.168.1.100'
  }
];

const mockSystemMetrics = {
  totalUsers: 2847,
  activeUsers: 1234,
  pendingRequests: 3,
  approvedRequests: 847,
  rejectedRequests: 12,
  systemUptime: '99.9%',
  lastBackup: new Date(Date.now() - 7200000).toISOString()
};

const mockTeamMembers = [
  {
    id: 'tm-001',
    fagriId: 'FAGRI-1BKQE5C3-K9X2P4M7-15',
    fullName: 'Alessandro Bianchi',
    email: 'alessandro.bianchi@fagri.it',
    role: 'Corporate Farmer',
    status: 'active',
    lastLogin: new Date(Date.now() - 3600000).toISOString()
  },
  {
    id: 'tm-002',
    fagriId: 'FAGRI-2DKRE8F4-L7Y3Q6N8-22',
    fullName: 'Maria Rossi',
    email: 'maria.rossi@fagri.it',
    role: 'FAGRI Team',
    status: 'active',
    lastLogin: new Date(Date.now() - 7200000).toISOString()
  },
  {
    id: 'tm-003',
    fagriId: 'FAGRI-3FLTH9G5-M8Z4R7P9-31',
    fullName: 'Giovanni Verdi',
    email: 'giovanni.verdi@fagri.it',
    role: 'Administration',
    status: 'active',
    lastLogin: new Date(Date.now() - 86400000).toISOString()
  },
  {
    id: 'tm-004',
    fagriId: 'FAGRI-4GMUI0H6-N9A5S8Q0-42',
    fullName: 'Lucia Ferrari',
    email: 'lucia.ferrari@fagri.it',
    role: 'Certification Control',
    status: 'suspended',
    lastLogin: new Date(Date.now() - 259200000).toISOString()
  }
];

const mockApplications = [
  {
    id: 'app-001',
    fagriId: 'FAGRI-1BKQE5C3-K9X2P4M7-15',
    projectName: 'Organic Farm CO₂ Reduction',
    projectType: 'Farming',
    status: 'pending',
    submittedAt: new Date(Date.now() - 86400000).toISOString(),
    estimatedCO2: 150.5
  },
  {
    id: 'app-002',
    fagriId: 'FAGRI-2DKRE8F4-L7Y3Q6N8-22',
    projectName: 'Solar Panel Installation',
    projectType: 'Renewable Energy',
    status: 'approved',
    submittedAt: new Date(Date.now() - 172800000).toISOString(),
    estimatedCO2: 245.3
  },
  {
    id: 'app-003',
    fagriId: 'FAGRI-5HNVJ1I7-O0B6T9R1-53',
    projectName: 'Reforestation Project',
    projectType: 'Forest',
    status: 'rejected',
    submittedAt: new Date(Date.now() - 259200000).toISOString(),
    estimatedCO2: 89.7
  }
];

const mockCertifications = [
  {
    id: 'cert-001',
    fagriId: 'FAGRI-2DKRE8F4-L7Y3Q6N8-22',
    projectName: 'Solar Panel Installation',
    certificateNumber: 'EUFD-2025-001',
    status: 'valid',
    issuedAt: new Date(Date.now() - 86400000).toISOString(),
    expiresAt: new Date(Date.now() + 31536000000).toISOString(), // 1 year from now
    certifiedCO2: 245.3
  },
  {
    id: 'cert-002',
    fagriId: 'FAGRI-3FLTH9G5-M8Z4R7P9-31',
    projectName: 'Wind Farm Development',
    certificateNumber: 'EUFD-2025-002',
    status: 'valid',
    issuedAt: new Date(Date.now() - 172800000).toISOString(),
    expiresAt: new Date(Date.now() + 30931200000).toISOString(),
    certifiedCO2: 412.8
  },
  {
    id: 'cert-003',
    fagriId: 'FAGRI-6IOWK2J8-P1C7U0S2-64',
    projectName: 'Biomass Energy Project',
    certificateNumber: 'EUFD-2024-089',
    status: 'expired',
    issuedAt: new Date(Date.now() - 32140800000).toISOString(), // ~1 year ago
    expiresAt: new Date(Date.now() - 604800000).toISOString(), // expired 1 week ago
    certifiedCO2: 178.4
  }
];

// Extended employee profiles with more details
const mockEmployeeProfiles = {
  'tm-001': {
    id: 'tm-001',
    fagriId: 'FAGRI-1BKQE5C3-K9X2P4M7-15',
    fullName: 'Alessandro Bianchi',
    email: 'alessandro.bianchi@fagri.it',
    phone: '+39 342 123 4567',
    role: 'Corporate Farmer',
    status: 'active',
    avatar: '/api/placeholder/avatar/alessandro',
    department: 'Agricultural Operations',
    joinDate: '2024-01-15T00:00:00Z',
    lastLogin: new Date(Date.now() - 3600000).toISOString(),
    totalProjects: 8,
    approvedProjects: 6,
    pendingProjects: 1,
    rejectedProjects: 1
  },
  'tm-002': {
    id: 'tm-002',
    fagriId: 'FAGRI-2DKRE8F4-L7Y3Q6N8-22',
    fullName: 'Maria Rossi',
    email: 'maria.rossi@fagri.it',
    phone: '+39 345 987 6543',
    role: 'FAGRI Team',
    status: 'active',
    avatar: '/api/placeholder/avatar/maria',
    department: 'Project Management',
    joinDate: '2023-11-20T00:00:00Z',
    lastLogin: new Date(Date.now() - 7200000).toISOString(),
    totalProjects: 12,
    approvedProjects: 10,
    pendingProjects: 2,
    rejectedProjects: 0
  },
  'tm-003': {
    id: 'tm-003',
    fagriId: 'FAGRI-3FLTH9G5-M8Z4R7P9-31',
    fullName: 'Giovanni Verdi',
    email: 'giovanni.verdi@fagri.it',
    phone: '+39 338 555 7777',
    role: 'Administration',
    status: 'active',
    avatar: '/api/placeholder/avatar/giovanni',
    department: 'Administration',
    joinDate: '2023-06-10T00:00:00Z',
    lastLogin: new Date(Date.now() - 86400000).toISOString(),
    totalProjects: 5,
    approvedProjects: 5,
    pendingProjects: 0,
    rejectedProjects: 0
  },
  'tm-004': {
    id: 'tm-004',
    fagriId: 'FAGRI-4GMUI0H6-N9A5S8Q0-42',
    fullName: 'Lucia Ferrari',
    email: 'lucia.ferrari@fagri.it',
    phone: '+39 347 222 8888',
    role: 'Certification Control',
    status: 'suspended',
    avatar: '/api/placeholder/avatar/lucia',
    department: 'Quality Control',
    joinDate: '2024-03-01T00:00:00Z',
    lastLogin: new Date(Date.now() - 259200000).toISOString(),
    totalProjects: 3,
    approvedProjects: 1,
    pendingProjects: 0,
    rejectedProjects: 2
  }
};

// Employee projects with quality issues and certification notes
const mockEmployeeProjects = {
  'tm-001': [
    {
      id: 'proj-001',
      projectName: 'Organic Farm CO₂ Reduction Phase 1',
      projectType: 'Farming',
      status: 'approved',
      submittedAt: '2024-06-15T10:30:00Z',
      estimatedCO2: 150.5,
      certificationNotes: 'Excellent implementation of sustainable farming practices. Project meets all ISO 14064-2 requirements.',
      qualityIssues: [],
      certificationStatus: 'issued',
      certificateNumber: 'EUFD-2024-087'
    },
    {
      id: 'proj-002',
      projectName: 'Precision Agriculture Implementation',
      projectType: 'Farming',
      status: 'pending',
      submittedAt: '2024-07-20T14:45:00Z',
      estimatedCO2: 89.3,
      certificationNotes: 'Under review by certification authority. Additional documentation requested.',
      qualityIssues: ['Missing soil analysis data for Q2 2024', 'Incomplete fertilizer usage logs'],
      certificationStatus: 'pending'
    },
    {
      id: 'proj-003',
      projectName: 'Solar Panel Installation - Field B',
      projectType: 'Renewable Energy',
      status: 'rejected',
      submittedAt: '2024-05-10T09:15:00Z',
      estimatedCO2: 245.8,
      certificationNotes: 'Project rejected due to insufficient baseline measurements and improper installation documentation.',
      qualityIssues: [
        'Baseline energy consumption data incomplete',
        'Installation certificates not provided',
        'Environmental impact assessment missing'
      ],
      certificationStatus: 'rejected'
    }
  ],
  'tm-002': [
    {
      id: 'proj-004',
      projectName: 'Wind Farm Development - Zone A',
      projectType: 'Renewable Energy',
      status: 'approved',
      submittedAt: '2024-04-12T11:20:00Z',
      estimatedCO2: 412.8,
      certificationNotes: 'Outstanding project execution. Exceeds expected CO₂ reduction targets.',
      qualityIssues: [],
      certificationStatus: 'issued',
      certificateNumber: 'EUFD-2024-065'
    },
    {
      id: 'proj-005',
      projectName: 'Reforestation Project - Mountain Area',
      projectType: 'Forest',
      status: 'under_review',
      submittedAt: '2024-07-25T16:00:00Z',
      estimatedCO2: 298.4,
      certificationNotes: 'Certification authority requesting additional tree survival rate documentation.',
      qualityIssues: ['Tree mortality rate higher than expected in zone C'],
      certificationStatus: 'pending'
    }
  ],
  'tm-003': [
    {
      id: 'proj-006',
      projectName: 'Administrative Building Energy Efficiency',
      projectType: 'Renewable Energy',
      status: 'approved',
      submittedAt: '2024-03-08T13:30:00Z',
      estimatedCO2: 67.2,
      certificationNotes: 'Successful implementation of energy efficiency measures.',
      qualityIssues: [],
      certificationStatus: 'issued',
      certificateNumber: 'EUFD-2024-041'
    }
  ],
  'tm-004': [
    {
      id: 'proj-007',
      projectName: 'Biomass Energy Project',
      projectType: 'Renewable Energy',
      status: 'rejected',
      submittedAt: '2024-07-01T08:45:00Z',
      estimatedCO2: 178.4,
      certificationNotes: 'Project does not meet sustainability criteria due to questionable biomass sourcing.',
      qualityIssues: [
        'Biomass sourcing documentation insufficient',
        'Sustainability impact assessment rejected',
        'Carbon neutrality calculations disputed'
      ],
      certificationStatus: 'rejected'
    }
  ]
};

// Chat messages for employees
const mockChatMessages = {
  'tm-001': [
    {
      id: 'msg-001',
      senderId: 'admin',
      senderName: 'Administrator',
      message: 'Hi Alessandro, I noticed some issues with your recent project submission. Can you provide the missing soil analysis data?',
      timestamp: '2024-07-29T14:30:00Z',
      isAdmin: true
    },
    {
      id: 'msg-002',
      senderId: 'tm-001',
      senderName: 'Alessandro Bianchi',
      message: 'Hello! Yes, I can provide that data. The lab results were delayed but I should have them by tomorrow.',
      timestamp: '2024-07-29T15:45:00Z',
      isAdmin: false
    },
    {
      id: 'msg-003',
      senderId: 'admin',
      senderName: 'Administrator',
      message: 'Perfect, please upload them to the project portal when ready. The certification authority is waiting for this data.',
      timestamp: '2024-07-29T16:00:00Z',
      isAdmin: true
    }
  ],
  'tm-002': [
    {
      id: 'msg-004',
      senderId: 'admin',
      senderName: 'Administrator',
      message: 'Maria, excellent work on the wind farm project! The certification authority was very impressed.',
      timestamp: '2024-07-28T10:00:00Z',
      isAdmin: true
    },
    {
      id: 'msg-005',
      senderId: 'tm-002',
      senderName: 'Maria Rossi',
      message: 'Thank you! The team worked really hard on this one. Looking forward to the next challenge.',
      timestamp: '2024-07-28T11:30:00Z',
      isAdmin: false
    }
  ],
  'tm-003': [],
  'tm-004': [
    {
      id: 'msg-006',
      senderId: 'admin',
      senderName: 'Administrator',
      message: 'Lucia, we need to discuss the issues with your recent project submissions. Please schedule a meeting.',
      timestamp: '2024-07-26T09:00:00Z',
      isAdmin: true
    }
  ]
};

// Get all authorization requests
router.get('/authorization-requests', (req, res) => {
  try {
    res.json({
      success: true,
      requests: mockAuthorizationRequests
    });
  } catch (error) {
    console.error('Error fetching authorization requests:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching authorization requests'
    });
  }
});

// Approve or reject authorization request
router.post('/authorization-requests/:id/:action', (req, res) => {
  try {
    const { id, action } = req.params;
    const { notes } = req.body;

    if (!['approve', 'reject'].includes(action)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid action. Must be approve or reject.'
      });
    }

    // Find the request in mock data
    const requestIndex = mockAuthorizationRequests.findIndex(req => req.id === id);
    if (requestIndex === -1) {
      return res.status(404).json({
        success: false,
        message: 'Authorization request not found'
      });
    }

    // Update the request status
    mockAuthorizationRequests[requestIndex].status = action === 'approve' ? 'approved' : 'rejected';
    if (notes) {
      mockAuthorizationRequests[requestIndex].notes = notes;
    }

    // Log the activity
    const newActivity = {
      id: `act-${Date.now()}`,
      fagriId: 'ADMIN-SYSTEM',
      action: `Authorization ${action === 'approve' ? 'Approved' : 'Rejected'}`,
      timestamp: new Date().toISOString(),
      details: `${action === 'approve' ? 'Approved' : 'Rejected'} authorization for ${mockAuthorizationRequests[requestIndex].fagriId}`,
      ipAddress: req.ip || 'unknown'
    };
    mockUserActivities.unshift(newActivity);

    res.json({
      success: true,
      message: `Request ${action}d successfully`,
      request: mockAuthorizationRequests[requestIndex]
    });

  } catch (error) {
    console.error('Error processing authorization request:', error);
    res.status(500).json({
      success: false,
      message: 'Error processing authorization request'
    });
  }
});

// Get user activities
router.get('/user-activities', (req, res) => {
  try {
    res.json({
      success: true,
      activities: mockUserActivities
    });
  } catch (error) {
    console.error('Error fetching user activities:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching user activities'
    });
  }
});

// Get system metrics
router.get('/system-metrics', (req, res) => {
  try {
    res.json({
      success: true,
      metrics: mockSystemMetrics
    });
  } catch (error) {
    console.error('Error fetching system metrics:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching system metrics'
    });
  }
});

// Get specific user details
router.get('/users/:fagriId', (req, res) => {
  try {
    const { fagriId } = req.params;
    
    // Find user in authorization requests (mock user data)
    const userRequest = mockAuthorizationRequests.find(req => req.fagriId === fagriId);
    
    if (!userRequest) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    // Get user activities
    const userActivities = mockUserActivities.filter(activity => activity.fagriId === fagriId);

    res.json({
      success: true,
      user: userRequest,
      activities: userActivities
    });

  } catch (error) {
    console.error('Error fetching user details:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching user details'
    });
  }
});

// Get team members
router.get('/team-members', (req, res) => {
  try {
    res.json({
      success: true,
      members: mockTeamMembers
    });
  } catch (error) {
    console.error('Error fetching team members:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching team members'
    });
  }
});

// Get applications
router.get('/applications', (req, res) => {
  try {
    res.json({
      success: true,
      applications: mockApplications
    });
  } catch (error) {
    console.error('Error fetching applications:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching applications'
    });
  }
});

// Get certifications
router.get('/certifications', (req, res) => {
  try {
    res.json({
      success: true,
      certifications: mockCertifications
    });
  } catch (error) {
    console.error('Error fetching certifications:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching certifications'
    });
  }
});

// Get employee profile details
router.get('/employee/:id', (req, res) => {
  try {
    const employeeId = req.params.id;
    const employee = mockEmployeeProfiles[employeeId];
    
    if (!employee) {
      return res.status(404).json({
        success: false,
        message: 'Employee not found'
      });
    }

    res.json({
      success: true,
      employee
    });
  } catch (error) {
    console.error('Error fetching employee profile:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching employee profile'
    });
  }
});

// Get employee projects
router.get('/employee/:id/projects', (req, res) => {
  try {
    const employeeId = req.params.id;
    const projects = mockEmployeeProjects[employeeId] || [];

    res.json({
      success: true,
      projects
    });
  } catch (error) {
    console.error('Error fetching employee projects:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching employee projects'
    });
  }
});

// Get employee chat messages
router.get('/employee/:id/chat', (req, res) => {
  try {
    const employeeId = req.params.id;
    const messages = mockChatMessages[employeeId] || [];

    res.json({
      success: true,
      messages
    });
  } catch (error) {
    console.error('Error fetching chat messages:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching chat messages'
    });
  }
});

// Send chat message to employee
router.post('/employee/:id/chat', (req, res) => {
  try {
    const employeeId = req.params.id;
    const { message, senderId, senderName } = req.body;

    if (!mockChatMessages[employeeId]) {
      mockChatMessages[employeeId] = [];
    }

    const newMessage = {
      id: `msg-${Date.now()}`,
      senderId,
      senderName,
      message,
      timestamp: new Date().toISOString(),
      isAdmin: senderId === 'admin'
    };

    mockChatMessages[employeeId].push(newMessage);

    res.json({
      success: true,
      message: newMessage
    });
  } catch (error) {
    console.error('Error sending chat message:', error);
    res.status(500).json({
      success: false,
      message: 'Error sending chat message'
    });
  }
});

export default router;