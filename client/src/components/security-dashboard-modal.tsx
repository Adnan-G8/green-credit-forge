import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/components/language-provider';
import { Key, Copy, Download, Shield, Calendar, Clock, User, Monitor, AlertTriangle, CheckCircle, LogOut, Eye, Settings } from 'lucide-react';
import { useState, useEffect } from 'react';

interface SecurityDashboardModalProps {
  isOpen: boolean;
  onClose: () => void;
  alphaG8Id: string;
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
  const [copied, setCopied] = useState(false);
  const [activeTab, setActiveTab] = useState<'keycard' | 'security' | 'sessions'>('keycard');
  const [sessions, setSessions] = useState<SessionInfo[]>([]);
  const [realTimeCheck, setRealTimeCheck] = useState(false);

  // Mock session data - in real implementation this would come from backend
  useEffect(() => {
    const mockSessions: SessionInfo[] = [
      {
        id: 'session-001',
        userId: alphaG8Id,
        userName: 'Current User',
        userRole: 'FAGRI Member',
        loginTime: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
        lastActivity: new Date(Date.now() - 5 * 60 * 1000), // 5 minutes ago
        ipAddress: '192.168.1.100',
        deviceInfo: 'Chrome 121.0 on Windows 11',
        location: 'Rome, Italy',
        isCurrentSession: true,
        permissions: ['view_projects', 'create_projects', 'organization_info', 'pricing_access']
      },
      {
        id: 'session-002',
        userId: alphaG8Id,
        userName: 'Current User',
        userRole: 'FAGRI Member',
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
    a.download = `ALPHAG8_ID_Certificate_${alphaG8Id}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleSessionTermination = (sessionId: string) => {
    if (confirm(t('confirm-terminate-session'))) {
      setSessions(sessions.filter(s => s.id !== sessionId));
      // In real implementation, this would call backend API to terminate session
    }
  };

  const handleRealTimeVerification = () => {
    setRealTimeCheck(true);
    // Simulate real-time verification check
    setTimeout(() => {
      setRealTimeCheck(false);
    }, 2000);
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
                    <span className="font-medium text-slate-700">{t('alphag8-id')}:</span>
                    <br /><span className="font-mono">{alphaG8Id}</span>
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
                    onClick={handleRealTimeVerification}
                    disabled={realTimeCheck}
                    className="bg-emerald-600 hover:bg-emerald-700 text-white flex items-center gap-2"
                  >
                    {realTimeCheck ? (
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
                {realTimeCheck && (
                  <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-lg text-sm text-blue-700">
                    {t('performing-security-verification')}
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
                    onClick={handleRealTimeVerification}
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