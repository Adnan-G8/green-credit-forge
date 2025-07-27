import { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/components/language-provider';
import { X, User, Settings, Eye, UserCheck, UserX, Search, Filter } from 'lucide-react';
import { Input } from '@/components/ui/input';

interface AdminUserManagementModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentUserRole: string;
}

interface UserProfile {
  fagriIdKey: string;
  fullName: string;
  email: string;
  phone: string;
  company: string;
  userRole: string;
  city: string;
  country: string;
  isActive: boolean;
  lastLogin: Date;
  activeSessionsCount: number;
}

export function AdminUserManagementModal({ isOpen, onClose, currentUserRole }: AdminUserManagementModalProps) {
  const { t } = useLanguage();
  const [searchTerm, setSearchTerm] = useState('');
  const [filterRole, setFilterRole] = useState('all');
  const [selectedUser, setSelectedUser] = useState<UserProfile | null>(null);
  const [allUsers, setAllUsers] = useState<UserProfile[]>([]);

  // Mock user database - in real implementation this would come from backend
  useEffect(() => {
    const mockUsers: UserProfile[] = [
      {
        fagriIdKey: 'FAGRI-1BKQE5C3-K9X2P4M7-15',
        fullName: 'Marco Rossi',
        email: 'marco.rossi@agritech.it',
        phone: '+39 339 1234567',
        company: 'AgroTech Solutions S.r.l.',
        userRole: 'FAGRI Member',
        city: 'Roma',
        country: 'Italy',
        isActive: true,
        lastLogin: new Date(Date.now() - 5 * 60 * 1000),
        activeSessionsCount: 2
      },
      {
        fagriIdKey: 'FAGRI-2MKQW8X9-PLVNR4T6-A2',
        fullName: 'Sofia Bianchi',
        email: 'sofia.bianchi@greenfarms.it',
        phone: '+39 348 9876543',
        company: 'Green Farms Network',
        userRole: 'FAGRI Sales Team',
        city: 'Milano',
        country: 'Italy',
        isActive: true,
        lastLogin: new Date(Date.now() - 2 * 60 * 60 * 1000),
        activeSessionsCount: 1
      },
      {
        fagriIdKey: 'FAGRI-3HKLS7M2-BNXCV9Q8-F4',
        fullName: 'Giuseppe Verdi',
        email: 'g.verdi@carbonfarm.eu',
        phone: '+39 335 5678901',
        company: 'Carbon Farm Italia',
        userRole: 'FAGRI Member',
        city: 'Napoli',
        country: 'Italy',
        isActive: true,
        lastLogin: new Date(Date.now() - 24 * 60 * 60 * 1000),
        activeSessionsCount: 0
      },
      {
        fagriIdKey: 'FAGRI-4PLMN8K3-QWERTY12-B7',
        fullName: 'Anna Ferrari',
        email: 'anna.ferrari@renewable.it',
        phone: '+39 347 2468135',
        company: 'Renewable Energy Italia',
        userRole: 'FAGRI Member',
        city: 'Torino',
        country: 'Italy',
        isActive: false,
        lastLogin: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
        activeSessionsCount: 0
      },
      {
        fagriIdKey: 'FAGRI-5ZXCV9L4-ASDFGH34-C1',
        fullName: 'Roberto Galli',
        email: 'roberto.galli@ecosolutions.it',
        phone: '+39 346 1357924',
        company: 'Eco Solutions S.p.A.',
        userRole: 'FAGRI Sales Team',
        city: 'Bologna',
        country: 'Italy',
        isActive: true,
        lastLogin: new Date(Date.now() - 45 * 60 * 1000),
        activeSessionsCount: 3
      }
    ];
    setAllUsers(mockUsers);
  }, []);

  // Filter users based on search and role
  const filteredUsers = allUsers.filter(user => {
    const matchesSearch = user.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.fagriIdKey.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.company.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesRole = filterRole === 'all' || user.userRole === filterRole;
    
    return matchesSearch && matchesRole;
  });

  const handleViewUserDetails = (user: UserProfile) => {
    setSelectedUser(user);
  };

  const handleToggleUserStatus = (fagriIdKey: string) => {
    setAllUsers(prev => prev.map(user => 
      user.fagriIdKey === fagriIdKey 
        ? { ...user, isActive: !user.isActive }
        : user
    ));
  };

  // Check if current user has admin privileges
  const isAdmin = currentUserRole === 'FAGRI Sales Team';

  if (!isAdmin) {
    return (
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="max-w-md bg-white border-2 border-red-200">
          <DialogHeader>
            <DialogTitle className="text-red-600">Access Denied</DialogTitle>
          </DialogHeader>
          <div className="text-center py-8">
            <UserX className="h-16 w-16 text-red-400 mx-auto mb-4" />
            <p className="text-slate-600 mb-4">
              Only FAGRI Sales Team members can access user management.
            </p>
            <Button onClick={onClose} variant="outline">
              Close
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-6xl max-h-[90vh] bg-white border-2 border-slate-200 overflow-hidden">
        <DialogHeader className="border-b border-slate-200 pb-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-emerald-600 rounded-full flex items-center justify-center">
                <Settings className="h-6 w-6 text-white" />
              </div>
              <div>
                <DialogTitle className="text-2xl font-light text-slate-900">
                  User Management Dashboard
                </DialogTitle>
                <p className="text-slate-600 text-sm">
                  Manage FAGRI ID KEY accounts and user profiles
                </p>
              </div>
            </div>
            <button 
              onClick={onClose}
              className="text-slate-400 hover:text-slate-600 transition-colors"
            >
              <X className="h-6 w-6" />
            </button>
          </div>
        </DialogHeader>

        <div className="flex-1 overflow-hidden">
          {!selectedUser ? (
            <>
              {/* Search and Filter Controls */}
              <div className="bg-slate-50 border-b border-slate-200 p-4">
                <div className="flex gap-4 items-center">
                  <div className="flex-1 relative">
                    <Search className="h-4 w-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" />
                    <Input
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      placeholder="Search by name, email, FAGRI ID, or company..."
                      className="pl-10"
                    />
                  </div>
                  <div className="relative">
                    <Filter className="h-4 w-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" />
                    <select
                      value={filterRole}
                      onChange={(e) => setFilterRole(e.target.value)}
                      className="pl-10 pr-8 py-2 border border-slate-300 rounded-lg bg-white focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                    >
                      <option value="all">All Roles</option>
                      <option value="FAGRI Member">FAGRI Members</option>
                      <option value="FAGRI Sales Team">Sales Team</option>
                      <option value="Non-Member">Non-Members</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Users List */}
              <div className="flex-1 overflow-auto p-4">
                <div className="grid gap-4">
                  {filteredUsers.map((user) => (
                    <div key={user.fagriIdKey} className="bg-white border border-slate-200 rounded-xl p-6 hover:shadow-md transition-shadow">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                            user.isActive ? 'bg-green-100' : 'bg-red-100'
                          }`}>
                            <User className={`h-6 w-6 ${user.isActive ? 'text-green-600' : 'text-red-600'}`} />
                          </div>
                          <div>
                            <h3 className="font-medium text-slate-900">{user.fullName}</h3>
                            <p className="text-sm text-slate-600">{user.email}</p>
                            <p className="text-xs text-slate-500 font-mono">{user.fagriIdKey}</p>
                          </div>
                        </div>
                        
                        <div className="flex items-center gap-4">
                          <div className="text-right text-sm">
                            <div className="font-medium text-slate-700">{user.company}</div>
                            <div className="text-slate-500">{user.city}, {user.country}</div>
                            <div className={`text-xs font-medium ${
                              user.userRole === 'FAGRI Sales Team' ? 'text-blue-600' : 'text-emerald-600'
                            }`}>
                              {user.userRole}
                            </div>
                          </div>
                          
                          <div className="text-right text-xs text-slate-500">
                            <div>Active Sessions: <span className="font-medium">{user.activeSessionsCount}</span></div>
                            <div>Last Login: {user.lastLogin.toLocaleDateString()}</div>
                            <div className={`font-medium ${user.isActive ? 'text-green-600' : 'text-red-600'}`}>
                              {user.isActive ? 'Active' : 'Inactive'}
                            </div>
                          </div>
                          
                          <div className="flex flex-col gap-2">
                            <Button
                              onClick={() => handleViewUserDetails(user)}
                              size="sm"
                              variant="outline"
                              className="flex items-center gap-1"
                            >
                              <Eye className="h-3 w-3" />
                              View
                            </Button>
                            <Button
                              onClick={() => handleToggleUserStatus(user.fagriIdKey)}
                              size="sm"
                              variant={user.isActive ? "destructive" : "default"}
                              className="flex items-center gap-1"
                            >
                              {user.isActive ? <UserX className="h-3 w-3" /> : <UserCheck className="h-3 w-3" />}
                              {user.isActive ? 'Disable' : 'Enable'}
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                
                {filteredUsers.length === 0 && (
                  <div className="text-center py-12">
                    <User className="h-16 w-16 text-slate-300 mx-auto mb-4" />
                    <p className="text-slate-500">No users match your search criteria</p>
                  </div>
                )}
              </div>
            </>
          ) : (
            /* User Detail View */
            <div className="p-6">
              <div className="flex items-center gap-4 mb-6">
                <Button 
                  onClick={() => setSelectedUser(null)}
                  variant="outline"
                  size="sm"
                >
                  ← Back to List
                </Button>
                <h3 className="text-xl font-light">User Profile Details</h3>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-slate-50 border border-slate-200 rounded-xl p-6">
                  <h4 className="font-medium text-slate-900 mb-4">Account Information</h4>
                  <div className="space-y-3 text-sm">
                    <div>
                      <span className="font-medium text-slate-700">FAGRI ID KEY:</span>
                      <br /><span className="font-mono text-blue-600">{selectedUser.fagriIdKey}</span>
                    </div>
                    <div>
                      <span className="font-medium text-slate-700">Full Name:</span>
                      <br /><span>{selectedUser.fullName}</span>
                    </div>
                    <div>
                      <span className="font-medium text-slate-700">Email:</span>
                      <br /><span>{selectedUser.email}</span>
                    </div>
                    <div>
                      <span className="font-medium text-slate-700">Phone:</span>
                      <br /><span>{selectedUser.phone}</span>
                    </div>
                    <div>
                      <span className="font-medium text-slate-700">Role:</span>
                      <br /><span className="font-medium text-emerald-600">{selectedUser.userRole}</span>
                    </div>
                  </div>
                </div>
                
                <div className="bg-slate-50 border border-slate-200 rounded-xl p-6">
                  <h4 className="font-medium text-slate-900 mb-4">Business Information</h4>
                  <div className="space-y-3 text-sm">
                    <div>
                      <span className="font-medium text-slate-700">Company:</span>
                      <br /><span>{selectedUser.company}</span>
                    </div>
                    <div>
                      <span className="font-medium text-slate-700">Location:</span>
                      <br /><span>{selectedUser.city}, {selectedUser.country}</span>
                    </div>
                    <div>
                      <span className="font-medium text-slate-700">Account Status:</span>
                      <br /><span className={`font-medium ${selectedUser.isActive ? 'text-green-600' : 'text-red-600'}`}>
                        {selectedUser.isActive ? 'Active' : 'Inactive'}
                      </span>
                    </div>
                    <div>
                      <span className="font-medium text-slate-700">Active Sessions:</span>
                      <br /><span className="font-medium">{selectedUser.activeSessionsCount}</span>
                    </div>
                    <div>
                      <span className="font-medium text-slate-700">Last Login:</span>
                      <br /><span>{selectedUser.lastLogin.toLocaleString()}</span>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="mt-6 flex gap-4">
                <Button
                  onClick={() => handleToggleUserStatus(selectedUser.fagriIdKey)}
                  variant={selectedUser.isActive ? "destructive" : "default"}
                  className="flex items-center gap-2"
                >
                  {selectedUser.isActive ? <UserX className="h-4 w-4" /> : <UserCheck className="h-4 w-4" />}
                  {selectedUser.isActive ? 'Disable Account' : 'Enable Account'}
                </Button>
              </div>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}