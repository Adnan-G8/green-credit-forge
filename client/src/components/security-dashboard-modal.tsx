import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/components/language-provider';
import { useToast } from '@/hooks/use-toast';
import { Key, Copy, Download, Shield, Calendar, Clock, User, Monitor, AlertTriangle, CheckCircle, LogOut, Eye, Settings } from 'lucide-react';
import { useState, useEffect } from 'react';

interface SecurityDashboardModalProps {
  isOpen: boolean;
  onClose: () => void;
  alphaG8Id: string;
}

interface UserProfile {
  fagriIdKey: string;
  fullName: string;
  email: string;
  phone: string;
  company: string;
  userRole: string;
  profileImageUrl?: string;
  city: string;
  country: string;
  isActive: boolean;
  lastLogin: Date;
}

interface SessionInfo {
  id: string;
  userId: string;
  userName: string;
  userRole: string;
  loginTime: Date;
  lastActivity: Date;
  ipAddress: string;
  deviceInfo: string;
  location: string;
  isCurrentSession: boolean;
  permissions: string[];
}

export function SecurityDashboardModal({ isOpen, onClose, alphaG8Id }: SecurityDashboardModalProps) {
  const { t } = useLanguage();
  const { toast } = useToast();
  const [copied, setCopied] = useState(false);
  const [activeTab, setActiveTab] = useState<'keycard' | 'security' | 'sessions'>('keycard');
  const [sessions, setSessions] = useState<SessionInfo[]>([]);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [sessionVerificationCheck, setSessionVerificationCheck] = useState(false);
  const [accountAccessCheck, setAccountAccessCheck] = useState(false);

  // Mock user profiles and session data - in real implementation this would come from backend
  useEffect(() => {
    // Mock user profiles database
    const userProfiles: UserProfile[] = [
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
        lastLogin: new Date(Date.now() - 5 * 60 * 1000)
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
        lastLogin: new Date(Date.now() - 2 * 60 * 60 * 1000)
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
        lastLogin: new Date(Date.now() - 24 * 60 * 60 * 1000)
      }
    ];

    // Find current user profile
    const currentProfile = userProfiles.find(profile => profile.fagriIdKey === alphaG8Id);
    setUserProfile(currentProfile || userProfiles[0]); // Fallback to first profile for demo

    // Generate mock sessions for current user
    const mockSessions: SessionInfo[] = [
      {
        id: 'session-001',
        userId: alphaG8Id,
        userName: currentProfile?.fullName || 'Demo User',
        userRole: currentProfile?.userRole || 'FAGRI Member',
        loginTime: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
        lastActivity: new Date(Date.now() - 5 * 60 * 1000), // 5 minutes ago
        ipAddress: '192.168.1.100',
        deviceInfo: 'Chrome 121.0 on Windows 11',
        location: currentProfile?.city + ', ' + currentProfile?.country || 'Rome, Italy',
        isCurrentSession: true,
        permissions: ['view_projects', 'create_projects', 'organization_info', 'pricing_access']
      },
      {
        id: 'session-002',
        userId: alphaG8Id,
        userName: currentProfile?.fullName || 'Demo User',
        userRole: currentProfile?.userRole || 'FAGRI Member',
        loginTime: new Date(Date.now() - 24 * 60 * 60 * 1000), // 24 hours ago
        lastActivity: new Date(Date.now() - 22 * 60 * 60 * 1000), // 22 hours ago
        ipAddress: '10.0.0.50',
        deviceInfo: 'Safari 17.1 on iPhone 15',
        location: 'Milan, Italy',
        isCurrentSession: false,
        permissions: ['view_projects', 'organization_info']
      }
    ];
    setSessions(mockSessions);
  }, [alphaG8Id]);

  const handleCopy = () => {
    navigator.clipboard.writeText(alphaG8Id);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    const certificate = `
ALPHAG8 ID KEY CERTIFICATE
==========================

ID KEY: ${alphaG8Id}
Issued: ${new Date().toLocaleDateString()}
Valid Until: ${new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toLocaleDateString()}
Authority: ALPHAG8 Digital Solutions Switzerland
Security Level: Swiss Banking Grade
Encryption: AES-256 + RSA-4096

This certificate confirms the authenticity of your ALPHAG8 ID KEY
for accessing CO₂ certification services on FAGRI.Digital platform.

SECURITY NOTICE: Keep this ID KEY confidential. It provides access
to your certification projects and blockchain transactions.

Swiss Alps Security Bunker - 001
Authorized by ALPHAG8 Switzerland Technology
    `;

    const blob = new Blob([certificate], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `FAGRI_ID_Certificate_${alphaG8Id}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleSessionTermination = (sessionId: string) => {
    if (confirm(t('confirm-terminate-session'))) {
      setSessions(sessions.filter(s => s.id !== sessionId));
      // In real implementation, this would call backend API to terminate session
    }
  };

  const handleSessionVerification = () => {
    setSessionVerificationCheck(true);
    // Simulate Swiss security protocol verification
    setTimeout(() => {
      setSessionVerificationCheck(false);
      toast({
        title: t('verification-complete'),
        description: t('session-security-verified'),
      });
    }, 2000);
  };

  const handleAccountAccessVerification = () => {
    setAccountAccessCheck(true);
    // Simulate account access verification
    setTimeout(() => {
      setAccountAccessCheck(false);
      toast({
        title: t('verification-complete'),
        description: t('account-access-verified'),
      });
    }, 2000);
  };

  const handleRefreshSessions = () => {
    // Refresh sessions functionality
    toast({
      title: t('sessions-refreshed'),
      description: t('session-data-updated'),
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-2xl font-light text-slate-900">
            <Shield className="h-6 w-6 text-blue-600" />
            {t('security-id-key-card')}
          </DialogTitle>
        </DialogHeader>

        {/* Tab Navigation */}
        <div className="flex border-b border-slate-200 mb-6">
          <button
            onClick={() => setActiveTab('keycard')}
            className={`px-6 py-3 text-sm font-medium border-b-2 transition-colors ${
              activeTab === 'keycard'
                ? 'border-blue-600 text-blue-600'
                : 'border-transparent text-slate-600 hover:text-slate-900'
            }`}
          >
            <div className="flex items-center gap-2">
              <Key className="h-4 w-4" />
              {t('id-key-card')}
            </div>
          </button>
          <button
            onClick={() => setActiveTab('security')}
            className={`px-6 py-3 text-sm font-medium border-b-2 transition-colors ${
              activeTab === 'security'
                ? 'border-blue-600 text-blue-600'
                : 'border-transparent text-slate-600 hover:text-slate-900'
            }`}
          >
            <div className="flex items-center gap-2">
              <Shield className="h-4 w-4" />
              {t('security-dashboard')}
            </div>
          </button>
          <button
            onClick={() => setActiveTab('sessions')}
            className={`px-6 py-3 text-sm font-medium border-b-2 transition-colors ${
              activeTab === 'sessions'
                ? 'border-blue-600 text-blue-600'
                : 'border-transparent text-slate-600 hover:text-slate-900'
            }`}
          >
            <div className="flex items-center gap-2">
              <Monitor className="h-4 w-4" />
              {t('active-sessions')}
            </div>
          </button>
        </div>

        <div className="space-y-6">
          {/* ID KEY Card Tab */}
          {activeTab === 'keycard' && (
            <>
              {/* ID KEY Display */}
              <div className="bg-gradient-to-br from-blue-500 to-blue-700 rounded-xl p-6 text-white">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <Shield className="h-5 w-5" />
                    <span className="text-sm font-medium">ALPHAG8 ID KEY</span>
                  </div>
                  <span className="text-xs bg-white/20 px-2 py-1 rounded">{t('active')}</span>
                </div>
                
                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 mb-4">
                  <div className="text-xs text-blue-100 mb-1">ID KEY</div>
                  <div className="font-mono text-lg break-all">{alphaG8Id}</div>
                </div>

                <div className="grid grid-cols-2 gap-4 text-xs">
                  <div>
                    <div className="text-blue-200 mb-1">{t('issued')}</div>
                    <div className="flex items-center gap-1">
                      <Calendar className="h-3 w-3" />
                      {new Date().toLocaleDateString()}
                    </div>
                  </div>
                  <div>
                    <div className="text-blue-200 mb-1">{t('valid-until')}</div>
                    <div className="flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      {new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toLocaleDateString()}
                    </div>
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-4 justify-center">
                <Button
                  onClick={handleCopy}
                  variant="outline"
                  className="flex items-center gap-2"
                >
                  <Copy className="h-4 w-4" />
                  {copied ? t('copied') : t('copy-id-key')}
                </Button>
                
                <Button
                  onClick={handleDownload}
                  className="bg-blue-600 hover:bg-blue-700 text-white flex items-center gap-2"
                >
                  <Download className="h-4 w-4" />
                  {t('download-certificate')}
                </Button>
              </div>
            </>
          )}

          {/* Security Dashboard Tab */}
          {activeTab === 'security' && (
            <>
              {/* Current User Info */}
              <div className="bg-white border border-slate-200 rounded-xl p-6">
                <h4 className="font-medium text-slate-900 mb-4 flex items-center gap-2">
                  <User className="h-5 w-5 text-blue-600" />
                  {t('current-account-holder')}
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="font-medium text-slate-700">ALPHAG8 ID KEY:</span>
                    <br /><span className="font-mono text-blue-600">{alphaG8Id}</span>
                  </div>
                  <div>
                    <span className="font-medium text-slate-700">{t('account-name')}:</span>
                    <br /><span className="font-medium">{userProfile?.fullName || 'Unknown User'}</span>
                  </div>
                  <div>
                    <span className="font-medium text-slate-700">Email:</span>
                    <br /><span>{userProfile?.email || 'No email on file'}</span>
                  </div>
                  <div>
                    <span className="font-medium text-slate-700">{t('company')}:</span>
                    <br /><span>{userProfile?.company || 'No company specified'}</span>
                  </div>
                  <div>
                    <span className="font-medium text-slate-700">{t('role')}:</span>
                    <br /><span className="text-emerald-600 font-medium">{userProfile?.userRole || 'FAGRI Member'}</span>
                  </div>
                  <div>
                    <span className="font-medium text-slate-700">{t('access-level')}:</span>
                    <br /><span className="text-blue-600 font-medium">3FA Protected</span>
                  </div>
                  <div>
                    <span className="font-medium text-slate-700">{t('location')}:</span>
                    <br /><span>{userProfile?.city || 'Unknown'}, {userProfile?.country || 'Italy'}</span>
                  </div>
                  <div>
                    <span className="font-medium text-slate-700">{t('status')}:</span>
                    <br /><span className={`font-medium ${userProfile?.isActive ? 'text-green-600' : 'text-red-600'}`}>
                      {userProfile?.isActive ? t('active') : t('inactive')}
                    </span>
                  </div>
                </div>
              </div>

              {/* Account Validity and Extension */}
              <div className="bg-green-50 border border-green-200 rounded-xl p-6">
                <h4 className="font-medium text-green-900 mb-4 flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-green-600" />
                  {t('account-validity-extension')}
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <div className="flex items-center gap-2 mb-3">
                      <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                      <span className="text-green-800 font-medium">{t('id-verified')}</span>
                    </div>
                    <div className="text-sm text-green-700 mb-2">
                      <span className="font-medium">{t('valid-for-1-year')}</span>
                    </div>
                    <div className="text-xs text-green-600">
                      {t('expires')}: 27.7.2026
                    </div>
                  </div>
                  <div className="text-right">
                    <Button
                      className="bg-green-600 hover:bg-green-700 text-white mb-2"
                      onClick={() => {
                        // Account extension functionality with correct pricing
                        toast({
                          title: t('extend-account'),
                          description: "Personal Account: €5 (Einrichtung) + €12 (1. Jahr) = €17 gesamt. Corporate Account: €12 (Einrichtung) + €30 (1. Jahr) = €42 gesamt.",
                        });
                      }}
                    >
                      <Clock className="h-4 w-4 mr-2" />
                      {t('extend-account')}
                    </Button>
                    <div className="text-xs text-green-600">
                      {t('renewal')}: €17{t('per-year')}
                    </div>
                  </div>
                </div>
              </div>

              {/* Real-time Verification */}
              <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-6">
                <h4 className="font-medium text-emerald-900 mb-4 flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-emerald-600" />
                  {t('real-time-verification')}
                </h4>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-emerald-700 mb-1">{t('session-protected-swiss-security')}</p>
                    <p className="text-xs text-emerald-600">Swiss Alps Security Bunker - 001</p>
                  </div>
                  <Button
                    onClick={handleSessionVerification}
                    disabled={sessionVerificationCheck}
                    className="bg-emerald-600 hover:bg-emerald-700 text-white"
                  >
                    {sessionVerificationCheck ? (
                      <div className="flex items-center gap-2">
                        <div className="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full" />
                        {t('verifying')}
                      </div>
                    ) : (
                      <div className="flex items-center gap-2">
                        <Eye className="h-4 w-4" />
                        {t('verify-now')}
                      </div>
                    )}
                  </Button>
                </div>
              </div>

              {/* Current Session Details */}
              <div className="bg-white border border-slate-200 rounded-xl p-6">
                <h4 className="font-medium text-slate-900 mb-4 flex items-center gap-2">
                  <Monitor className="h-5 w-5 text-blue-600" />
                  {t('current-session-details')}
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="font-medium text-slate-700">{t('login-time')}:</span>
                    <br /><span>{new Date(Date.now() - 2 * 60 * 60 * 1000).toLocaleString()}</span>
                  </div>
                  <div>
                    <span className="font-medium text-slate-700">{t('device')}:</span>
                    <br /><span>Chrome Browser on Windows 11</span>
                  </div>
                  <div>
                    <span className="font-medium text-slate-700">{t('location')}:</span>
                    <br /><span>Rome, Italy</span>
                  </div>
                  <div>
                    <span className="font-medium text-slate-700">{t('account-role')}:</span>
                    <br />FAGRI Member
                  </div>
                  <div>
                    <span className="font-medium text-slate-700">{t('3fa-status')}:</span>
                    <br /><span className="text-green-600 flex items-center gap-1">
                      <CheckCircle className="h-4 w-4" />
                      {t('active-verified')}
                    </span>
                  </div>
                  <div>
                    <span className="font-medium text-slate-700">{t('access-level')}:</span>
                    <br />{t('full-platform-access')}
                  </div>
                </div>
              </div>

              {/* Real-time Verification */}
              <div className="bg-slate-50 border border-slate-200 rounded-xl p-6">
                <h4 className="font-medium text-slate-900 mb-4 flex items-center gap-2">
                  <Eye className="h-5 w-5 text-emerald-600" />
                  {t('real-time-verification')}
                </h4>
                <div className="flex items-center justify-between">
                  <div className="text-sm text-slate-600">
                    {t('verify-current-account-access')}
                  </div>
                  <Button
                    onClick={handleAccountAccessVerification}
                    disabled={accountAccessCheck}
                    className="bg-emerald-600 hover:bg-emerald-700 text-white flex items-center gap-2"
                  >
                    {accountAccessCheck ? (
                      <>
                        <div className="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full"></div>
                        {t('verifying')}
                      </>
                    ) : (
                      <>
                        <CheckCircle className="h-4 w-4" />
                        {t('verify-now')}
                      </>
                    )}
                  </Button>
                </div>
                {accountAccessCheck && (
                  <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-lg text-sm text-blue-700">
                    {t('performing-access-verification')}
                  </div>
                )}
              </div>

              {/* Permissions */}
              <div className="bg-white border border-slate-200 rounded-xl p-6">
                <h4 className="font-medium text-slate-900 mb-4 flex items-center gap-2">
                  <Settings className="h-5 w-5 text-slate-600" />
                  {t('current-permissions')}
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {[
                    t('view-projects'),
                    t('create-projects'),
                    t('organization-information'),
                    t('pricing-access'),
                    t('dashboard-access'),
                    t('session-management')
                  ].map((permission, index) => (
                    <div key={index} className="flex items-center gap-2 text-sm">
                      <CheckCircle className="h-4 w-4 text-green-600" />
                      <span className="text-slate-700">{permission}</span>
                    </div>
                  ))}
                </div>
              </div>
            </>
          )}

          {/* Active Sessions Tab */}
          {activeTab === 'sessions' && (
            <>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h4 className="font-medium text-slate-900 flex items-center gap-2">
                    <Monitor className="h-5 w-5 text-blue-600" />
                    {t('active-sessions')} ({sessions.length})
                  </h4>
                  <Button
                    onClick={handleRefreshSessions}
                    variant="outline"
                    size="sm"
                    className="flex items-center gap-2"
                  >
                    <Eye className="h-4 w-4" />
                    {t('refresh-sessions')}
                  </Button>
                </div>

                {sessions.map((session) => (
                  <div
                    key={session.id}
                    className={`border rounded-xl p-4 ${
                      session.isCurrentSession
                        ? 'border-blue-200 bg-blue-50'
                        : 'border-slate-200 bg-white'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-2">
                        <div className={`w-3 h-3 rounded-full ${
                          session.isCurrentSession ? 'bg-green-500' : 'bg-yellow-500'
                        }`}></div>
                        <span className="font-medium text-slate-900">
                          {session.isCurrentSession ? t('current-session') : t('previous-session')}
                        </span>
                        {session.isCurrentSession && (
                          <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded">
                            {t('you')}
                          </span>
                        )}
                      </div>
                      {!session.isCurrentSession && (
                        <Button
                          onClick={() => handleSessionTermination(session.id)}
                          size="sm"
                          variant="outline"
                          className="text-red-600 border-red-200 hover:bg-red-50 flex items-center gap-1"
                        >
                          <LogOut className="h-3 w-3" />
                          {t('terminate')}
                        </Button>
                      )}
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                      <div>
                        <span className="font-medium text-slate-700">{t('device')}:</span>
                        <br />{session.deviceInfo}
                      </div>
                      <div>
                        <span className="font-medium text-slate-700">{t('location')}:</span>
                        <br />{session.location}
                      </div>
                      <div>
                        <span className="font-medium text-slate-700">{t('last-activity')}:</span>
                        <br />{session.lastActivity.toLocaleString()}
                      </div>
                    </div>

                    <div className="mt-3 text-xs text-slate-500">
                      IP: {session.ipAddress} • {t('login')}: {session.loginTime.toLocaleString()}
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}

          {/* Close Button */}
          <div className="text-center pt-4">
            <Button
              onClick={onClose}
              variant="outline"
              className="px-8 py-2"
            >
              {t('close')}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}